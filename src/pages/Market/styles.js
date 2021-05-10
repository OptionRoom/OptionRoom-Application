import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LoadingWrapper: {
        padding: '100px',
        textAlign: 'center'
    },
    ConnectWrap: {
        padding: '100px',
        textAlign: 'center'
    },
    MarketsPage__Header: {
        padding: '20px',
        marginBottom: '30px',
        background: theme.isDark ? 'rgb(39, 38, 44)' : '#fff',
        [theme.breakpoints.up('md')]: {
            padding: '50px 100px',
        },
    },
    Sidebar: {},
    MarketDetails: {
        padding: '0 20px',
        [theme.breakpoints.up('md')]: {
            padding: '0 100px',
        },
    },
    MarketsPage__HeaderDeatils: {
        display: 'flex',
        alignItems: 'center'
    },
    MarketDetails__HeaderAvatar: {
        borderRadius: '50%',
        height: "50px",
        width: "50px",
        boxShadow: theme.colors.boxBoxShadow,
        //backgroundSize: "cover",
        //backgroundRepeat: "no-repeat",
        marginRight: '15px',
        //backgroundPosition: 'center center'
    },
    MarketDetails__HeaderTitle: {
        width: 'calc(100% - 65px)'
    },
    Cat: {
        color: theme.colors.secondaryTxt,
        fontSize: "15px",
        letterSpacing: "0",
    },
    Title: {
        color: theme.isDark ? "#fff" : "#171D28",
        fontSize: "26px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "32px",
        wordBreak: 'break-word'
    },
    Info: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: `${theme.colors.boxBg}`,
        boxShadow: theme.colors.boxBoxShadow,
        display: "flex",
        marginBottom: "24px",
        justifyContent: "space-between",
    },
    Info__Block: {},
    Info__BlockTitle: {
        color: theme.isDark ? "#fff" : "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "4px",
    },
    Info__BlockValue: {
        color: theme.isDark ? "#fff" : "#4E5D6D",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
    },
    Graph: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: `${theme.colors.boxBg}`,
        boxShadow: theme.colors.boxBoxShadow,
        marginBottom: "24px",
    },
    Graph__Header: {
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
    },
    Graph__HeaderTitle: {
        marginRight: "auto",
        color: theme.isDark ? "#fff" : "#3F4A57",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
    },
    Graph__HeaderNav: {
        display: "flex",
        alignItems: "center",
    },
    Graph__HeaderNavOption: {
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "32px",
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "#EDEFF4",
        padding: "0 12px",
        marginLeft: "8px",
        color: "#8293A6",
        transition: "0.2s all",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#004BFF",
            color: "#FFFFFF",
        },
    },
    Graph__HeaderNavOption__Selected: {
        backgroundColor: "#004BFF",
        color: "#FFFFFF",
    },
    Graph__Deatils: {},

    Outcome: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: `${theme.colors.boxBg}`,
        boxShadow: theme.colors.boxBoxShadow,
        marginBottom: "24px",
    },
    Outcome__Header: {
        color: theme.isDark ? "#fff" : "#3F4A57",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "16px",
    },
    Outcome__Details: {
        display: "flex",
        '&>div': {
            width: "calc(100% - 24px)",
            "&:first-child": {
                marginRight: "48px",
            },
        }
    },
    MarketPositions: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: `${theme.colors.boxBg}`,
        boxShadow: theme.colors.boxBoxShadow,
        marginBottom: "24px",
    },
    MarketPositions__Header: {
        color: theme.isDark ? "#fff" : "#3F4A57",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "16px",
    },
    MarketPositions__Details: {},
    MarketPosition__Block: {
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #EDEFF4",
        padding: "16px 0",
        "& span:first-child": {
            marginRight: "auto",
            color: theme.isDark ? "#fff" : "#8293A6",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px",
        },
        "& span:last-child": {
            color: theme.isDark ? "#fff" : "#4E5D6D",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0",
            lineHeight: "24px",
            textAlign: "right",
        },
        "&:first-child": {
            paddingTop: "0",
        },
        "&:last-child": {
            borderBottom: "none",
        },
    },

    About: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: `${theme.colors.boxBg}`,
        boxShadow: theme.colors.boxBoxShadow,
        marginBottom: "24px",
    },
    About__Header: {
        color: theme.isDark ? "#fff" : "#3F4A57",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "16px",
    },
    About__Details: {
        color: theme.isDark ? "#fff" : "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
    },

    Resolution: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: theme.isDark ? theme.colors.boxBg : "#E9EAFF",
        marginBottom: "24px",
        wordBreak: 'break-all'
    },
    Resolution__Header: {
        color: theme.colors.secondaryTxt,
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "8px",
    },
    Resolution__Details: {},
    ResolutionLink: {
        color: "#0042FF",
        fontSize: "12px",
        letterSpacing: "0",
        lineHeight: "24px",
    },
    MarketLiquidityWidgetWrap: {
        marginBottom: "24px",
    }
}));
