import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    BuySellWidget: {
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        padding: "24px",
    },
    BuySellWidget__Nav: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        '& >div': {
            paddingBottom: '15px',
            width: '50%',
            color: "#2B3540",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0",
            lineHeight: "24px",
            textAlign: "center",
            borderBottom: '2px solid #EDEFF4',
            cursor: 'pointer',
            transition: '0.2s all',
            '&[data-selected="true"], &:hover': {
                borderBottom: '2px solid #0051FF',
            }
        }
    },
    BuySellWidget__Options: {
        marginBottom: '16.5px',
        paddingBottom: '16.5px',
        borderBottom: '1px solid #EDEFF4'
    },
    Options__Header: {
        color: "#4E5D6D",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '8px'
    },
    BuySellWidgetAmount: {
        marginBottom: "16px",
    },
    BuySellWidgetAmount__Header: {
        color: "#4E5D6D",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "8px",
        display: 'flex',
        alignItems: 'center',
        '&>span:first-child': {
            marginRight: 'auto'
        }
    },
    BuySellWidgetAmount__InputWrap: {
        position: "relative",
        "& input": {
            border: "1px solid #D2D9E1",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            display: "block",
            width: "100%",
            color: "#99A6B7",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "14px",
            padding: "16.5px",
            outline: "none",
            boxShadow: "none",
        },
        "& div": {
            color: "#004BFF",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0",
            lineHeight: "14px",
            paddingBottom: "1px",
            borderBottom: "2px solid #004BFF",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "10px",
            cursor: "pointer",
        },
    },
    BuySellWidgetInfo: {},
    BuySellWidgetInfo__Row: {
        display: "flex",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #EDEFF4",
    },
    BuySellWidgetInfo__RowTitle: {
        color: "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginRight: "auto",
    },
    BuySellWidgetInfo__RowValue: {
        color: "#4E5D6D",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        textAlign: "right",
    },
}));
