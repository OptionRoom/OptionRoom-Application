import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => {
    return {
        LoadingWrapper: {
            padding: '100px',
            textAlign: 'center'
        },
        CourtToRoomSwapPage:{
            [theme.breakpoints.up('md')]: {
                padding: '50px'
            },
            padding: '10px'
        },
        CourtToRoomSwapPage__Main:{
            maxWidth: '600px',
        },
        ConnectWrap: {
            padding: '100px',
            textAlign: 'center'
        },
        SwapBox: {
            borderRadius: "16px",
            backgroundColor: theme.isDark ? "#242D38" : "#fff",
            boxShadow: theme.colors.boxBoxShadow,
            marginBottom: '24px',
            padding: '24px'
        },
        SwapBox__Info: {
            color: "#4E5D6D",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px",
            marginBottom: '20px',
            '& span': {
                fontWeight: 700
            }
        },
        SwapBox__ValHeadline: {
            color: "#4E5D6D",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px",
            marginBottom: '10px'
        },
        TradeInputWrap: {},
        SwapBox_ActionWrap: {},
    }
});
