import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    MarketsFiltration: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 20px 0 #E6EDFF',
        '& .MarketsFiltration__CategoryField__control, & .MarketsFiltration__StateField__control': {
            width: '150px',
            borderTop: 'none',
            borderBottom: 'none',
            borderRadius: 0,
            outline: 'none',
            boxShadow: 'none',
            borderColor: '#EDEFF4'
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
        marginRight: 'auto',
        height: '38px',
        borderRadius: '16px',
        width: '40%',
    },
    SortBlock: {
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        cursor: 'pointer',
        height: '38px',
        borderRight: '1px solid #EDEFF4',
        '&:last-child': {
            borderRight: 'none'
        }
    },
    SortBlock__Icon: {
        marginLeft: '5px',
        fontSize: '16px'
    }
}));
