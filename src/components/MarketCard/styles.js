import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    MarketCard: {
        position: 'relative',
        overflow: 'hidden',
        padding: '24px',
        borderRadius: '20px',
        backgroundColor: theme.colors.boxBg,
        boxShadow: theme.colors.boxBoxShadow,
        textDecoration: 'none',
        display: 'block',
        height: '300px'
    },
    MarketIsFeatured: {
        '& $TitleBlock': {
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '10px',
            borderRadius: '5px'
        },
        '& $Details': {
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '10px',
            borderRadius: '5px'
        },
        '& $Header': {
            display: 'none'
        }
    },
    Header: {
      display: 'flex'
    },
    HeaderSub: {
      textAlign: 'right'
    },
    Avatar: {
        borderRadius: '50%',
        height: "48px",
        width: "48px",
        //marginTop: '26px',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        boxShadow: theme.colors.boxBoxShadow,
        border: '1px solid #e6edff',
        marginBottom: '15px'
    },
    ContentWrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '24px'
    },
    IsFeatured: {
        display: 'inline-block',
        background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px',
        marginBottom: '5px',
        fontSize: '12px',
        fontWeight: 700,
        boxShadow: theme.colors.boxBoxShadow,

        //border: '1px solid #e6edff',
    },
    TitleBlock: {
        marginBottom: '5px',
    },
    Title: {
        color: theme.colors.txtColor,
        fontSize: "18px",
        fontWeight: 700,
        letterSpacing: "0",
        lineHeight: "24px",
        margin: '0',
        textDecoration: 'none',
        wordBreak: 'break-word',
        //minHeight: '56px'
    },
    Cat: {
        color: "#8293A6",
        fontSize: "12px",
        letterSpacing: "0",
        //marginBottom: '5px',
        textTransform: 'uppercase',
    },
    MarketState: {
        color: "#FFFFFF",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "12px",
        textAlign: "center",
        borderRadius: "5px",
        backgroundColor: "#8293A6",
        padding: '2px 8px'
    },
    Details: {
        display: 'flex',
        alignItems: 'center'
    },
    Volume: {
        marginRight: 'auto',
    },
    Volume__Title: {
        color: "#8293A6",
        fontSize: "13px",
        letterSpacing: "0",
        //lineHeight: "24px",
        textTransform: 'uppercase',
    },
    Volume__Value: {
        color: "#4E5D6D",
        fontSize: "16px",
        fontWeight: 600,
        letterSpacing: "0",
        //lineHeight: "24px",
    },
    Options: {
        display: 'flex'
    },
    Option: {
        textTransform: 'uppercase',
        //textAlign: 'right',
        //width: '50px'
/*        marginRight: '24px',
        '&:last-child': {
            marginRight: '0'
        }*/
        '&:first-child': {
            marginRight: '15px'
        }
    },
    Option__Title: {
        color: "#8293A6",
        fontSize: "13px",
        letterSpacing: "0",
        //lineHeight: "24px"
    },
    Option__Value: {
        borderRadius: "12px",
        //backgroundColor: "#EDEFF4",
        color: "#4E5D6D",
        fontSize: "16px",
        fontWeight: 600,
        letterSpacing: "0",
        //lineHeight: "24px",
    },
    Option__ValueYes: {
        //background: '#86DC8B'
    },
    Option__ValueNo: {
        //background: '#7084FF'
    },
    smallAn: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "$myEffect 15s ease infinite",
        height: '5px'
    },
    "@keyframes myEffect": {
        "0%": {
            backgroundPosition: '0% 50%'
        },
        "50%": {
            backgroundPosition: '100% 50%'
        },
        "100%": {
            backgroundPosition: '0% 50%'
        }
    },
    Cat__Title: {
        display: 'none'
    },
    Title__Title: {
        display: 'none'
    },
    MarketCardList: {
        flexWrap: 'wrap',
        alignItems: 'center',
        //borderRadius: '5px',
        backgroundColor: theme.colors.boxBg,
        //boxShadow: theme.colors.boxBoxShadow,
        textDecoration: 'none',
        display: "flex",
        padding: '10px',
        position: 'relative'
    },
    MarketCardList__IsFeatured: {
        background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
        boxShadow: theme.colors.boxBoxShadow,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '3px',
        height: '100%',
        textIndent: '-999px',
        overflow: 'hidden'
    },
    MarketCardList__Avatar: {
        borderRadius: '50%',
        height: "48px",
        width: "48px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        boxShadow: theme.colors.boxBoxShadow,
        border: '1px solid #e6edff',
        marginRight: '10px'
    },
    MarketCardList__Info: {
        '&[data-key="name"]': {
            width: 'calc(100% - 388px)',
            marginRight: '10px'
        },
        '&[data-key="category"]': {
            width: '120px'
        },
        '&[data-key="volume"]': {
            width: '100px'
        },
        '&[data-key="option"]': {
            width: '50px'
        }
    },
    Info__Title: {
        display: 'block',
        color: "#8293A6",
        fontSize: "13px",
        letterSpacing: "0",
        textTransform: 'uppercase',
        fontWeight: 400,
        lineHeight: 1
    },
    Info__Val: {
        color: "#4E5D6D",
        fontSize: "16px",
        fontWeight: 600,
        letterSpacing: "0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
}));
