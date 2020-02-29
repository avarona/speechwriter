import React from 'react';

type Props = {
    children: JSX.Element | string;
    onClick: () => void;
}

const Button = ({ children, onClick }: Props) => (
    <button onClick={onClick}>
        {children}
    </button>
);

export default Button;