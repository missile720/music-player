import { useState } from 'react'
import Popover from './Popover';
import Settings from './SettingsOffCanvas'


import "./SettingsBar.css";

const SettingsBar = () => {
  const [darkMode, setDarkMode] = useState(false)
  
  return (
    <div className="settings-bar-container">
      {/* Settings */}
      <Settings />

      {/* Equalizer */}
      <Popover content={'Equalizer'} className="settings-button"/>

      {/* Volume */}
      <Popover content={'volume'} className="settings-button" />

      {/* Dark mode */}
      <div className="form-check form-switch dark-mode-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
      </div>
    </div>
  );
};

export default SettingsBar;
