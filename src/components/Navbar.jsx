import {useContext, useState} from 'react';
import {Context} from "../Context"
import SearchSong from './searchSong';

function Nav() {
    const {userProfileSpotify} = useContext(Context);
    const [search, setSearch] = useState("");
    const [searchState, setSearchState] = useState(false);

    function updateText(event){
        setSearch(event.target.value);
    }

    function searchList(){
        setSearchState(true);
    }

    console.log(searchState)

    return (
        <div className="row h-100 align-items-center">
            {/* user icon */}
            <div className="col-2">
            {userProfileSpotify.images && <img src={userProfileSpotify.images[0].url} width="80" height="80" alt="" />}
            </div>

            <div className="col-9 align-self-center">  
            {/* search bar */}      
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search Songs/Artists" aria-label="Search Songs/Artists" aria-describedby="button-addon2" onChange={updateText} value={search}/>
                    <button className="btn btn-outline-warning" type="button" id="button-addon2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={searchList}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    <SearchSong/>
                </div>
            </div>
        </div>
    )
}


export default Nav