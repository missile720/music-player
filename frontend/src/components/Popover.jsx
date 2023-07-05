/* eslint react/prop-types: 0 */
import { useState, useEffect, useRef } from 'react'
import VolumeComponent from './Volume'
import EqualizerComponent from './Equalizer';
import {Volume, Equalizer} from './icons';
import "./popover.css";

const Popover = ({content}) => {
    const [isVisible, setIsVisible] = useState(false)
    const popoverRef = useRef(null)
   

    const handleToggle = () => {
        setIsVisible(true)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isVisible && popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
            
    }, [])
        
    return (
        <div className='popover' ref={popoverRef}>
            {content === 'volume' ?
                isVisible ?
                    <VolumeComponent className="popover-content volume"/>
                : 
                    <Volume handleClick={() => handleToggle()}  />
                
                :
                isVisible ?
                    <EqualizerComponent className="popover-content volume"/>
                : 
                    <Equalizer handleClick={() => handleToggle()}  />
                
            }
            
        </div>
    )
}

export default Popover