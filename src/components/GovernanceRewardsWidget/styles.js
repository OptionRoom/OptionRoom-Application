import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    GovernanceRewardsWidget: {
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        padding: "29px 35px",
        marginTop: '15px'
    },
    GovernanceRewardsWidget__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '27px',
    },
    GovernanceRewardsWidget__Content: {
        marginBottom: '16px',
    },
    RewardsList: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 15px',
        '& li span:first-child': {
            marginRight: '5px',
            fontWeight: '700'
        }
    }
}));
