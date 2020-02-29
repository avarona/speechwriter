import React from 'react';
import styles from './styles.module.scss';

type Props = {
    children: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PageTitle = ({ children, onChange }: Props) => (
    <input className={styles.titleContainer} value={children} onChange={onChange} placeholder="Name me something" />
);

export default PageTitle;