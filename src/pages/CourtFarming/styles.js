import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LiquidityMiningPage: {
        [theme.breakpoints.up('md')]: {
            padding: '50px'
        },
        padding: '10px'
    },
    CourtFarmingTotalLockedValue: {
        //textAlign: "center",
        fontSize: "20px",
        color: theme.colors.txtColor,
        marginBottom: "20px",
        "& span": {
            color: "#004BFF",
        },
    },
    Pools: {
        display: "flex",
        alignItems: "center",
        //justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    Pool: {
        filter: "drop-shadow(3px 3px 0px #2E6AFA)",
        boxShadow: "0px 2px 20px rgba(95, 140, 182, 0.05)",
        borderRadius: "10px",
        background: "#fff",
        padding: "40px 16px 24px",
        width: "288px",
        marginBottom: "30px",
        marginRight: '20px',
        '&:last-child': {
            marginRight: 0
        }
    },
    Pool__CustomColor: {
        backgroundImage:
            "linear-gradient(180deg, #F3F7FF 0%, #CEDDFF 100%)",
        "& $Pool__Action__Link button": {
            background: "#363636",
            "&:hover": {
                background: "#ff9800",
            },
        },
        "& $Pool__Title": {
            color: "#212529",
        },
    },
    Pool__IconWrap: {
        //height: "128px",
        marginBottom: "40px",
        "& $Pool__IconWrap": {
            width: "87px",
            height: "87px",
            borderRadius: "50%",
            background: "rgba(246, 250, 255, 0.3)",
            border: "1px solid #C4DCFA",
            margin: "0 auto",
            padding:'3px',
            '&>div': {
                background: "#EBF4FF",
                border: "1px solid #BCD8FB",
                display: "flex",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                height: '100%',
                "& img": {
                    width: "70%",
                },
            }
        },
    },
    Pool__IconWrap__Two: {
        display: "flex",
        //alignItems: "center",
        justifyContent: "center",
/*        "& $Pool__IconWrap": {
            width: "87px",
            height: "87px",
            "& img": {
                width: "70%",
            },
        },*/
    },
    Pool__Title: {
        color: theme.isDark ? "#fff" : "#212529",
        fontSize: "20px",
        letterSpacing: 0,
        lineHeight: "24px",
        textAlign: "center",
        marginBottom: "15px",
    },
    Pool__ExtraInfo: {
        marginBottom: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    Pool__ExtraInfo__X: {
        padding: "7px 15px",
        fontSize: "14px",
        background: "#ff9800",
        color: "#000",
        borderRadius: "15px",
        lineHeight: "12px",
        marginRight: "10px",
        position: "relative",
    },
    Pool__ExtraInfo__ROI: {
        padding: "7px 15px",
        fontSize: "14px",
        background: "#ff9800",
        color: "#000",
        borderRadius: "15px",
        lineHeight: "12px",
        position: "relative",
        cursor: "pointer",
    },
    Pool__ExtraInfo__Details: {
        position: "absolute",
        top: "-7.5px",
        right: "0",
        width: "15px",
        height: "15px",
        lineHeight: "15px",
        display: "block",
        borderRadius: "50%",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        cursor: "pointer",
        "&>svg": {
            fontSize: "14px",
        },
    },
    Pool__Action: {},
    Pool__Action__Link: {
        textDecoration: "none",
    },

    ConnectWrap: {
        textAlign: "center",
        padding: "100px 0",
    },
}));
