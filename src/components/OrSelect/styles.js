import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    OrSelect: {
        '& .OrSelect__value-container': {
            padding: '10.5px 16px',
            '& input': {
                color: theme.isDark ? "#fff !important" :  "#000 !important",
            }
        },
        '& .OrSelect__control': {
            backgroundColor: theme.isDark ? "#353F4D": "#EDF1F5",
            border: "1px solid #D2D9E1",
            borderRadius: "8px",
            '& .OrSelect__indicator-separator': {
                display: 'none'
            }
        },
        '& .OrSelect__single-value': {
            color: theme.isDark ? "#fff" :  "#000",
        },
        '& .OrSelect__menu': {
            backgroundColor: theme.isDark ? "#353F4D": "#EDF1F5",
            color: theme.isDark ? "#fff" :  "#000",
        },
        '& .OrSelect__option--is-focused': {
            color: theme.isDark ? "#000" :  "#000",
        }
    },
}));
