import {makeStyles} from '@material-ui/core/styles';

import LogoSvg from "../../assets/optionroom_logo.svg";
import LogoDarkSvg from "../../assets/optionroom_logo_dark.svg";
import LogoMinSvg from "../../assets/room_new_icon.svg";

export const useStyles = makeStyles((theme) => ({
    MainNavbar__MenuBtn: {
        marginRight: '15px',
        cursor: 'pointer',
        fill: `${theme.palette.primary.main}`,
        userSelect: 'none',
    },
    MainNavbar: {
        zIndex: '999',
        height: '64px',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.isDark ? "#242D38" : 'rgb(255, 255, 255)',
        borderBottom: '2px solid rgba(133, 133, 133, 0.1)',
        position: 'fixed',
        width: '100%',
        top: 0,
        transition: '0.2s all',
    },
    MainNavbar__IsMin: {
        top: '-64px'
    },
    Logo:{
        marginRight: 'auto',
        userSelect: 'none',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            marginRight: '20px',
        },
    },
    Beta: {
        position: 'absolute',
        color: theme.colors.primary,
        fontWeight: 700,
        lineHeight: 1,
        bottom: 0,
        left: '100%',
        [theme.breakpoints.up('md')]: {
            right: 0,
            top: 0,
            left: 'auto'
        },
    },
    LogoHolder: {
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '35px',
        height: '37.59px',
        backgroundImage: `url(${LogoMinSvg})`,
        [theme.breakpoints.up('md')]: {
            width: '150px',
            height: '37.59px',
            backgroundImage: `url(${theme.isDark ? LogoDarkSvg : LogoSvg})`
        },
    },
    Title__Head: {
        fontSize: '28px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '32px',
        marginBottom: '8px'
    },
    Title__Head___Black: {
        color: '#fff'
    },
    Title__Details: {
        color: theme.colors.secondaryTxt,
        fontSize: '18px',
        letterSpacing: 0,
        lineHeight: '24px',
    },
    Actions: {
        display: 'flex',
        alignItems: 'center',
    },
    AccountHolder: {
        display: 'flex',
    },
    AccountHolder__Image: {
        marginRight: '5px',
    },
    AccountHolder__Image_Image: {
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'block'
    },
    AccountHolder__Details: {
        fontSize: '14px'
    },
    AccountHolder__Details__Disconnect: {
        fontSize: '12px',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    AccountHolderMin: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            marginRight: '10px'
        },
        '& div': {
            height: '32px',
            padding: '0 20px',
            borderRadius: '15px',
            //backgroundColor: '#000000',
            color: '#FFFFFF',
            fontSize: '16px',
            backgroundColor: theme.colors.primary,
            //backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
            fontWeight: 600,
            letterSpacing: 0,
            lineHeight: '32px',
            border: 'none',
            outline: 'none',
        }
    },
    Menu: {
        order: 3,
        position: 'absolute',
        top: '100%',
        background: '#fff',
        width: '100%',
        left: '0',
        borderTop: '1px solid #f2f2f2',
        maxHeight: '100vh',
        [theme.breakpoints.up('md')]: {
            marginRight: 'auto',
            display: 'flex',
            alignItems: 'center',
            position: 'static',
            order: 0,
            borderTop: 'none',
            top: 'auto',
            left: 'auto',
            width: 'auto'
        },
    },
    NavLink: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#8293A6",
        fontSize: "14px",
        padding: "10px 20px",
        transition: "0.2s all",
        position: 'relative',
        "&:hover, &.Active": {
            color: "#004BFF",
            "& svg": {
                fill: "#004BFF",
            },
            "&::after,&::before": {
                height: "100%",
                top: "0"
            }
        },
        "& svg": {
            color: "#8293A6",
            fill: "#8293A6",
            marginRight: '10px'
        },
        [theme.breakpoints.up('md')]: {
            padding: "20px 30px",
        },
    },
    SubMenuTitle: {
        [theme.breakpoints.up('md')]: {
            display: 'block'
        },
        display: 'none',
        color: "#8293A6",
        fontSize: "14px",
        padding: "20px 30px",
        transition: "0.2s all",
        cursor: 'pointer',
        "&:hover, &.Active": {
            color: "#004BFF",
        },
    },
    SubMenuWrap: {
        [theme.breakpoints.up('md')]: {
            position: 'relative',
            "&:hover": {
                '& $SubMenu': {
                    display: 'block !important'
                }
            }
        },
    },
    SubMenu: {
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: '100%',
            width: '300px',
            background: '#fff',
            borderRadius: '15px',
            boxShadow: '0 0 20px 0 #e6edff',
            padding: '10px 0',
            display: 'none',
            '& $NavLink': {
                padding: "10px 15px",
                borderBottom: '1px solid #f2f2f2',
                '&:last-child': {
                    borderBottom: 'none'
                }
            },
        },
    }
}));
