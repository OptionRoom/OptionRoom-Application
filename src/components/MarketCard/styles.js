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
        display: "flex",
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
    },
    VolumeWrap: {
        marginRight: "auto",
        display: "flex",
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
        display: "flex",
    },
    Option: {
        width: "50%",
        "&:first-child": {
            marginRight: "1px",
            "& $Option__Val": {
                background: "rgba(46, 106, 250, 0.3)",
                color: theme.isDark ? "#fff" : "#2E6AFA",
                borderRadius: "13.5px 0px 0px 13.5px",
            },
        },
        "&:last-child": {
            "& $Option__Val": {
                background: "rgba(235, 87, 87, 0.3)",
                color: theme.isDark ? "#fff" :  "#EB5757",
                borderRadius: "0px 13.5px 13.5px 0px",
            },
        },
    },
    Option__Title: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "15px",
        textAlign: "center",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: theme.isDark ? "#818B95" : "#36414B",
        marginBottom: "8px",
    },
    Option__Val: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        padding: "4px 8px",
    },
    TitleWrap:{},
    MarketIsListView: {
        display: "flex",
        alignItems: "center",
        padding: "26px",
        "& $MainDetails": {
            padding: 0,
            display: "flex",
            borderBottom: 'none',
            marginRight: "auto",
        },
        "& $TitleWrap": {
            display: 'flex',
            flexWrap: 'wrap'
        },
        "& $CatStateLine": {
            display: "flex",
            alignItems: "center",
            marginBottom: 0,
            width: '100%'
        },
        "& $Cat": {},
        "& $State": {},
        "& $Title": {
            marginBottom: '4px',
            order: "-1",
            width: '100%'
        },
        "& $Avatar": {
            order: -1,
            marginRight: "10px",
        },
        "& $SubDetails": {
            display: "flex",
            padding: 0,
        },
        "& $VolumeWrap": {
            display: "flex",
            marginRight: "48px",
        },
        "& $VolumeIcon": {},
        "& $Volume__Title": {},
        "& $Volume__Val": {},
        "& $OptionsWrap": {},
        "& $Option": {},
        "& $Option__Title": {
            marginBottom: "4px",
        },
        "& $Option__Val": {},
    },
    //ListView
    MarketCardList: {
        flexWrap: "wrap",
        alignItems: "center",
        //borderRadius: '5px',
        backgroundColor: theme.colors.boxBg,
        //boxShadow: theme.colors.boxBoxShadow,
        textDecoration: "none",
        display: "flex",
        padding: "10px",
        position: "relative",
    },
    MarketCardList__IsFeatured: {
        background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        boxShadow: theme.colors.boxBoxShadow,
        position: "absolute",
        top: 0,
        left: 0,
        width: "3px",
        height: "100%",
        textIndent: "-999px",
        overflow: "hidden",
    },
    MarketCardList__Avatar: {
        borderRadius: "50%",
        height: "48px",
        width: "48px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        boxShadow: theme.colors.boxBoxShadow,
        border: "1px solid #e6edff",
        marginRight: "10px",
    },
    MarketCardList__Info: {
        '&[data-key="name"]': {
            width: "calc(100% - 388px)",
            marginRight: "10px",
        },
        '&[data-key="category"]': {
            width: "120px",
        },
        '&[data-key="volume"]': {
            width: "100px",
        },
        '&[data-key="option"]': {
            width: "50px",
        },
    },
    Info__Title: {
        display: "block",
        color: theme.isDark ? "#fff" : "#8293A6",
        fontSize: "13px",
        letterSpacing: "0",
        textTransform: "uppercase",
        fontWeight: 400,
        lineHeight: 1,
    },
    Info__Val: {
        color: theme.isDark ? "#fff" : "#4E5D6D",
        fontSize: "16px",
        fontWeight: 600,
        letterSpacing: "0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
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
