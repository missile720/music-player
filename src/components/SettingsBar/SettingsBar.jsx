import { useState } from "react";
import "./SettingsBar.css";

const SettingsBar = () => {
  //We will have to use the useContext hook in the main page to switch styles for entire site
  const [isDarkMode, setIsDarkMode] = useState(false);
  const onSettingsButtonClick = () => {};
  const onDarkModeToggleClick = () => {
    setIsDarkMode((prevState) => !prevState);
    console.log(isDarkMode);
  };

  return (
    <div className="settings-bar-container">
      <button onClick={onSettingsButtonClick} className="settings-button">
        Gear Icon
      </button>
      <button onClick={onSettingsButtonClick} className="settings-button">
        Filters?
      </button>
      <button onClick={onSettingsButtonClick} className="settings-button">
        Volume
      </button>
      <label className="toggler-container" onClick={onDarkModeToggleClick}>
        <input type="checkbox" className="settings-dark-mode-toggler" />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default SettingsBar;
