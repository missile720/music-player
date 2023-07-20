import { useContext } from "react"

import { Context } from "../contexts/Context"
import { ThemeContext } from "../contexts/ThemeContext"

/**
 * @returns {Component} A React Component Modal that prompts the user
 * to logout
 */
const LogoutPrompt = () => {
    const { logout } = useContext(Context)
    const { theme, mode } = useContext(ThemeContext)

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

export default LogoutPrompt