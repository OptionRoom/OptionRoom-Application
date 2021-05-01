import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LiquidityMiningPage: {
        [theme.breakpoints.up('md')]: {
            padding: '50px'
        },
        padding: '10px'
    },
    CourtFarmingTotalLockedValue: {
        textAlign: "center",
        fontSize: "20px",
        color: "#000",
        marginBottom: "20px",
        "& span": {
            color: "#004BFF",
        },
    },
    Pools: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    Pool: {
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        padding: "40px 16px 24px",
        width: "288px",
        marginBottom: "30px",
    },
    Pool__CustomColor: {
        /**
         * background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);
         background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
         */
        //backgroundImage: "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
        backgroundImage:
            "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
        //backgroundImage: "linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)",
        "& $Pool__Action__Link button": {
            background: "#363636",
            "&:hover": {
                background: "#ff9800",
            },
        },
    },
    Pool__IconWrap: {
        height: "128px",
        marginBottom: "40px",
        "& $Pool__IconWrap": {
            width: "128px",
            height: "128px",
            borderRadius: "50%",
            background: "#E9EAFF",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& img": {
                width: "96px",
            },
        },
    },
    Pool__IconWrap__Two: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& $Pool__IconWrap": {
            width: "96px",
            height: "96px",
            "& img": {
                width: "72px",
            },
        },
    },
    Pool__Title: {
        color: "#212529",
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
