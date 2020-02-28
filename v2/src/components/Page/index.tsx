import React from 'react';
import styles from './styles.module.scss';

type Props = {
    placeholder: string;
}

const Page = ({ placeholder }: Props) => (
    <div className={styles.pageContainer}>
        <textarea
            className={styles.textarea}
            placeholder={placeholder}
            autoFocus
        />
    </div>
);

export default Page;