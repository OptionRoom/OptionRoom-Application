import { makeStyles } from "@material-ui/core/styles";
import FooterBg from "./footer-bg.png";

const numberOfColumns = 3;
const marginBetweenEntries = 15;

export const useStyles = makeStyles((theme) => ({
    LoadingWrapper: {
        padding: "100px",
        textAlign: "center",
    },
    ConnectWrap: {
        padding: "100px",
        textAlign: "center",
    },
    MarketsPage: {
        display: "flex",
        background: theme.isDark ? "#141A22" : "#f6faff",
    },
    MarketsPage__Main: {
        width: "100%",
        [theme.breakpoints.up('md')]: {
            width: "calc(100% - 335px)",
        },
        padding: "40px",
    },
    MarketsPage__SidebarOverlay: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)'
    },
    MarketsPage__Sidebar: {
        width: "335px",
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        borderRight: '2px solid rgba(133, 133, 133, 0.1)',
        backgroundColor: theme.isDark ? "#242D38" : 'rgb(255, 255, 255)',
        paddingTop: '80px',
        transform: 'translateX(100%)',
        transition: '0.2s all',
        zIndex: '99',
        overflow: 'auto',
        [theme.breakpoints.up('md')]: {
            transform: 'translateX(0)',
        },
    },
    MarketsPage__Sidebar__MobileOpen: {
        transform: 'translateX(0)',
    },
    MarketsPage__Sidebar__IsMin: {
        paddingTop: '15px'
    },
    MarketsPage__Header: {
        display: "flex",
        marginBottom: "25px",
        alignItems: "center",
    },
    MarketsPage__HeaderTitle: {
        marginRight: "auto",
        fontSize: "30px",
        lineHeight: "38px",
        color: theme.isDark ? "#BFD1E1" : "##36414B",
    },
    MarketsPage__HeaderActions: {
        display: "flex",
        alignItems: "center",

        "&>div": {},
        "& a": {
            textDecoration: "none",
        },
    },
    notFoundResults: {
        textAlign: 'center',
        padding: '15px',
        '& svg': {
            fontSize: '60px',
            marginBottom: '15px'
        },
        '& div': {
            fontSize: '16px'
        }
    },
    MarketsPage__HeaderActionsFilters: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    MarketsPage__HeaderActionsIconWrapView: {
      cursor: 'pointer'
    },
    MarketsPage__HeaderActionsIconWrap: {
        marginRight: "18px",
    },
    MarketsPage__HeaderActionsIconWrapActive: {
        "& svg path": {
            stroke: "#2E6AFA",
        },
    },
    MarketsList: {
        "&>div": {
            marginBottom: "20px",
        },
        [theme.breakpoints.up('md')]: {
            display: "flex",
            flexWrap: "wrap",
            "&>div": {
                width: "calc(50% - 10px)",
                marginRight: "20px",
                marginBottom: "20px",
                "&:nth-child(2n)": {
                    marginRight: 0,
                },
            },
        },
    },
    MarketsList__ListView: {
        display: 'block',
        '&>div': {
            margin: '0 0 15px',
            width: '100%',
        },
    },
    ChainWrap: {
        padding: '50px'
    }
}));
