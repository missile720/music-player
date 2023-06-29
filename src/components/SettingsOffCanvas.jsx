/* eslint react/prop-types: 0 */
import { SettingsIcon } from './icons'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

const Settings = ({ handleClick }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <div>
            <a
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
                onClick={handleClick}
            >
                <SettingsIcon />
            </a>

            <div
                className={`offcanvas offcanvas-start`}
                data-bs-backdrop="static"
                tabIndex="-1"
                id="staticBackdrop"
                aria-labelledby="staticBackdropLabel"
            >
                <div className={`offcanvas-header offcanvas-header-${theme}`}>
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Settings</h5>
                    <button
                        type="button"
                        className="btn-close "
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={handleClick}
                    ></button>
                </div>
                <div className={`offcanvas-body offcanvas-body-${theme}`}>
                    <div>
                        Setting Stuff here
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings