import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
    NavLink,
} from "react-router-dom";

const LiquidityIcon = () => {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24" >
            <g id="Group-6" transform="translate(2.000000, 5.000000)">
                <path d="M10.0006,5.0007 C8.8966,5.0007 8.0006,5.8967 8.0006,7.0007 C8.0006,8.1047 8.8966,9.0007 10.0006,9.0007 C11.1046,9.0007 12.0006,8.1047 12.0006,7.0007 C12.0006,5.8967 11.1046,5.0007 10.0006,5.0007" id="Fill-2"></path>
                <path d="M17.9996,10.5759 C17.1526,10.4279 16.1516,10.3159 15.0616,10.3159 C13.1696,10.3159 11.3776,10.6459 9.7366,11.2999 C8.5686,11.7639 7.1916,11.9999 5.6446,11.9999 C4.2226,11.9999 2.9206,11.7989 1.9996,11.6059 L1.9996,3.3619 C3.0276,3.5389 4.2866,3.6839 5.6446,3.6839 C7.7006,3.6839 9.5746,3.3529 11.2156,2.6999 C12.3836,2.2359 13.6776,1.9999 15.0616,1.9999 C16.2226,1.9999 17.2516,2.1669 17.9996,2.3389 L17.9996,10.5759 Z M15.0616,-0.0001 C13.6506,-0.0001 12.0626,0.2109 10.4766,0.8429 C8.8886,1.4729 7.1956,1.6839 5.6446,1.6839 C2.5396,1.6839 -0.0004,0.8429 -0.0004,0.8429 L-0.0004,13.1579 C-0.0004,13.1579 2.5396,13.9999 5.6446,13.9999 C7.1956,13.9999 8.8896,13.7899 10.4766,13.1579 C12.0636,12.5259 13.6506,12.3159 15.0616,12.3159 C17.8836,12.3159 19.9996,13.1579 19.9996,13.1579 L19.9996,0.8429 C19.9996,0.8429 17.8836,-0.0001 15.0616,-0.0001 L15.0616,-0.0001 Z" id="Fill-4"></path>
            </g>
        </svg>
    );
};

const NftIcon = () => {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24">
            <g id="Group-4" transform="translate(2.000000, 3.000000)" >
                <path d="M10.0001,4.9964 L6.5001,6.9964 L6.5001,10.9959 L10.0001,12.9959 L13.5001,10.9959 L13.5001,6.9964 L10.0001,4.9964 Z M10.0001,7.2999 L11.5001,8.1569 L11.5001,9.8354 L10.0001,10.6924 L8.5001,9.8354 L8.5001,8.1569 L10.0001,7.2999 Z" id="Fill-2"></path>
                <path d="M15.0001,0.4964 L5.0001,0.4964 L0.000100000001,8.9964 L5.0001,17.4964 L15.0001,17.4964 L20.0001,8.9964 L15.0001,0.4964 Z M13.8566,2.4964 L17.6796,8.9964 L13.8561,15.4964 L6.1441,15.4964 L2.3206,8.9964 L6.1441,2.4964 L13.8566,2.4964 Z" id="Fill-3"></path>
            </g>
        </svg>
    );
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerPaper: {
        background: '#EDEFF4',
        borderRight: 'none'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    NavLinks: {
        padding: '16px'
    },
    NavLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#8293A6',
        fontSize: '14px',
        marginBottom: '8px',
        padding: '8px',
        transition: '0.2s all',
        '&:hover, &.Active': {
            borderRadius: '8px',
            background: '#004BFF',
            color: '#fff',
            '& svg': {
                color: '#fff',
                fill: '#fff',
            }
        },
        '& svg': {
            marginRight: '16px',
            color: '#8293A6',
            fill: '#8293A6',
        }
    },
    NavLink__Icon: {
    },
    NavLink__Title: {
        opacity: 0,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    NavLink__Title__Open: {
        opacity: 1,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}));

function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </div>
            <div className={classes.NavLinks}>
                {
                    [
                        /*{
                            title: 'Markets',
                            link: '/markets',
                            icon: MarketsIcon
                        },
                        {
                            title: 'Governance',
                            link: '/governance',
                            icon: GovernanceIcon
                        },*/
                        {
                            title: 'Liquidity Pool',
                            link: '/liquidity-mining',
                            icon: LiquidityIcon
                        },
                        {
                            title: 'NFT',
                            link: '/nft',
                            icon: NftIcon
                        },
                        /*{
                            title: 'Claim',
                            link: '/claim',
                            icon: ClaimIcon
                        },
                        {
                            title: 'Oracle',
                            link: '/oracle',
                            icon: OracleIcon
                        },
                        {
                            title: 'Docs',
                            link: '/docs',
                            icon: DocsIcon
                        },*/
                    ].map((item, index) => (
                        <NavLink to={item.link}
                                 activeClassName={'Active'}
                                 key={`menut-item${index}`}
                                 className={classes.NavLink}>
                            {item.icon()}
                            <span className={
                                clsx(classes.NavLink__Title, {
                                    [classes.NavLink__Title__Open]: open,
                                })
                            }>
                               {item.title}
                            </span>
                        </NavLink>
                    ))}
            </div>
        </Drawer>
    );
}

export default Sidebar;
