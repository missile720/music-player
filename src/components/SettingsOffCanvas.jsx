/* eslint react/prop-types: 0 */
import { SettingsIcon } from './icons'
import { useContext, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

const Settings = ({ handleClick }) => {
    const { theme, mode, toggleTheme } = useContext(ThemeContext)
    const [formData, setFormData] = useState({
        themeSelection: theme, 
    })

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
                    <div>
                        <label htmlFor='themeSelection'>Choose Theme</label>
                        <select 
                            name='themeSelection' 
                            className="form-select form-select-lg mb-3" 
                            aria-label=".form-select-lg example"
                            value={formData.themeSelection}
                            onChange={handleThemeSelection}>
                                <option value="royal">Royal</option>                                    
                                <option value="bvt">BVT!!!</option>
                        </select> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings