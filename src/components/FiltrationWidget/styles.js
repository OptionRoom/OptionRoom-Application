import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    FiltrationWidget: {
        background: "#fff",
        minHeight: "100vh",
        borderLeft: "2px solid rgba(133, 133, 133, 0.1)",
    },
    SearchSection: {
        padding: "25px",
        borderBottom: "1px solid #EDF1F8",
    },
    SearchInput:{
        height: '58px',
        padding: '19px 19px 19px 47px',
        position: 'relative',
        background: "#EDF1F5",
        borderRadius: "10px",
        '& input': {

            color: "#818B95",
            fontSize: "16px",
            background: "#EDF1F5",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none"
        }
    },
    SearchIcon: {
        position: 'absolute',
        top: '19px',
        left: '19px',
    },
    SectionShow: {
        display: "flex",
        padding: "25px",
        alignItems: "center",
        borderBottom: "1px solid #EDF1F8",
    },
    SectionShow__Title: {
        fontSize: "25px",
        lineHeight: "32px",
        color: "#36414B",
        marginRight: "auto",
    },
    SectionShow__Actions: {
        display: "flex",
        alignItems: "center",
        "&>div:first-child": {
            marginRight: "8px  ",
        },
    },
    SectionSort: {
        padding: "25px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #EDF1F8",
    },
    SortBlocks: {
        display: "flex",
        alignItems: "center",
        background: "#EDF1F5",
        borderRadius: "10px",
        padding: "4px",
        color: "#818B95",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
    },
    SortBlock: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "7px",
        userSelect: "none",
        "&>span": {
            marginRight: "3px",
        },
    },
    SortBlock__IsActive: {
        background: "#fff",
        color: "#2E6AFA",
    },
    SectionSort__Title: {
        fontSize: "15px",
        lineHeight: "19px",
        color: "#818B95",
        marginRight: "auto",
    },
    SectionFilters: {
        padding: "25px",
    },
    SectionFilters__Title: {
        fontSize: "15px",
        lineHeight: "19px",
        color: "#818B95",
        marginBottom: "24px",
    },
    SectionShow__Body: {},
    FiltersBlock: {
        marginBottom: "46px",
    },
    FiltersBlock__Title: {
        fontWeight: 500,
        fontSize: "13px",
        lineHeight: "17px",
        textTransform: "uppercase",
        color: "#36414B",
        marginBottom: "21px",
    },
    FiltersBlock__Entries: {},
    CheckInput: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px",
        cursor: 'pointer'
    },
    CheckInput__Indicator: {
        marginRight: "9px",
        background: "#D1DCE7",
        opacity: 0.3,
        border: "3px solid #8298AD",
        width: "15px",
        height: "15px",
        borderRadius: "50%",
    },
    CheckInput__Title: {
        fontSize: "15px",
        lineHeight: "19px",
        color: "#818B95",
    },
    CheckInput__IsActive: {
        '& $CheckInput__Indicator': {
            opacity: 1,
            background: "#fff",
            border: "3px solid #2E6AFA",
        },
    },

}));
