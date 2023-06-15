import { useContext } from 'react';
import { Context } from "../contexts/Context"
import defaultPfp from "../assets/defaultProfilePic.svg"
import searchIcon from "../assets/searchIcon.svg"

function Nav() {
    const { userProfileSpotify } = useContext(Context);

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
                    <input type="text" className="form-control" placeholder="Search Playlist" aria-label="Search Playlist" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-warning" type="button" id="button-addon2">
                        <img src={searchIcon} width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" alt="Search Icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Nav