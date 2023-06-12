import { useContext, useState } from 'react';
import { Context } from "../Context"
import SearchSong from './searchSong';
import defaultPfp from "../assets/defaultProfilePic.svg"
import searchIcon from "../assets/searchIcon.svg"

function Nav() {
    const { userProfileSpotify } = useContext(Context);
    const [search, setSearch] = useState("");
    const [searchState, setSearchState] = useState(false);

    function updateText(event){
        setSearch(event.target.value);
    }

    function searchList(){
        setSearchState(true);
    }

    console.log(searchState)

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
                    <input type="text" className="form-control" placeholder="Search Songs/Artists" aria-label="Search Songs/Artists" aria-describedby="button-addon2" onChange={updateText} value={search}/>
                    <button className="btn btn-outline-warning" type="button" id="button-addon2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={searchList}>
                    <img src={searchIcon} width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" alt="Search Icon" />
                    </button>
                    <SearchSong/>
                </div>
            </div>
        </div>
    )
}


export default Nav