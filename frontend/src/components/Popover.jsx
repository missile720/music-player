/* eslint react/prop-types: 0 */
import {
    useState,
    useEffect,
    useRef,
    useContext
} from 'react'

import { MusicPlayerStateContext } from '../contexts/MusicPlayerStateContext';

import VolumeComponent from './Volume'
import EqualizerComponent from './Equalizer';
import { Volume, Equalizer } from './icons';

import "./popover.css";

const Popover = ({ content }) => {
    const { currentSongSource } = useContext(MusicPlayerStateContext)

    const [isVisible, setIsVisible] = useState(false)
    const [enabled, setEnabled] = useState(true)
    const popoverRef = useRef(null)

    const handleToggle = () => {
        setIsVisible(true)
    }

    console.log(currentSongSource)

    const popoverClassName = () => {
        let className = "popover "

        if (!enabled) {
            className += " disabled-popover"
        }

        return className
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isVisible &&
                popoverRef.current &&
                !popoverRef.current.contains(event.target)) {
                setIsVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [])

    useEffect(() => {
        // If the current song source is local, disables the popovers.
        // Since the SpotifyPlayer disallows us from adjusting EQ
        // and volume, this allows us to indicate to the user that they
        // should use the SpotifyPlayer's volume controls instead of the
        // SetttingBar's
        setEnabled(currentSongSource === "local")
    }, [currentSongSource])

    return (
        <div
            className={popoverClassName()}
            ref={popoverRef}
        >
            {content === 'volume' ?
                isVisible ?
                    <VolumeComponent className="popover-content volume" />
                    :
                    <Volume handleClick={() => handleToggle()} />

                :
                isVisible ?
                    <EqualizerComponent className="popover-content volume" />
                    :
                    <Equalizer handleClick={() => handleToggle()} />

            }

        </div>
    )
}

export default Popover