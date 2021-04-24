import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    NotWhitelisted: {
        padding: '50px 24px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 20px 0 #E6EDFF',
        textAlign: 'center',
        '&>div:first-child': {
            color: "#212529",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "0",
            lineHeight: "28px",
            marginBottom: '24px',
            display: 'block',
            textDecoration: 'none',
        }
    }
}));
