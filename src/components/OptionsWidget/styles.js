import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    OptionsWidget: {
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        padding: "29px 35px",
    },
    OptionsWidget__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '27px',
    },
    Options: {
        display: 'flex',
        alignItems: 'center'
    },
    Option: {
        padding: '5px 10px',
        borderRadius: '5px',
        background: 'rgba(46, 106, 250, 0.15)',
        marginRight: '5px',
    }
}));
