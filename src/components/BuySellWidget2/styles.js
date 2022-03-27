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
    OptionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    OptionBlock: {
        display: 'flex',
        width: '49%',
        alignItems: 'center',
        background: '#F7FAFF',
        padding: '10px 10px',
        borderBottom: '1px solid #efefef',
        borderRadius: '5px',
        marginBottom: '5px'
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
    },
    BuySellBtn: {
        marginLeft: '5px'
    },
}));
