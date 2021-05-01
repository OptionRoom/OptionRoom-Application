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
            borderTop: 'none',
            borderBottom: 'none',
            borderRadius: 0,
            outline: 'none',
            border: '1px solid #EDEFF4',
            boxShadow: '0 0 20px 0 #e6edff',
        },
        '& .MarketsFiltration__CategoryField__control': {
            borderRadius: '10px 0 0 10px'
        },
        '& .MarketsFiltration__StateField__control': {
            borderRadius: '0 10px 10px 0'
        },
        '& .MarketsFiltration__CategoryField__indicator-separator, & .MarketsFiltration__StateField__indicator-separator': {
            display: 'none'
        }
    },
    MarketNameInput: {
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        padding: '5px 10px',
        height: '38px',
        borderRadius: '10px',
        width: '100%',
        boxShadow: '0 0 20px 0 #e6edff'
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
        marginRight: 'auto',
        width: '200px',
    },
    SortBlock: {
        background: '#fff',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        cursor: 'pointer',
        height: '38px',
        border: '1px solid #EDEFF4',
        boxShadow: '0 0 20px 0 #e6edff',
        '&:first-child': {
            borderRadius: '10px 0 0 10px'
        },
        '&:last-child': {
            borderRadius: '0 10px 10px 0'
        }
    },
    SortBlock__Icon: {
        marginLeft: '5px',
        fontSize: '16px'
    }
}));
