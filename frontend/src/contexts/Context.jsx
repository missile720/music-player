import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [userProfileSpotify, setUserProfileSpotify] = useState({});
  const [userPlaylistSpotify, setUserPlaylistSpotify] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [currentPlayingSongData, setCurrentPlayingSongData] = useState();
  const [currentPlayingSongCallback, setCurrentPlayingSongCallback] = useState();
  const domain = 'http://localhost:3000/api/spotify'

  async function loginSpotify() {
    try {
      const response = await fetch(`${domain}/loginSpotify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { authorizationUri } = await response.json();
      if (response.ok) {
        window.location = authorizationUri;
      } else {
        throw new Error("Failed to login with Spotify");
      }
    } catch (error) {
      console.log(error)
    }

  }

  function currentPlaylistId(id) {
    setCurrentPlaylist(id);
  }

  const exchangeAuthorizationCode = async (code) => {
    try {
      const response = await fetch(`${domain}/exchangeAuthorizationCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code })
      });

      const data = await response.json();
      console.log(data.message)
      window.history.pushState({}, null, "/");
    } catch (error) {
      console.error(
        "Error exchanging authorization code for access token:",
        error
      );
    }
  };

  async function getProfile() {
    try {
      const response = await fetch(`${domain}/getProfile`);
      const data = await response.json();
      setUserProfileSpotify(data);
    } catch (error) {
      console.log(error)
    }
  }

  async function getProfilePlaylist() {
    try {
      const response = await fetch(`${domain}/getProfilePlaylist`);
      const data = await response.json();
      setUserPlaylistSpotify(data);
    } catch (error) {
      console.log(error)
    }

  }

  async function getSongAudioAnalysis(playerCallback) {
    const trackId = playerCallback.track.id;
    try {
      const response = await fetch(`${domain}/getProfilePlaylist/${trackId}`);
      const data = await response.json();
      setCurrentPlayingSongData(data);
      setCurrentPlayingSongCallback(playerCallback);
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Gets the Spotify Playlist Tracks Object from a
   * Spotify API Playlist Tracks Endpoint
   * @param {string} tracksUrl The Spotify API endpoint to get the
   * tracks for a specific playlist
   * @returns {Object} A Spotify Playlist Tracks Response Object
   */
  async function getSpotifyPlaylistTracks(tracksUrl) {
    try {
      const response = await fetch(`${domain}/getSpotifyPlaylistTracks/${tracksUrl}`)
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error)
    }
  }

  function deletePlaylistTrack(playlistId, trackUri) {
    if (trackUri) {
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracks: [{ uri: trackUri }],
        }),
      })
        .then((response) => {
          if (response.ok) {
            if (accessToken) {
              getProfilePlaylist(accessToken);
            }
            console.log("Track deleted successfully.");
          } else {
            console.log("Failed to delete track from the playlist.");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }

  async function updatePlaylistName(playlistId, newName) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addPlaylistTrack(playlistId, trackUri) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
    })
      .then((response) => {
        if (response.ok) {
          if (accessToken) {
            getProfilePlaylist(accessToken);
          }
          console.log("Track added to the playlist successfully.");
        } else {
          console.log("Failed to add track to the playlist.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    // Check if the current URL contains the authorization code and state
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");
    const state = params.get("state");

    if (authorizationCode && state) {
      // Verify the state if needed
      // Exchange the authorization code for an access token
      exchangeAuthorizationCode(authorizationCode);
    }
  }, []);

  //retrieve Spotify data
  useEffect(() => {
    if (accessToken) {
      getProfile(accessToken);
      getProfilePlaylist(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }
    //Right before token expires this runs the refresh token
    const refreshInterval = setInterval(async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: clientId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await response.json();
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setExpiresIn(data.expires_in);
      } catch (error) {
        console.error(
          "Error exchanging authorization code for access token:",
          error
        );
      }
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(refreshInterval);
  }, [refreshToken, expiresIn]);

  return (
    <Context.Provider
      value={{
        accessToken,
        userProfileSpotify,
        userPlaylistSpotify,
        currentPlaylist,
        currentPlayingSongData,
        currentPlayingSongCallback,
        getSpotifyPlaylistTracks,
        loginSpotify,
        deletePlaylistTrack,
        addPlaylistTrack,
        currentPlaylistId,
        updatePlaylistName,
        getSongAudioAnalysis
      }}
    >
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes,
};

export { ContextProvider, Context };
