import React from 'react';
import classnames from 'classnames';
import getNotifMessage from '../../utils/getNotifMessage';
import styles from './styles.module.scss';

type Props = {
    message?: NotifMessage;
}

const Notification = ({ message }: Props) => {
    const isSuccess = message === 'success';
    console.log('message', message)
    return (
        <div className={classnames(styles.notifContainer, {
            [styles.visible]: message,
            [styles.success]: isSuccess,
            [styles.error]: !isSuccess
        })}>
            {message && getNotifMessage(message)}
        </div>
    )
};

export default Notification;