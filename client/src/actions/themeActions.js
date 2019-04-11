import { SET_THEME } from './types';

const setTheme = theme => {
    return {
        type: SET_THEME,
        payload: theme
    };
};

export default setTheme;