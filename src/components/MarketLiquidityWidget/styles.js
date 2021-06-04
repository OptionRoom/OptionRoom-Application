import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    MarketLiquidityWidget: {
        background: "#FFFFFF",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        padding: "29px 35px",
    },
    MarketLiquidityWidget__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '27px',
    },
    MarketLiquidityWidget__Info: {
        fontSize: "13px",
        color: theme.isDark ? "#fff" : "#3F4A57",
        marginBottom: '16px',
    },
    MarketLiquidityWidget__Actions: {
        display: 'flex',
        alignItems: 'center',
        '& >div': {
            marginRight: '10px',
            textAlign: 'center'
        }
    },
    MarketLiquidityWidget__ActionsApprove: {
        color: `${theme.palette.primary.main}`,
        textDecoration: 'underline',
        cursor: 'pointer'
    },
/*    RemoveLiquidity__One: {
        borderRadius: '15px'
    },
    RemoveLiquidity__Two: {
        width: '80%',
        borderRadius: '15px 0 0 15px'
    },
    AddLiquidity__Two: {
        width: '20%',
        borderRadius: '0 15px 15px 0'
    }*/
}));
