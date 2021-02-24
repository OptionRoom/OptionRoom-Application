import React, {useContext} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import {
    NavLink,
} from "react-router-dom";

import Logo from '../../assets/logo.png';
import LogoIcon from '../../assets/room-icon.png';
import {isMobile} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";

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


const NftStakeIcon = () => {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24">
                <g id="Group-7" transform="translate(3.000000, 1.000000)">
                    <g id="Group-6" transform="translate(0.000000, 0.500450)">
                        <path d="M5.5002,11.49595 L12.5002,11.49595 L12.5002,18.49595 C12.5002,19.60095 11.6052,20.49595 10.5002,20.49595 L7.5002,20.49595 C6.3952,20.49595 5.5002,19.60095 5.5002,18.49595 L5.5002,11.49595 Z" id="Fill-2"></path>
                        <path d="M18.0002,0.49595 L18.0002,9.49595 L15.5002,9.49595 L12.5002,7.04095 L12.5002,9.49595 L5.5002,9.49595 L5.5002,5.99595 L0.0002,5.99595 C0.0002,2.95595 2.4602,0.49595 5.5002,0.49595 L12.5002,0.49595 L12.5002,2.95095 L15.5002,0.49595 L18.0002,0.49595 Z" id="Fill-4"></path>
                    </g>
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
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        '& $LogoIcon': {
            display: 'none'
        },
        '& $Logo': {
            display: 'block',
        },
        width: drawerWidth,
    },
    NavLink__Title: {
        marginLeft: '16px',
        display: 'block',
        opacity: 1,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaper: {
        background: '#EDEFF4',
        borderRight: 'none'
    },
    drawerPaper___Black: {
        background: '#000',
        borderRight: 'none'
    },
    toolbar: {
        padding: '40px 24px 28px 24px',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    NavLinks: {
        padding: '0 16px 16px'
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
            color: '#8293A6',
            fill: '#8293A6',
        }
    },
    /**
     root: {
        display: 'flex',
    },
     drawer: {
        width: '72px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
            width: '72px',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        '&:hover': {
            '& $LogoIcon': {
                display: 'none'
            },
            '& $Logo': {
                display: 'block',
            },
            width: drawerWidth,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
            },
            '& $NavLink__Title': {
                display: 'block',
                opacity: 1,
                transition: theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }
        },
        '& $NavLink__Title': {
            marginLeft: '16px',
            display: 'none',
            opacity: 0,
            transition: theme.transitions.create('opacity', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },

    },
     drawerPaper: {
        background: '#EDEFF4',
        borderRight: 'none'
    },
     drawerPaper___Black: {
        background: '#000',
        borderRight: 'none'
    },
     LogoIcon: {
        width: '24px',
    },
     Logo: {
        display: 'none'
    },
     toolbar: {
        padding: '40px 24px 28px 24px',
    },
     content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
     NavLinks: {
        padding: '0 16px 16px'
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
            color: '#8293A6',
            fill: '#8293A6',
        }
    },
     */
}));

function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const accountContext = useContext(AccountContext);

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            variant={isMobile() ? "temporary" : "permanent"}
            classes={{
                root: classes.drawer,
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    [classes.drawerPaper___Black]: accountContext.theme === 'black',
                }),
            }}
            anchor={'left'}
            open={isMobile() ? accountContext.isSidebarOpen : true}
            onClose={isMobile() ? () => {accountContext.changeSidebarIsOpen(false);} : () => {}}
        >
            <div className={classes.toolbar}>
                <img src={Logo}
                     className={classes.Logo}
                     width={'150px'}/>
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
                            title: 'Liquidity Farming',
                            link: '/liquidity-mining',
                            icon: LiquidityIcon
                        },
                        {
                            title: 'Get NFTs',
                            link: '/nft',
                            icon: NftIcon
                        },
                        {
                            title: 'NFT Staking',
                            link: '/nft-stake',
                            icon: NftStakeIcon
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
                                 className={
                                     clsx(classes.NavLink, {
                                         [classes.NavLink___Black]: accountContext.theme === 'black',
                                     })
                                 }>
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
