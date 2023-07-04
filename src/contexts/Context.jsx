import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [userProfileSpotify, setUserProfileSpotify] = useState({});
  const [userPlaylistSpotify, setUserPlaylistSpotify] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [currentPlayingSongData,setCurrentPlayingSongData] = useState({});
  const clientId = "146d22c1a56f4060939214df2f8b8ab4";
  const redirectUri = "http://localhost:5173/callback";

  async function loginSpotify() {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      let state = generateRandomString(16);
      let scope = `user-read-private user-read-email 
        playlist-read-private playlist-modify-public 
        playlist-modify-private streaming 
        user-read-playback-state
        user-modify-playback-state`;

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.location = "https://accounts.spotify.com/authorize?" + args;
    });
  }

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

  function currentPlaylistId(id) {
    setCurrentPlaylist(id);
  }

  const exchangeAuthorizationCode = async (code) => {
    const codeVerifier = localStorage.getItem("code_verifier");

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to exchange authorization code for access token"
        );
      }

      const data = await response.json();
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setExpiresIn(data.expires_in);
      window.history.pushState({}, null, "/");
    } catch (error) {
      console.error(
        "Error exchanging authorization code for access token:",
        error
      );
    }
  };

  async function getProfile() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();
    setUserProfileSpotify(data);
  }

  async function getProfilePlaylist() {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();
    setUserPlaylistSpotify(data);
  }

  async function getSongAudioAnalysis(href) {
    let trackId = href.split(":")[2];
    
    const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();
    setCurrentPlayingSongData(data);
  }

  /**
   * Gets the Spotify Playlist Tracks Object from a
   * Spotify API Playlist Tracks Endpoint
   * @param {string} tracksUrl The Spotify API endpoint to get the
   * tracks for a specific playlist
   * @returns {Object} A Spotify Playlist Tracks Response Object
   */
  async function getSpotifyPlaylistTracks(tracksUrl) {
    const response = await fetch(tracksUrl, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await response.json();

    return data;
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
