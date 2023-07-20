import { useContext, useState, useEffect } from "react";

import { Context } from "../contexts/Context"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext";
import { ThemeContext } from "../contexts/ThemeContext";

import SearchSong from "./SearchSong";
import defaultPfp from "../assets/defaultProfilePic.svg"
import searchIcon from "../assets/searchIcon.svg"

import "./Navbar.css"

function Nav() {
    const { userProfileSpotify, accessToken } = useContext(Context);
    const { currentSongSource, playlistIndex, library } = useContext(MusicPlayerStateContext)
    const { theme, mode } = useContext(ThemeContext)
    const [search, setSearch] = useState("");
    const [songList, setSongList] = useState({})

    /**
     * Clears the search text when the user changes the current playlist
     * or updates their library
     */
    useEffect(() => {
        setSearch("")
    }, [playlistIndex, library])

    /**
     * Updates text of search input
     * @param {Event} event Input Change event
     */
    function updateText(event) {
        setSearch(event.target.value);
    }

    /**
     * Makes api call to spotify to search for song using search as 
     * query
     * @param {string} accessToken Spotify access token
     * @param {string} search Search query from navbar input
     */
    async function searchList(accessToken, search) {
        setSongList({});
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track`, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            }
        });

        const data = await response.json();
        setSongList(data);
    }

    /**
     * Creates a shortcut for searching for spotify songs by triggering the
     * searchList function and showing the SearchSong when the user hits enter
     * on the text input
     * @param {Event} event Keypress event
     */
    async function searchOnEnter(event) {
        const keyCode = event.code || event.keyCode;
        if (keyCode === "Enter") {
            searchList(accessToken, search);
            const searchSongOffcanvas = new bootstrap.Offcanvas(
                document.getElementById("offcanvasExample")
            )
            searchSongOffcanvas.show();
        }
    }

    /**
     * Returns the user's profile pic from spotify if it exists.
     * If it does not, returns a default profile pic url
     * @returns {String} URL for user's profile pic's image url
     */
    function getProfilePic() {
        if (userProfileSpotify &&
            userProfileSpotify.images &&
            userProfileSpotify.images.length > 0) {
            return userProfileSpotify.images[0].url
        }

        return defaultPfp
    }

    return (
        <div className="row h-100 align-items-center">
            {/* user icon */}
            <div className="col-2">
                <img
                    className="user-profile-pic"
                    src={getProfilePic()}
                    alt="User's profile picture"
                />
            </div>

            <div className="col-10 d-flex align-items-center justify-content-center">
                {/* search bar */}
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Songs From Spotify"
                        aria-label="Search Songs"
                        aria-describedby="button-addon2"
                        onChange={updateText}
                        disabled={currentSongSource !== "spotify"}
                        onKeyDown={searchOnEnter}
                        value={search}
                    />
                    <button
                        className={`btn element-${theme}-${mode} search-btn`}
                        type="button"
                        id="button-addon2"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                        onClick={() => searchList(accessToken, search)}
                        disabled={currentSongSource !== "spotify"}
                    >
                        <img
                            src={searchIcon}
                            width="16"
                            height="16"
                            className={`bi bi-search search-${mode}`}
                            alt="Search Icon" />
                    </button>
                    <SearchSong data={songList} />
                </div>
            </div>
        </div>
    )
}


export default Nav