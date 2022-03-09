import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    BuySellWidget: {
        borderRadius: "16px",
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: `${theme.colors.boxBoxShadow}`,
        padding: "24px",
    },
    BuySellWidget__Nav: {
        marginBottom: '24px',

        /*        display: 'flex',
                alignItems: 'center',
                '& >div': {
                    paddingBottom: '15px',
                    width: '50%',
                    color: theme.isDark ? "#fff" : "#2B3540",
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
                }*/
    },
    BuySellWidget__Options: {
        marginBottom: '16.5px',
        paddingBottom: '16.5px',
        borderBottom: '1px solid #EDEFF4'
    },
    Options__Header: {
        color: theme.isDark ? "#fff" : "#4E5D6D",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '8px'
    },
    Options__Options: {
        display: 'flex',
        '&>div': {
            marginRight: '4px',
            width: 'calc(25% - 4px)',
            '&:last-child':{
                marginRight: 0
            }
        }
    },
    BuySellWidgetAmount: {
        marginBottom: "16px",
    },
    BuySellWidgetAmount__Header: {
        color: theme.isDark ? "#fff" : "#4E5D6D",
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
        marginBottom: '10px',

    },
    BuySellWidgetInfo: {},
    BuySellWidgetInfo__Row: {
        display: "flex",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #EDEFF4",
        "&:last-child": {
            borderBottom: 'none'
        }
    },
    BuySellWidgetInfo__RowTitle: {
        color: theme.isDark ? "#fff" : "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginRight: "auto",
    },
    BuySellWidgetInfo__RowValue: {
        color: theme.isDark ? "#fff" : "#4E5D6D",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        textAlign: "right",
    },
}));
