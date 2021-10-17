import { useState, useContext, useEffect } from "react";
import { get, isEmpty } from "lodash";

import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import BalanceDebugAPIs from "../../shared/contracts/BalanceDebugAPIs";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import { useStyles } from "./styles";
import {fromWei, toWei, truncateText} from "../../shared/helper";


function BalanceTest() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const classes = useStyles();
    const [walletOptionTokensBalance, setWalletOptionTokensBalance] = useState([0, 0]);

    const [formData, setFormData] = useState({});


    const accountContext = useContext(AccountContext);

    const handleFormDataChange = (fieldKey, fieldValue) => {
        const newFormData = { ...formData };
        newFormData[fieldKey] = fieldValue;
        setFormData(newFormData);
    };

    const handleGetBalance = async () => {
        const balanceDebugAPIs = new BalanceDebugAPIs();
        const balanceValue = await balanceDebugAPIs.getBalances(formData.walletAddress);
        setWalletOptionTokensBalance(balanceValue);

        console.log("balanceValue", balanceValue);
    };

    const getRewards = () => {
        const the0rewards = parseFloat(fromWei(walletOptionTokensBalance[0]))/2;
        const the1rewards = parseFloat(fromWei(walletOptionTokensBalance[1]))/2;

        return (the0rewards + the1rewards).toFixed(2);
    };

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton />
            </div>
        );
    }

    return (
        <>
            <Navbar
                title={"Get balance"}
                details={''}
            />
            <div className={classes.CreateMarketPage}>
                <div className={classes.CreateMarketPage__Main}>
                    <div className={classes.CreateMarketBox}>
                        <div className={classes.CreateMarket__Section}>
                            <div className={classes.CreateMarket__Field}>
                                <div className={classes.CreateMarket__FieldTitle}>Wallet Address</div>
                                <div className={classes.CreateMarket__FieldBody}>
                                    <input type={'text'}
                                        value={get(formData, ['walletAddress'])}
                                        onChange={(e) => {
                                            handleFormDataChange('walletAddress', e.target.value);
                                        }} />
                                </div>
                            </div>
                            <div>
                                <strong>V2/V1 rewards:</strong>&nbsp;{getRewards()}
                            </div>
                        </div>
                    </div>
                    <div className={classes.CreateBtnWrap}>
                        <Button size={'large'}
                            color={'primary'}
                            onClick={handleGetBalance}
                            fullWidth={true}>
                            Get Balance
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BalanceTest;
