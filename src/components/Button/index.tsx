import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

type Props = {
    children: JSX.Element | string;
    onClick: () => void;
    intent: 'primary' | 'secondary' | 'danger';
    circle?: boolean;
}

const Button = ({ children, onClick, intent, circle }: Props) => (
    <button 
        onClick={onClick}
        className={classnames(styles.buttonContainer, { 
            [styles[intent]]: intent,
            [styles.circle]: circle 
        })}>
        {children}
    </button>
);

export default Button;