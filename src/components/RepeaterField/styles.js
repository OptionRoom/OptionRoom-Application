import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    CreateMarket__Sources: {
        border: "1px solid #D2D9E1",
        borderRadius: "8px",
        backgroundColor: theme.isDark ? "#141A22" : "#EDF1F5",
        padding: '16px',
        marginTop: '8px',
        width: '100%',
    },
    RemoveSourceIcon: {
        cursor: 'pointer',
        color: 'black'
    },
    FieldItem: {
        marginBottom: '8px'
    },
    FieldItem__Error: {
        marginTop: '8px',
        color: 'red'
    },
    FieldItem__InputAction: {
        display: 'flex',
        alignItems: 'center',
        '& input': {
            marginRight: '15px',
            width: 'calc(100% - 70px)'
        },
        '& button': {
            width: '56px'
        }
    }
}));
