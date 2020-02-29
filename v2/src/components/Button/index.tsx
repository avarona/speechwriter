import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

type Props = {
    children: JSX.Element | string;
    onClick: () => void;
    intent: 'primary' | 'secondary' | 'danger'
}

const Button = ({ children, onClick, intent }: Props) => (
    <button className={classnames(styles.buttonContainer, { [styles[intent]]: intent })} onClick={onClick}>
        {children}
    </button>
);

export default Button;