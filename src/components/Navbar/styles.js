import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Navbar: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '55px'
        },
        marginBottom: '20px'
    },
    Title: {
    },
    Title__Head: {
        fontSize: '28px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '32px',
        margin: '0 0 8px'
    },
    Title__Head___Black: {
        color: '#fff'
    },
    Title__Details: {
        color: theme.colors.secondaryTxt,
        fontSize: '18px',
        letterSpacing: 0,
        lineHeight: '24px',
    }
}));
