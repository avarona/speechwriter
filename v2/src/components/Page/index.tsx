import React from 'react';
import PageTitle from '../PageTitle';
import styles from './styles.module.scss';

type Props = {
    placeholder: string;
    title: string;
    body: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Page = ({ placeholder, title, body, handleTitleChange, handlePageChange }: Props) => (
    <div className={styles.pageContainer}>
        <PageTitle onChange={handleTitleChange}>{title}</PageTitle>

        <textarea
            className={styles.textarea}
            placeholder={placeholder}
            value={body}
            onChange={handlePageChange}
            autoFocus
        />
    </div>
);

export default Page;