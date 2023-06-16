/* eslint react/prop-types: 0 */
import {SettingsIcon} from './icons'

const Settings = ({ handleClick }) => {
    return (
        <div>
            <button 
                className="btn" 
                type="button" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#staticBackdrop" 
                aria-controls="staticBackdrop"
                onClick={handleClick}
            >
                <SettingsIcon />
            </button>

            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Settings</h5>
                    <button type="button" className="btn-close bg-danger" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleClick}></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Setting Stuff here
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings