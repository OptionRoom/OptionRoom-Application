import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    BuySellWidget: {
        borderRadius: "16px",
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: `${theme.colors.boxBoxShadow}`,
        padding: "24px",
    },
    Title: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '18px'
    },
    OptionBlock: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: '#F7FAFF',
        padding: '10px 10px',
        borderBottom: '1px solid #efefef',
        '&:first-child': {
            borderRadius: '5px 5px 0 0'
        },
        '&:last-child': {
            borderRadius: '0 5px 5px 0',
            borderBottom: 'none'
        }
    },
    OptionName: {
        fontSize: '18px',
        marginRight: 'auto'
    },
    BuySellWrap: {
        display: 'flex',
        alignItems: 'center',
        '&>div': {
            fontSize: '18px',
            textTransform: "uppercase",
            marginLeft: '5px',
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    }
}));
