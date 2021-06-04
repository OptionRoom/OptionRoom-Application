import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    MarketsPage: {
        background: '#F6FAFF'
    },
    LoadingWrapper: {
        padding: "100px",
        textAlign: "center",
    },
    ConnectWrap: {
        padding: "100px",
        textAlign: "center",
    },
    MarketsPage__Header: {
        padding: "20px",
        marginBottom: "30px",
        background: theme.isDark ? "rgb(39, 38, 44)" : "#fff",
        [theme.breakpoints.up("md")]: {
            padding: "50px 100px",
        },
    },
    Sidebar: {},
    MarketDetails: {
        padding: '30px 0',
        //padding: "0 20px",
        [theme.breakpoints.up("md")]: {
            //padding: "0 100px",
        },
    },
    MarketsPage__HeaderDeatils: {
        display: "flex",
        alignItems: "center",
    },
    MarketDetails__HeaderAvatar: {
        borderRadius: "50%",
        height: "50px",
        width: "50px",
        boxShadow: theme.colors.boxBoxShadow,
        //backgroundSize: "cover",
        //backgroundRepeat: "no-repeat",
        marginRight: "15px",
        //backgroundPosition: 'center center'
    },
    MarketDetails__HeaderTitle: {
        width: "calc(100% - 65px)",
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
    About: {
        padding: "29px 35px",
        background: "#FFFFFF",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        marginBottom: "22px",
    },
    About__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '18px'
    },
    About__Details: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "23px",
        color: "#36414B"
    },
    Resolution: {
        padding: "29px 35px",
        background: "#FFFFFF",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        marginBottom: "22px",
    },
    Resolution__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '18px'
    },
    Resolution__Details: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "23px",
        color: "#36414B"
    },
    ResolutionLink: {
        marginBottom: '8px',
        '& a': {
            textDecoration: 'none',
            color: '#2E6AFA'
        }
    },
    MarketWidgetWrap: {
        marginBottom: "18px",
    },
    //New Design
    MarketsPage__Header2: {
        background: "#fff",
        padding: "25px 0 45px",
        boxShadow: "0px 4px 20px rgba(82, 104, 130, 0.05)",
    },
    MarketsPage__Header2Container: {
        maxWidth: "1200px",
        margin: "0 auto",
    },
    Title: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "30px",
        lineHeight: "38px",
        color: "#36414B",
    },
    Cat: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "23px",
        color: "#818B95",
    },
    Gallery: {
        marginTop: '30px',
        display: "flex",
        "& img": {
            width: "133px",
            height: "121px",
            borderRadius: "8px",
        },
    },
    TradeVolume: {
        marginBottom: '24px',
        paddingBottom: '24px',
        borderBottom: "1px solid #EAEAEA"
    },
    TradeVolume__Title: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "19px",
        color: "#818B95",
        marginBottom: '13px'
    },
    TradeVolume__Details: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: '6px'
        }
    },
    TradeVolume__DetailsVal: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "35px",
        lineHeight: "26px",
        letterSpacing: "-0.01em",
        color: "#36414B"
    },
    LiqEndBlock: {
        marginBottom: '21px',
        display: 'flex'
    },
    LiqEndBlock__Icon: {
        width: '43px',
        height: '43px',
        marginRight: '23px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "10px"
    },
    LiqEndBlock__IconEndsAt: {
        background: 'rgba(46, 106, 250, 0.15)'
    },
    LiqEndBlock__IconLiquidity: {
        background: 'rgba(8, 181, 77, 0.15)'
    },
    LiqEndBlock__Details: {},
    LiqEndBlock__DetailsTitle: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "19px",
        color: "#818B95"
    },
    LiqEndBlock__DetailsVal: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "15px",
        lineHeight: "26px",
        letterSpacing: "0.005em",
        color: "#36414B"
    },
}));
