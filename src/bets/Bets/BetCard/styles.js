import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    MarketCard2: {
        filter: "drop-shadow(3px 3px 0px #2E6AFA)",
        boxShadow: "0px 2px 20px rgba(95, 140, 182, 0.05)",
        borderRadius: "10px",
        background: theme.isDark ? "#242D38" : "#fff",
        textDecoration: "none",
        display: "block",
        overflow: 'hidden'
    },
    MainDetails: {
        padding: "19px 20px 30px",
        borderBottom: "1px solid #EDF1F5",
    },
    CatStateLine: {
        marginBottom: "19px",
        display: "flex",
        alignItems: "center",
    },
    Cat: {
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginRight: "9px",
    },
    State: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "15px",
        color: "#FFFFFF",
        background: "#27AE60",
        padding: "2px 4px",
        borderRadius: "9px",
    },
    Title: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "23px",
        letterSpacing: "0.01em",
        color: theme.isDark ? "#fff" : "#36414B",
    },
    Avatar: {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        border: "2px solid #2E6AFA",
        marginLeft: "auto",
        padding: "2px",
        "&>img": {
            width: "37px",
            height: "37px",
            borderRadius: "50%",
        },
    },
    Countdown: {
        padding: "25px 25px 25px",
        display: "flex",
        background: theme.isDark ? "rgba(242, 246, 250, 0.1)" : "#f2f6fa7a" ,
    },
    SubDetails: {
        padding: "25px",
        display: "flex",
        alignItems: 'center'
    },
    VolumeWrap: {
        marginRight: "auto",
        display: "flex",
        flex: 4
    },
    VolumeIcon: {
        width: "43px",
        height: "43px",
        display: "flex",
        background: theme.isDark ? "rgba(242, 246, 250, 0.1)" : "#F2F6FA" ,
        alignItems: "center",
        marginRight: "13px",
        borderRadius: "10px",
        justifyContent: "center",
    },
    Volume__Title: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
    },
    Volume__Val: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "26px",
        letterSpacing: "0.005em",
        color: theme.isDark ? "#fff" : "#36414B",
    },
    OptionsWrap: {
        background: "rgba(46, 106, 250, 0.3)",
        color: theme.isDark ? "#fff" : "#2E6AFA",
        borderRadius: "13.5px",
        padding: '10px 15px'
    },
    TitleWrap:{},
    CounterWrapper: {
        display: 'flex',
        alignItems: 'center',
        color: theme.isDark ? '#fff' : '#36414B',
        width: '100%',
        '&>div:first-child': {
            marginRight: 'auto'
        }
    },
    CounterWrapperInner: {
        display: 'flex',
        alignItems: 'center',
        color: theme.isDark ? '#fff' : '#36414B',
        '&>div': {
            marginRight: '10px'
        },
        '&>div>span:first-child': {
            fontSize: '20px',
            marginRight: '2px'
        }
    }
}));
