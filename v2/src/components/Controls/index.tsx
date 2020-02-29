import React from 'react';
import { FaSave, FaVolumeUp, FaVolumeOff, FaMicrophone, FaMicrophoneSlash, FaToolbox } from 'react-icons/fa';
import Button from '../Button';
import styles from './styles.module.scss';

type Props = {
    micOn?: boolean;
    soundOn?: boolean;
}

const Controls = ({ micOn = false, soundOn = false}: Props) => {
    return (
        <div className={styles.controlsContainer}>
            <Button intent="secondary" onClick={() => {}} circle>
                <FaSave />
            </Button>
            
            <Button intent="primary" onClick={() => {}} circle>
                {soundOn ? <FaVolumeUp />: <FaVolumeOff />}
            </Button>
            <Button intent="danger" onClick={() => {}} circle>
                {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </Button>
            <Button intent="primary" onClick={() => {}} circle>
                <FaToolbox />
            </Button>
        </div>
    )
};

export default Controls;