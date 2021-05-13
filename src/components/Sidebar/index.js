import React, {useContext} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import {
    NavLink,
} from "react-router-dom";

import Logo from '../../assets/logo.png';
import LogoSvg from '../../assets/optionroom_logo.svg';
import LogoIcon from '../../assets/room-icon.png';
import {isMobile} from "../../shared/helper";
import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";

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

/*

*/

const NftStakeIcon = () => {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24">
            <g id="Group-3" transform="translate(2.000000, 3.000000)">
                <path d="M13.85595,15.49605 L13.49995,15.49605 L13.49995,10.99555 L13.49995,8.99605 L13.49995,6.99605 L10.99995,5.56755 L10.99995,2.49605 L13.85645,2.49605 L17.67945,8.99605 L13.85595,15.49605 Z M2.32045,8.99605 L6.14395,2.49605 L8.99995,2.49605 L8.99995,5.56755 L6.49995,6.99605 L6.49995,8.99605 L6.49995,10.99555 L6.49995,15.49605 L6.14395,15.49605 L2.32045,8.99605 Z M11.49995,12.13805 L11.49995,15.49605 L8.49995,15.49605 L8.49995,12.13805 L9.99995,12.99505 L11.49995,12.13805 Z M11.49995,8.99605 L11.49995,9.83505 L9.99995,10.69205 L8.49995,9.83505 L8.49995,8.99605 L8.49995,8.15655 L9.99995,7.29955 L11.49995,8.15655 L11.49995,8.99605 Z M14.99995,0.49605 L4.99995,0.49605 L-4.99999987e-05,8.99605 L4.99995,17.49605 L14.99995,17.49605 L19.99995,8.99605 L14.99995,0.49605 Z" id="Fill-2"></path>
            </g>
        </svg>
    );
};

const CourtStakeIcon = () => {
    return (
        <svg width="22px" height="22px" viewBox="0 0 72 72">
            <g id="court" stroke="none" strokeWidth="1">
                <path d="M18.5002559,6 L1,36.4997425 L18.5002559,67 L53.4997441,67 L71,36.4997425 L53.5002559,6 L18.5002559,6 Z M21.8501163,12.0559595 L27.2357948,11.910703 L35.588434,26.5568841 L43.861729,11.9828161 L49.1086833,12.0585349 L35.7420034,36.1010597 L21.8501163,12.0559595 Z M50.323929,12.4402195 L53.1194039,17.0750348 L44.6183142,31.6341651 L61.2974858,31.6403462 L63.8334284,36.2633143 L36.456613,36.4997425 L50.323929,12.4402195 Z M10.3984468,31.7639688 L26.7720153,31.7639688 L18.535065,17.1703272 L21.2757668,12.6678911 L35.0089655,36.4997425 L7.77548155,36.4997425 L10.3984468,31.7639688 Z M36.456613,37.2667173 L63.690097,37.2667173 L61.0671318,42.0019759 L44.6935632,42.0019759 L52.9305135,56.5966477 L50.1892999,61.0990838 L36.456613,37.2667173 Z M18.535065,56.7990796 L26.8723473,42.1333249 L10.1921519,42.1292041 L7.65569742,37.5067511 L35.0325128,37.2667173 L21.3310517,61.4333798 L18.535065,56.7990796 Z M22.3712284,61.6929871 L35.7368844,37.6509774 L49.6287716,61.6960777 L44.2436049,61.8413342 L35.8904538,47.1951531 L27.6176707,61.7687059 L22.3712284,61.6929871 Z" id="Fill-1"></path>
            </g>
        </svg>
    );
};

const GovernanceIcon = () => {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24">
            <title>Governance</title>
            <g id="Governance" stroke="none" strokeWidth="1" fill-rule="evenodd">
                <g id="Group-4" transform="translate(2.000000, 2.000000)">
                    <path d="M15.9991,17.999 C14.8961,17.999 13.9991,17.102 13.9991,15.999 C13.9991,14.896 14.8961,13.999 15.9991,13.999 C17.1021,13.999 17.9991,14.896 17.9991,15.999 C17.9991,17.102 17.1021,17.999 15.9991,17.999 M5.9991,15.999 C5.9991,17.102 5.1021,17.999 3.9991,17.999 C2.8961,17.999 1.9991,17.102 1.9991,15.999 C1.9991,14.896 2.8961,13.999 3.9991,13.999 C5.1021,13.999 5.9991,14.896 5.9991,15.999 M7.9991,3.999 C7.9991,2.896 8.8961,1.999 9.9991,1.999 C11.1021,1.999 11.9991,2.896 11.9991,3.999 C11.9991,5.102 11.1021,5.999 9.9991,5.999 C8.8961,5.999 7.9991,5.102 7.9991,3.999 M16.9991,12.141 L16.9991,8.999 L10.9991,8.999 L10.9991,7.857 C12.7221,7.411 13.9991,5.86 13.9991,3.999 C13.9991,1.79 12.2081,-0.001 9.9991,-0.001 C7.7901,-0.001 5.9991,1.79 5.9991,3.999 C5.9991,5.86 7.2761,7.411 8.9991,7.857 L8.9991,8.999 L2.9991,8.999 L2.9991,12.141 C1.2761,12.587 -0.000899999999,14.138 -0.000899999999,15.999 C-0.000899999999,18.208 1.7901,19.999 3.9991,19.999 C6.2081,19.999 7.9991,18.208 7.9991,15.999 C7.9991,14.138 6.7221,12.587 4.9991,12.141 L4.9991,10.999 L14.9991,10.999 L14.9991,12.141 C13.2761,12.587 11.9991,14.138 11.9991,15.999 C11.9991,18.208 13.7901,19.999 15.9991,19.999 C18.2081,19.999 19.9991,18.208 19.9991,15.999 C19.9991,14.138 18.7221,12.587 16.9991,12.141" id="Fill-2"></path>
                </g>
            </g>
        </svg>
    );
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        "& $LogoIcon": {
            display: "none",
        },
        "& $Logo": {
            display: "block",
        },
        width: drawerWidth,
    },
    NavLink__Title: {
        marginLeft: "16px",
        display: "flex",
        opacity: 1,
        transition: theme.transitions.create("opacity", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        alignItems: 'center'
    },
    NewBadge: {
        display: 'inline-block',
        fontSize: '8px',
        padding: '2px 5px',
        marginLeft: '5px',
        background: 'red',
        borderRadius: '5px',
        color: '#fff'
    },
    drawerPaper: {
        background: "#EDEFF4",
        borderRight: "none",
    },
    drawerPaper___Black: {
        background: "#000",
        borderRight: "none",
    },
    toolbar: {
        padding: "40px 24px 28px 24px",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    NavLinks: {
        padding: "0 16px 16px",
    },
    NavLink: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#8293A6",
        fontSize: "14px",
        marginBottom: "8px",
        padding: "8px",
        transition: "0.2s all",
        "&:hover, &.Active": {
            borderRadius: "8px",
            background: "#004BFF",
            color: "#fff",
            "& svg": {
                color: "#fff",
                fill: "#fff",
            },
        },
        "& svg": {
            color: "#8293A6",
            fill: "#8293A6",
        },
    },
    SocialLinks: {
        padding: "40px 24px 28px 24px",
        position: "absolute",
        bottom: 0,
        left: "0",
        width: "100%",
        fontSize: "25px",
        "&>a": {
            color: "#8293A6",
            marginRight: "10px",
            transition: "0.2s all",
            "&:hover": {
                color: "#004BFF",
            },
        },
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
    const optionroomThemeContext = useContext(OptionroomThemeContext);

    return (
        <Drawer
            variant={isMobile() ? "temporary" : "permanent"}
            classes={{
                root: classes.drawer,
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerPaper___Black]:
                        optionroomThemeContext.theme === "black",
                }),
            }}
            anchor={"left"}
            open={isMobile() ? optionroomThemeContext.isSidebarOpen : true}
            onClose={
                isMobile()
                    ? () => {
                          optionroomThemeContext.changeSidebarIsOpen(false);
                      }
                    : () => {}
            }
        >
            <div className={classes.toolbar}>
                <img
                    src={LogoSvg}
                    className={classes.Logo}
                    alt={"OptionRoom logo"}
                    width={"150px"}
                />
            </div>
            <div className={classes.NavLinks}>
                {[
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
                        title: "Governance",
                        link: "/governance",
                        icon: GovernanceIcon,
                    },
                    {
                        title: "COURT Farming",
                        link: "/court-farming",
                        icon: CourtStakeIcon,
                    },
                    {
                        title: "Liquidity Farming",
                        link: "/liquidity-mining",
                        icon: LiquidityIcon,
                    },
                    {
                        title: "Get NFTs",
                        link: "/nft",
                        icon: NftIcon,
                    },
                    {
                        title: "NFT Staking",
                        link: "/nft-stake",
                        icon: NftStakeIcon,
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
                    <NavLink
                        to={item.link}
                        activeClassName={"Active"}
                        key={`menut-item${index}`}
                        className={clsx(classes.NavLink, {
                            [classes.NavLink___Black]:
                                optionroomThemeContext.theme === "black",
                        })}
                    >
                        {item.icon()}
                        <span className={classes.NavLink__Title}>
                            {item.title}
                            {
/*                                item.link === "/court-farming" && (
                                    <span className={classes.NewBadge}>new</span>
                                )*/
                            }
                        </span>
                    </NavLink>
                ))}
            </div>
            <div className={classes.SocialLinks}>
                <a
                    href="https://github.com/OptionRoom"
                    rel="noreferrer"
                    target="_blank"
                >
                    <i className="fa fa-github"></i>
                </a>
                <a
                    href="https://t.me/OptionRoom"
                    rel="noreferrer"
                    target="_blank"
                >
                    <i className="fa fa-telegram"></i>
                </a>
                <a
                    href="https://twitter.com/option_room"
                    rel="noreferrer"
                    target="_blank"
                >
                    <i className="fa fa-twitter"></i>
                </a>
            </div>
        </Drawer>
    );
}

export default Sidebar;
