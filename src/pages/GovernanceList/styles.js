import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    GovernanceListPage: {
        display: 'flex',
        background: '#f6faff'
    },
    GovernanceListPage__Main: {
        width: 'calc(100% - 335px)',
        padding: '40px'
    },
    GovernanceListPage__Sidebar: {
        width: '335px'
    },
    GovernanceListPage__Header: {
        display: 'flex',
        marginBottom: '25px',
        alignItems: 'center',
    },
    GovernanceListPage__HeaderTitle: {
        marginRight: 'auto',
        fontSize: "30px",
        lineHeight: "38px",
        color: "#36414B"
    },
    GovernanceListPage__HeaderActions: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            color: '#818b95',
            marginRight: '18px'
        },
        '&>div': {
        },
        '& a': {
            textDecoration: 'none'
        }
    },
    GovernanceListPage__MainList: {
        display: 'flex',
        flexWrap: 'wrap',
        '&>div': {
            width: 'calc(50% - 10px)',
            marginRight: '20px',
            marginBottom: '20px',
            '&:nth-child(2n)': {
                marginRight: 0
            }
        }
    }
}));
