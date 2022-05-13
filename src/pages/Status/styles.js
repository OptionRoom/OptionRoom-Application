import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    StatusPage: {
        padding: '50px'
    },
    Text: {
        fontSize: '20px',
        '& a': {
            color: theme.colors.primary,
            textDecoration: 'none'
        },
    },
    Social: {
        marginRight: '10px'
    }
}));
