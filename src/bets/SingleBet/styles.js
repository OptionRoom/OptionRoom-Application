import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    BetPage: {
        padding: '50px 0',
        background: theme.isDark ? '#141A22' : '#F6FAFF'
    },
    LoadingWrapper: {
        padding: "100px",
        textAlign: "center",
    },
    ConnectWrap: {
        padding: "100px",
        textAlign: "center",
    },
    ChainWrap: {
        padding: '50px'
    },
    BetCardWrapper: {
        maxWidth: '1024px',
        margin: '0 auto'
    },
    BetCard: {
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
        marginBottom: '15px'
    },
    BaseToken: {
        '&>a': {
            padding: '5px 10px',
            borderRadius: '15px',
            background: 'rgb(241, 196, 15)',
            textDecoration: 'none',
            color: '#000',
            fontWeight: 'bold'
        }
    },
    Countdown: {
        padding: "25px 25px 25px",
        display: "flex",
        background: theme.isDark ? "rgba(242, 246, 250, 0.1)" : "#f2f6fa7a",
    },
    SubDetails: {
        padding: "25px",
        borderBottom: '1px solid #EDF1F5'
    },
    OptionsWrap: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    },
    ChoiceTemplate: {
        border: '1px solid #d6d6d6',
        padding: '15px',
        '&:nth-child(2n)': {
            borderLeft: 'none'
        }
    },
    ChoiceTemplate__Wrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    ChoiceTemplate__Title: {
        marginRight: 'auto'
    },
    ChoiceTemplate_Owns: {
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        display: 'flex',
        marginRight: 'auto',
        '&>div:first-child': {
            marginRight: '10px'
        },
        '& span': {
            marginLeft: '5px',
            fontWeight: 'bold'
        }
    },
    ChoiceTemplate__Wrapper__Actions: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
        '&>button:nth-child(2n)': {
            marginLeft: '5px'
        }
    },
    ChoiceTemplate_BuyBtn: {
        cursor: 'pointer',
        background: theme.colors.primary,
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '10px',
        fontSize: '14px',
    },
    ChoiceTemplate_ClaimBtn: {
        cursor: 'pointer',
        background: theme.colors.primary,
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '10px',
        fontSize: '14px',
    },
    Options__BuyTitle: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginRight: '15px'
    },
    VolumeWrap: {
        display: "flex",
    },
    VolumeIcon: {
        width: "43px",
        height: "43px",
        display: "flex",
        background: theme.isDark ? "rgba(242, 246, 250, 0.1)" : "#F2F6FA",
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
    CounterWrapper: {
        display: 'flex',
        marginRight: 'auto',
        alignItems: 'center',
        color: theme.isDark ? '#fff' : '#36414B',
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
    },
    description: {
        padding: '20px',
        fontSize: '16px'
    }
}));
