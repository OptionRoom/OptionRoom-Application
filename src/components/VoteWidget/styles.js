import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    VoteWidget: {
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        padding: "29px 35px",
    },
    VoteWidget__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '27px',
    },
    HeaderSubTxt: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        marginBottom: '27px'
    },
    VoteWidget__Options: {
        marginBottom: '16.5px',
        paddingBottom: '16.5px',
        borderBottom: '1px solid #EDEFF4',

    },
    Options__OptionsMarket: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        '& >div': {
            display: 'flex',
            '&>div': {
                marginRight: '4px',
                width: 'calc(50% - 4px)',
                '&:last-child':{
                    marginRight: 0
                }
            }
        }
    },
    VoteWidget__Progress: {
        marginBottom: '23px',
        '&>div': {
            marginBottom: '16px',
            '&:last-child': {
                marginBottom: 0
            }
        }
    },
}));
