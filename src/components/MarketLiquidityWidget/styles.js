import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    MarketLiquidityWidget: {
        borderRadius: "16px",
        backgroundColor: `${theme.colors.boxBg}`,
        boxShadow: theme.colors.boxBoxShadow,
        padding: "24px",
    },
    MarketLiquidityWidget__Header: {
        color: theme.isDark ? "#fff" : "#3F4A57",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '16px',
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
