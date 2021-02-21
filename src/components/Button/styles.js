import {makeStyles, useTheme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '12px',
        textTransform: 'none'
    },
    Primary: {
        backgroundColor: '#0058FF',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#0058FF',
            color: '#FFF'
        }
    },
    Black: {
        backgroundColor: '#000',
        color: '#FFFFFF !important',
        '&:hover': {
            backgroundColor: '#000',
            color: '#FFFFFF !important',
        }
    },
    Gray: {
        backgroundColor: '#EDEFF4',
        color: '#5F7184 !important',
        '&:hover': {
            backgroundColor: '#EDEFF4',
            color: '#5F7184 !important',
        }
    },
    White: {
        backgroundColor: '#fff',
        color: '#000 !important',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#000 !important',
        }
    },
    Disabled__Primary: {
        backgroundColor: '#D2D9E1 !important',
        color: '#FFF !important',
        '&:hover': {
            backgroundColor: '#D2D9E1 !important',
            color: '#FFF !important'
        }
    },
    Disabled__Black: {
        backgroundColor: '#D2D9E1 !important',
        color: '#FFF !important',
        '&:hover': {
            backgroundColor: '#D2D9E1 !important',
            color: '#FFF !important'
        }
    },
    Disabled__Gray: {
        backgroundColor: '#D2D9E1 !important',
        color: '#FFF !important',
        '&:hover': {
            backgroundColor: '#D2D9E1 !important',
            color: '#FFF !important'
        }
    },
    Disabled__White: {
        backgroundColor: '#D2D9E1 !important',
        color: '#FFF !important',
        '&:hover': {
            backgroundColor: '#D2D9E1 !important',
            color: '#FFF !important'
        }
    },
    Processing__Primary: {
        backgroundColor: '#C7CBFF !important',
        color: '#004BFF !important',
        '&:hover': {
            backgroundColor: '#C7CBFF !important',
            color: '#004BFF !important'
        },
        '& .MuiCircularProgress-root': {
            color: '#004BFF',
            marginRight: '15px',
            width: '20px !important',
            height: '20px !important',
            '& .MuiCircularProgress-svg': {
                width: '20px !important',
                height: '20px !important',
            }
        }
    },
    Processing__Black: {
        backgroundColor: '#C7CBFF !important',
        color: '#004BFF !important',
        '&:hover': {
            backgroundColor: '#C7CBFF !important',
            color: '#004BFF !important'
        },
        '& .MuiCircularProgress-root': {
            color: '#004BFF',
            marginRight: '15px',
            width: '20px !important',
            height: '20px !important',
            '& .MuiCircularProgress-svg': {
                width: '20px !important',
                height: '20px !important',
            }
        }
    },
    Processing__Gray: {
        backgroundColor: '#C7CBFF !important',
        color: '#004BFF !important',
        '&:hover': {
            backgroundColor: '#C7CBFF !important',
            color: '#004BFF !important'
        },
        '& .MuiCircularProgress-root': {
            color: '#004BFF',
            marginRight: '15px',
            width: '20px !important',
            height: '20px !important',
            '& .MuiCircularProgress-svg': {
                width: '20px !important',
                height: '20px !important',
            }
        }
    },
    Processing__White: {
        backgroundColor: '#C7CBFF !important',
        color: '#004BFF !important',
        '&:hover': {
            backgroundColor: '#C7CBFF !important',
            color: '#004BFF !important'
        },
        '& .MuiCircularProgress-root': {
            color: '#004BFF',
            marginRight: '15px',
            width: '20px !important',
            height: '20px !important',
            '& .MuiCircularProgress-svg': {
                width: '20px !important',
                height: '20px !important',
            }
        }
    },
    FullWidth: {
        width: '100%'
    },
    Size__Medium: {
        height: '48px',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
    },
    Size__Large: {
        height: '56px',
        fontSize: '20px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
    },
    Size__Small: {
        height: '40px',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
    },
    Progress_StateWrap: {
        display: 'flex',
        alignItems: 'center'
    }
}));
