import React, {useContext} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

import {
    NavLink,
} from "react-router-dom";

import {
    LiquiditySidebarIcon,
    MarketsIcon,
    CourtStakeIcon,
    NftIcon,
    NftStakeIcon,
    ClaimIcon,
    LightModeIcon,
    DarkModeIcon,
    GovernanceIcon
} from '../../shared/icons';

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    MainSidebar: {
        position: 'fixed',
        width: drawerWidth,
        top: 0,
        left: 0,
        height: '100vh',
        borderRight: '2px solid rgba(133, 133, 133, 0.1)',
        backgroundColor: theme.isDark ? "#242D38" : 'rgb(255, 255, 255)',
        paddingTop: '80px',
        transition: '0.2s all',
        zIndex: '99',
        overflow: 'hidden',
    },
    IsSidebarNotExpand: {
        [theme.breakpoints.up('md')]: {
            width: 50,
        },
        width: 0,
        '& $SocialLinks': {
            display: 'none'
        },
        '& $NavLink__Title': {
            display: 'none'
        },
        '& $NavLink': {
            padding: "10px 8px",
            borderRadius: '0 !important',
            '& svg': {
                width: '32px'
            }
        },
        '& $SideBottom': {
            padding: "40px 0 28px 0",
            justifyContent: 'center'
        }
    },
    MainSidebar__IsMin:{
        paddingTop: '15px'
    },
    NavLink__Title: {
        marginLeft: "10px",
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
    NavLinks: {
        //padding: "0 16px 16px",
    },
    NavLink: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#8293A6",
        fontSize: "14px",
        padding: "10px 30px",
        transition: "0.2s all",
        position: 'relative',
        "&:hover, &.Active": {
            //borderRadius: "8px",
            //background: "#004BFF",
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
        },
        "&::after, &::before": {
            content: "''",
            position: "absolute",
            right: "0",
            width: "3px",
            height: 0
        },
        "&::before": {
            transition: "height .4s cubic-bezier(0.51, 0.18, 0, 0.88) .1s",
            background: "#F44336"
        },
        "&::after": {
            transition: "height .2s cubic-bezier(0.29, 0.18, 0.26, 0.83)",
            background: "#004BFF"
        }
    },
    SideBottom: {
        padding: "40px 24px 28px 24px",
        position: "absolute",
        bottom: 0,
        left: "0",
        width: "100%",
        display: 'flex',
        alignItems: 'center'
    },
    SocialLinks: {
        marginRight: 'auto',
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
    LightDarkSwitch: {
        display: 'flex',
        alignItems: 'center',
        color: '#8293A6',
        '& span': {
            margin: '0 5px',
            fontSize: '20px'
        },
        '& svg': {
            fill: '#8293A6',
            cursor: 'pointer'
        },
    },
    LightDarkSwitch__IsActive: {
        '& svg': {
            fill: `${theme.colors.primary}`,
        }
    },
    SidebarBottomToggle: {
        cursor: 'pointer',
        fill: '#8293A6',
    }
}));

function MainSidebar(props) {
    const classes = useStyles();
    const optionroomThemeContext = useContext(OptionroomThemeContext);

    return (
        <div className={clsx(classes.MainSidebar, {
                 [classes.MainSidebar__IsMin]: props.isMinHeader,
                 [classes.IsSidebarNotExpand]: !props.isSidebarExpand,
             })}>
            <div className={classes.NavLinks}>
                {[
/*                     {
                        title: 'Markets',
                        link: '/markets',
                        icon: MarketsIcon,
                        isNew: true
                    }, */
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
                        icon: LiquiditySidebarIcon,
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
                    {
                        title: "Claim",
                        link: "/claim",
                        icon: ClaimIcon,
                    },
                    /*
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
                                item.isNew && (
                                    <span className={classes.NewBadge}>new</span>
                                )
                            }
                        </span>
                    </NavLink>
                ))}
{/*                 <div style={{textAlign: 'center'}}><small>1.1</small></div>
 */}            </div>
            <div className={classes.SideBottom}>
                { !props.isSidebarExpand && (
                    <SettingsIcon className={classes.SidebarBottomToggle}
                                  onClick={props.onToggleSidebar}/>
                )}
                { props.isSidebarExpand && (
                    <>
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
                        <div className={classes.LightDarkSwitch}>
                            <div className={clsx({
                                [classes.LightDarkSwitch__IsActive]: props.activeTheme === "light",
                            })}
                                 onClick={()=> {
                                     props.onChangeTheme('light')
                                 }}>
                                <LightModeIcon />
                            </div>
                            <span>/</span>
                            <div className={clsx({
                                [classes.LightDarkSwitch__IsActive]: props.activeTheme === "dark",
                            })}
                                 onClick={()=> {
                                     props.onChangeTheme('dark')
                                 }}>
                                <DarkModeIcon />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MainSidebar;
