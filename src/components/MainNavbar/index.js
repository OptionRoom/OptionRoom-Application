import React from 'react';
import clsx from 'clsx';
import {useContext} from 'react';

import {useStyles} from './styles'
import ConnectButton from '../ConnectButton';
import {AccountContext} from '../../shared/AccountContextProvider';
import {
    ellipseAddress,
    getAddressImgUrl
} from '../../shared/helper';

import {
    ClaimIcon,
    CourtStakeIcon,
    GovernanceIcon,
    LiquiditySidebarIcon,
    MarketsIcon,
    NftStakeIcon
} from "../../shared/icons";

import {NavLink} from "react-router-dom";

function MainNavbar(props) {

    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    const renderLink = (item, index) => {
        return (
            <NavLink
                to={item.link}
                activeClassName={"Active"}
                key={`menut-item${index}`}
                className={classes.NavLink}
            >
                {item.icon()}
                <span className={classes.NavLink__Title}>{item.title}</span>
            </NavLink>
        )
    };

    const menuLinks = [
        {
            title: 'Markets',
            link: '/markets',
            icon: MarketsIcon,
            isNew: true
        },
        {
            title: 'COURT-ROOM',
            link: '/court-room-swap',
            icon: MarketsIcon,
            isNew: true
        },
        {
            title: "Governance",
            link: "/governance",
            icon: GovernanceIcon,
        },
        {
            subMenu: [
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
                    title: "NFT Staking",
                    link: "/nft-stake",
                    icon: NftStakeIcon,
                },
                {
                    title: "Claim",
                    link: "/claim",
                    icon: ClaimIcon,
                },
                {
                    title: 'Markets (Archived)',
                    link: '/markets-v1',
                    icon: MarketsIcon,
                }
            ]
        }
    ];

    return (
        <div className={clsx(classes.MainNavbar, {
            [classes.MainNavbar__IsMin]: props.isMinHeader,
        })}>
            <div className={classes.Logo}>
                <div className={classes.LogoHolder}/>
                <span className={classes.Beta}>beta</span>
            </div>
            <div className={classes.Menu}>
                {
                    menuLinks.map((item, index) => {
                        if(!item.subMenu) {
                            return renderLink(item, index);
                        }

                        return (
                            <div className={classes.SubMenuWrap}
                                 key={`menu-${index}`}>
                                <div className={classes.SubMenuTitle}>More</div>
                                <div className={classes.SubMenu}>
                                    {
                                        item.subMenu.map((item, index) => {
                                            return renderLink(item, index);
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={classes.Actions}>
                {
                    accountContext.account && (
                        <div className={classes.AccountHolderMin}>
                            <img src={getAddressImgUrl(accountContext.account)}
                                 width="36px"
                                 height={'36px'}/>
                            <div>
                                {ellipseAddress(accountContext.account)}
                            </div>
                        </div>
                    )
                }
                {
                    !accountContext.account && (
                        <ConnectButton/>
                    )
                }
            </div>
        </div>
    );
}

export default MainNavbar;
