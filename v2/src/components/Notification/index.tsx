import React from 'react';
import classnames from 'classnames';
import getNotifMessage from '../../utils/getNotifMessage';
import styles from './styles.module.scss';

type Props = {
    message?: 'success' | 'error' | 'err-empty' | 'err-nodocs';
}

const Notification = ({ message }: Props) => {
    const isSuccess = message === 'success';
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