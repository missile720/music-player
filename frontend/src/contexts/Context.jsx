import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import PropTypes from "prop-types";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [userProfileSpotify, setUserProfileSpotify] = useState({});
  const [userPlaylistSpotify, setUserPlaylistSpotify] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [currentPlayingSongData, setCurrentPlayingSongData] = useState();
  const [currentPlayingSongCallback, setCurrentPlayingSongCallback] = useState();
  const [isAccessTokenValid, setIsAccessTokenValid] = useState(false);
  const [cookies, setCookies] = useCookies(['codeVerifier', 'accessToken']);
  const domain = 'http://localhost:3000/api/spotify'

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return window
        .btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return base64encode(digest);
  }

  function generateRandomString(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function loginSpotify() {
    try {
      const codeVerifier = await generateCodeChallenge(128);
      setCookies('codeVerifier', codeVerifier);
      const codeChallenge = await generateCodeChallenge(cookies.codeVerifier);
      const state = generateRandomString(16);
      const response = await fetch(`${domain}/loginSpotify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codeChallenge: codeChallenge,
          state: state
        })
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
        body: JSON.stringify({
          code: code,
          codeVerifier: cookies.codeVerifier
        }),
        credentials: "include",
      });

      const data = await response.json();
      setCookies('accessToken', data.access_token);
      setIsAccessTokenValid(true);
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
      const response = await fetch(`${domain}/getProfile`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        credentials: "include"
      });
      const data = await response.json();
      setUserProfileSpotify(data);
    } catch (error) {
      console.log(error)
    }
  }

  async function getProfilePlaylist() {
    try {
      const response = await fetch(`${domain}/getProfilePlaylist`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        credentials: "include"
      });
      const data = await response.json();
      setUserPlaylistSpotify(data);
    } catch (error) {
      console.log(error)
    }

  }

  async function getSongAudioAnalysis(playerCallback) {
    const trackId = playerCallback.track.id;
    try {
      const response = await fetch(`${domain}/getProfilePlaylist/${trackId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        credentials: "include"
      });
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
      const response = await fetch(`${domain}/getSpotifyPlaylistTracks/${tracksUrl}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        credentials: "include"
      })
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async function deletePlaylistTrack(playlistId, trackUri) {
    try {
      if (trackUri) {
        const response = await fetch(`${domain}/deletePlaylistTrack/${playlistId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tracks: [{ uri: trackUri }],
          }),
          credentials: "include"
        });

        if (response.ok) {
          console.log("Track deleted successfully.");
        } else {
          console.log("Failed to delete track from the playlist.");
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePlaylistName(playlistId, newName) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
          }),
          credentials: "include"
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
        Authorization: `Bearer ${cookies.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
          if (cookies.accessToken) {
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
    if (cookies.accessToken) {
      getProfile();
      getProfilePlaylist();
    }
  }, [cookies.accessToken]);

  // useEffect(() => {
  //   //Right before token expires this runs the refresh token
  //   let expiresIn
  //   const refreshInterval = setInterval(async () => {
  //     try {
  //       const response = await fetch(`${domain}/refreshToken`, {
  //         method: "POST",
  //         credentials: "include",
  //       });
  //       const data = await response.json();
  //       expiresIn = data.expiresIn;
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }, (expiresIn - 60) * 1000);

  //   return () => clearInterval(refreshInterval);
  // }, []);

  return (
    <Context.Provider
      value={{
        domain,
        isAccessTokenValid,
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
        getSongAudioAnalysis,
        cookies
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
