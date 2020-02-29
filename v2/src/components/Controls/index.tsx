import React from 'react';
import { FaSave, FaVolumeUp, FaVolumeOff, FaMicrophone, FaMicrophoneSlash, FaToolbox } from 'react-icons/fa';
import Button from '../Button';
import styles from './styles.module.scss';

type Props = {
    save: () => void;
    toggleMic: () => void;
    toggleSpeaker: () => void;
    micOn?: boolean;
    speakerOn?: boolean;
}

const Controls = ({
    save,
    toggleMic,
    toggleSpeaker,
    micOn = false,
    speakerOn = false
}: Props) => {
    return (
        <div className={styles.controlsContainer}>
            <Button intent="secondary" onClick={save} circle>
                <FaSave />
            </Button>
            
            <Button intent="primary" onClick={toggleSpeaker} circle>
                {speakerOn ? <FaVolumeUp />: <FaVolumeOff />}
            </Button>

            <Button intent="danger" onClick={toggleMic} circle>
                {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </Button>

            <Button intent="primary" onClick={() => {}} circle>
                <FaToolbox />
            </Button>
        </div>
    )
};

export default Controls;