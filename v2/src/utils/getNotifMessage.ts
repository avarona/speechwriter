import { NOTIFS } from '../constants';

const getNotifMessage = (msg: 'success' | 'error' | 'err-empty') => {
    switch(msg) {
        case 'success':
            return NOTIFS.SUCCESS;
        case 'err-empty':
            return NOTIFS.ERRORS.SAVE;
        case 'error':
            return NOTIFS.ERRORS.GENERIC;
        default:
            return NOTIFS.ERRORS.GENERIC;
    }
};

export default getNotifMessage;