import React, {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import {useStyles} from "./styles";

import GovernanceCard from "../../components/GovernanceCard";
import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";
import Button from "../../components/Button";
import FiltrationWidget from "../../components/FiltrationWidget";
import {
    GridIcon,
    ListIcon
} from '../../shared/icons';
const walletHelperInsatnce = walletHelper();

const getNumberFromBigNumber = (bigNumber) => {
    return fromWei(bigNumber, "ether", 2);
};

const getBigNumberFromNumber = (number) => {
    return toWei(number, "ether");
};

function GovernanceList() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);

    const classes = useStyles();

    useEffect(() => {

    }, [accountContext.account]);

    const cats = [
        {
            name: 'All',
            count: '2',
        },
        {
            name: 'Business',
            count: '3',
        },
        {
            name: 'Coronavirus',
            count: '99',
        },
        {
            name: 'Crypto',
            count: '105',
        },
        {
            name: 'NFTs',
            count: '78',
        },
        {
            name: 'Pop Culture',
            count: '2',
        },
        {
            name: 'Science',
            count: '1',
        },
        {
            name: 'Sports',
            count: '65',
        },
        {
            name: 'Tech',
            count: '75',
        },
        {
            name: 'US Current Affairs',
            count: '82',
        },
    ];

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    /*    if(isLoading) {
            return (
                <div className={classes.LoadingWrapper}>
                    <CircularProgress/>
                </div>
            )
        }*/

    return (
        <>
            <div className={classes.GovernanceListPage}>
                <div className={classes.GovernanceListPage__Main}>
                    <div className={classes.GovernanceListPage__Header}>
                        <div className={classes.GovernanceListPage__HeaderTitle}>Governance</div>
                        <div className={classes.GovernanceListPage__HeaderActions}>
                            <GridIcon/>
                            <ListIcon/>
                            <Link to={`/markets/create`}>
                                <Button
                                    color="primary"
                                    size={'medium'}>+ Create New</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.GovernanceListPage__MainList}>
                        <div><GovernanceCard/></div>
                        <div><GovernanceCard/></div>
                        <div><GovernanceCard/></div>
                        <div><GovernanceCard/></div>
                        <div><GovernanceCard/></div>
                        <div><GovernanceCard/></div>
                        <div><GovernanceCard/></div>
                    </div>
                </div>
                <div className={classes.GovernanceListPage__Sidebar}>
                    <FiltrationWidget/>
                </div>
            </div>
        </>
    );
}

export default GovernanceList;
