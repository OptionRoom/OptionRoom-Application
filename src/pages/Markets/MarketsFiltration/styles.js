import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    MarketsFiltration: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
        },
        //borderRadius: '16px',
        //backgroundColor: '#FFFFFF',
        //boxShadow: '0 0 20px 0 #E6EDFF',
        '>div': {
            '&:first-child': {
                borderRadius: '10px 0 0 10px'
            },
            '&:last-child': {
                borderRadius: '0 10px 10px 0'
            }
        },
        '& .MarketsFiltration__CategoryField__control, & .MarketsFiltration__StateField__control': {
            width: '150px',
            background: theme.isDark ? "rgb(39, 38, 44)" : "#fff",
            border: `1px solid ${theme.isDark ? "rgb(39, 38, 44)" : '#EDEFF4'}`,
            borderRadius: "8px",
            '& .CreateMarket__CategoryField__indicator-separator': {
                display: 'none'
            }
        },
        '& .MarketsFiltration__CategoryField__control': {
            //borderRadius: '15px',
            marginRight: '5px'
        },
        '& .MarketsFiltration__StateField__control': {
            //borderRadius: '15px'
        },
        '& .MarketsFiltration__CategoryField__indicator-separator, & .MarketsFiltration__StateField__indicator-separator': {
            display: 'none'
        },
        '& .MarketsFiltration__CategoryField__single-value, & .MarketsFiltration__StateField__single-value': {
            color: theme.isDark ? "#fff" :  "#000",
        },
        '& .MarketsFiltration__CategoryField__menu, & .MarketsFiltration__StateField__menu': {
            background: theme.colors.inputBg,
            color: theme.isDark ? "#fff" :  "#000",
        },
        '& .MarketsFiltration__CategoryField__option--is-focused, & .MarketsFiltration__StateField__option--is-focused': {
            color: theme.isDark ? "#000" :  "#000",
        }
    },
    MarketNameInputWrap: {
      position: 'relative'
    },
    SearchIcon: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '5px'
    },
    MarketNameInput: {
        background: theme.isDark ? "rgb(39, 38, 44)" : '#fff',
        color: theme.isDark ? "#fff" : '#000',
        border: `1px solid ${theme.isDark ? "rgb(39, 38, 44)" : '#EDEFF4'}`,
        outline: 'none',
        fontSize: '14px',
        padding: '5px 10px 5px 33px',
        height: '38px',
        borderRadius: '15px',
        width: '100%',
        boxShadow: theme.colors.boxBoxShadow
    },
    FilterActions: {
        marginRight: '10px'
    },
    SearchActions: {
        display: 'flex'
    },
    SearchLabel: {
        fontWeight: 500,
        fontSize: '12px',
        marginBottom: '5px'
    },
    SearchWrap: {
        width: '200px',
    },
    TradedOnlyWrap: {
        marginRight: 'auto',
        width: '200px',
    },
    TradedOnlyWrap_Input: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        fontSize: '12px',
    },
    SortBlocks: {
        background: theme.isDark ? "rgb(39, 38, 44)" : '#fff',
        color: theme.isDark ? "#fff" : '#000',
        border: `1px solid ${theme.isDark ? "rgb(39, 38, 44)" : '#EDEFF4'}`,
        height: '38px',
        display: 'flex',
        borderRadius: '15px',
        overflow: 'hidden'
    },
    SortBlock: {
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        cursor: 'pointer',
    },
    SortBlock__IsActive: {
      background: theme.colors.primary,
      color: '#fff',
        borderRadius: '15px',
    },
    SortBlock__Icon: {
        marginLeft: '5px',
        fontSize: '16px'
    },
    ViewActions: {
        marginLeft: '5px',
        '&>div': {
            cursor: 'pointer'
        }
    },
    View__IsActive: {
        color: theme.colors.primary
    }
}));
