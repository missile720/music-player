import { useContext, useState } from 'react';
import { Context } from "../contexts/Context"
import { ThemeContext } from '../contexts/ThemeContext';

import SearchSong from './SearchSong';
import defaultPfp from "../assets/defaultProfilePic.svg"
import searchIcon from "../assets/searchIcon.svg"

function Nav() {
    const { theme } = useContext(ThemeContext)
    const { userProfileSpotify, accessToken } = useContext(Context);
    const [search, setSearch] = useState("");
    const [songList, setSongList] = useState({})

    function updateText(event) {
        setSearch(event.target.value);
    }

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
                <img src={getProfilePic()} width="80px" height="80px" alt="User's profile picture" />
            </div>

            <div className="col-9 align-self-center">
                {/* search bar */}
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search Songs" aria-label="Search Songs" aria-describedby="button-addon2" onChange={updateText} value={search} />
                    <button className={`btn button-${theme}`} type="button" id="button-addon2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={() => searchList(accessToken, search)}>
                        <img src={searchIcon} width="16" height="16" className="bi bi-search" alt="Search Icon" />
                    </button>
                    <SearchSong data={songList} />
                </div>
            </div>
        </div>
    )
}


export default Nav