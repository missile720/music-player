import { useContext } from 'react';
import { Context } from "../Context"
import defaultPfp from "../assets/defaultProfilePic.svg"

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
                <img src={getProfilePic()} width="80" height="80" alt="" />
            </div>

            <div className="col-9 align-self-center">
                {/* search bar */}
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search Playlist" aria-label="Search Playlist" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-warning" type="button" id="button-addon2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Nav