import { useContext, useState } from 'react'
import Popover from './Popover';
import Settings from './SettingsOffCanvas'
import { ThemeContext } from '../contexts/ThemeContext';



import "./SettingsBar.css";

const SettingsBar = () => {
  const { mode, toggleDarkMode } = useContext(ThemeContext)
  const [dark, setDark] = useState(mode === 'dark' ? true : false)
  const [settingsActive, setSettingsActive] = useState(false)

  const handleSettingsActive = () => {
    setSettingsActive(prev => !prev)
  }

  const handleThemeChange = () => {
    setDark((curr) => !curr)
    toggleDarkMode()
  }

  return (
    <div className="settings-bar-container">
      {/* Settings */}
      <Settings handleClick={() => {
        handleSettingsActive()
      }} />

      {/* Equalizer */}
      {!settingsActive && <Popover content={'Equalizer'} className="settings-button popover" />}

      {/* Volume */}
      {!settingsActive && <Popover content={'volume'} className="settings-button popover" />}

      {/* Dark mode */}
      <div className="form-check form-switch dark-mode-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={dark} onChange={handleThemeChange} />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
      </div>
    </div>
  );
};

export default SettingsBar;
