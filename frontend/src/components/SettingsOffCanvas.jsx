/* eslint react/prop-types: 0 */
import { useContext, useState } from 'react'

import { ThemeContext } from '../contexts/ThemeContext'
import { Context } from '../contexts/Context'

import { SettingsIcon } from './icons'
import logoutImg from "../assets/arrow-right-from-bracket-solid.svg";

const Settings = ({ handleClick }) => {
    // Context Variables
    const { logout } = useContext(Context)
    const { theme, mode, toggleTheme } = useContext(ThemeContext)

    // States
    const [formData, setFormData] = useState({
        themeSelection: theme,
    })

    /**
     * Updates theme and form selection theme accordingly
     * @param {Event} event Dropdown selection event
     */
    const handleThemeSelection = (event) => {
        const { name, value } = event.target
        toggleTheme(value)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    /**
     * A modal for prompting the user to logout of the app.
     * Currently unused due to a glitch that occurs when playing
     * a local files song that immediately closes the prompt.
     */
    const LogoutPrompt = () => {
        return (
            <div
                className="modal fade"
                id="logoutPrompt"
                tabIndex="-1"
                aria-labelledby="logoutPromptLabel"
                data-backdrop="static"
            >
                <div className="modal-dialog">
                    <div className={`modal-content primary-${theme}-${mode}`}>
                        <div className="modal-header">
                            <div
                                className="modal-title fs-5"
                                id="logoutPromptLabel"
                            >
                                Logout
                            </div>
                            <button
                                className="btn-close"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to logout?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                class={`btn element-${theme}-${mode}`}
                                data-bs-dismiss="modal"
                            >Cancel</button>
                            <button
                                type="button"
                                class={`btn element-${theme}-${mode}`}
                                onClick={() => logout()}
                                data-bs-dismiss="modal"
                            >Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Settings Offcanvas Body */}
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
                <div className={`offcanvas-header secondary-offcanvas-${theme}-${mode}`}>
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Settings</h5>
                    <button
                        type="button"
                        className="btn-close "
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={handleClick}
                    ></button>
                </div>
                <div className={`offcanvas-body secondary-offcanvas-${theme}-${mode}`}>
                    <form>
                        <label
                            htmlFor='themeSelection'
                            className='mb-1'
                        >Choose Theme</label>
                        <select
                            name='themeSelection'
                            className="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example"
                            value={formData.themeSelection}
                            onChange={handleThemeSelection}>
                            <option value="royal">Royal</option>
                            <option value="bvt">BVT!!!</option>
                        </select>
                    </form>
                    <span
                        className='mb-1'
                    >Logout</span>
                    <button
                        className={`btn element-${theme}-${mode} rounded w-100`}
                        type="button"
                        id={`primary-${theme}-${mode}`}
                        onClick={logout}
                    >
                        <img
                            src={logoutImg}
                            alt="Logout"
                            className={`svg-${theme}-${mode}`}
                        ></img>
                    </button>
                </div>
            </div>
            {/* <LogoutPrompt /> */}
        </div>
    )
}

export default Settings