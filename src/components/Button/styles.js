import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '10px',
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
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
    },
    Size__Xs: {
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: 0,
        height: '20px'
    },
    Progress_StateWrap: {
        display: 'flex',
        alignItems: 'center'
    },
    pushable: {
        cursor: "pointer",
        marginLeft: "5px",
        marginBottom: "15px",
        textShadow: "0 -2px 0 #4a8a65, 0 1px 1px #c2dece",
        boxSizing: "border-box",
        fontSize: "2em",
        textDecoration: "none",
        fontWeight: "bold",
        color: "#5ea97d",
        height: "65px",
        lineHeight: "65px",
        padding: "0 32.5px",
        display: "inline-block",
        width: "auto",
        background: "linear-gradient(to bottom, #9ceabd 0%, #9ddab6 26%, #7fbb98 100%)",
        borderRadius: "5px",
        borderTop: "1px solid #c8e2d3",
        borderBottom: "1px solid #c2dece",
        top: "0",
        transition: "all 0.06s ease-out",
        position: "relative",
        "&:visited": {
            color: "#5ea97d"
        },
        "&:hover": {
            background:
                "linear-gradient(to bottom, #baf1d1 0%, #b7e4ca 26%, #96c7ab 100%)"
        },
        "&:active": {
            top: "6px",
            textShadow: "0 -2px 0 #7fbb98, 0 1px 1px #c2dece, 0 0 4px white",
            color: "white"
        },
        "&:active:before": {
            top: "0",
            boxShadow: "0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2)"
        },
        "&:before": {
            display: "inline-block",
            content: '""',
            position: "absolute",
            left: "0",
            right: "0",
            zIndex: -1,
            top: "6px",
            borderRadius: "5px",
            height: "65px",
            background: "linear-gradient(to top, #1e5033 0%, #378357 6px)",
            transition: "all 0.078s ease-out",
            boxShadow:
                "0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5), 0 10.8px 9px rgba(0, 0, 0, 0.2)"
        }
    }
}));
