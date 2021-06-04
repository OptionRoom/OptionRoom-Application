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
        background: "#f6faff",
    },
    MarketsPage__Main: {
        width: "calc(100% - 335px)",
        padding: "40px",
    },
    MarketsPage__Sidebar: {
        width: "335px",
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
        color: "#36414B",
    },
    MarketsPage__HeaderActions: {
        display: "flex",
        alignItems: "center",
        "& svg": {
            color: "#818b95",
            marginRight: "18px",
        },
        "&>div": {},
        "& a": {
            textDecoration: "none",
        },
    },
    MarketsList: {
        display: "flex",
        flexWrap: "wrap",
        [theme.breakpoints.up('md')]: {
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
            marginBottom: 0,
            width: '100%',
            margin: 0,
        },
    },
}));
