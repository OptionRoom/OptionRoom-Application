import React, {useState, useContext, useEffect} from "react";

import {
    useHistory
} from "react-router-dom";

import ChainAlert from '../../components/ChainAlert';
import ConnectButton from "../../components/ConnectButton";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

import {
    useStyles
} from "./styles";
import {
    AccountContext
} from "../../shared/AccountContextProvider";

import {
    useGetIsChainSupported,
} from "../../shared/hooks";
import {
    ChainNetworks,
} from "../../shared/constants";
import TradeInput from "../../components/TradeInput";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET, ChainNetworks.LOCAL_CHAIN, ChainNetworks.BINANCE_SMART_CHAIN];

function CourtToRoomSwap() {
    const classes = useStyles();
    const history = useHistory();
    const accountContext = useContext(AccountContext);
    const isChainSupported = useGetIsChainSupported(supportedChains);
    let updateTradeInputInterval = null;
    const [tradeInput, setTradeInput] = useState(0);
    const [isSwapEnabled, setIsSwapEnabled] = useState(false);
    const [isSwapInProgress, setIsSwapInProgress] = useState(false);

    if(!isChainSupported) {
        return (
            <ChainAlert/>
        )
    }

    if(!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    return (
        <>
            <div className={classes.CourtToRoomSwapPage}>
                <Navbar
                    title={"Court Room Swap"}
                    details={
                        "Swap your COURT Tokens for ROOM tokens"
                    }
                />
                <div className={classes.CourtToRoomSwapPage__Main}>
                    <div className={classes.SwapBox}>
                        <div className={classes.SwapBox__Info}>
                            Your current COURT Balance: <span>50</span>
                        </div>
                        <div className={classes.SwapBox__ValHeadline}>
                            Please select how much would like to swap?
                        </div>
                        <div className={classes.TradeInputWrap}>
                            <TradeInput max={100000000000000000000000000}
                                        hideSlider={false}
                                        min={0}
                                        value={tradeInput}
                                        onValidityUpdate={(valid) => {
                                            //setIsTradeDisabled(!valid);
                                        }}
                                        onChange={(e) => {
                                            clearTimeout(updateTradeInputInterval);
                                            updateTradeInputInterval = setTimeout(() => {
                                                setTradeInput(e);
                                            }, 100);

                                            if (e == 0) {
                                                setIsSwapEnabled(true);
                                            } else {
                                                setIsSwapEnabled(false);
                                            }
                                        }}
                            />
                        </div>
                        <div className={classes.SwapBox__Info}>
                            Expected ROOM amount: <span>30</span>
                        </div>
                        <div className={classes.SwapBox_ActionWrap}>
                            <Button color="primary"
                                    size={"large"}
                                    fullWidth={true}
                                    onClick={() => {}}
                                    isDisabled={isSwapEnabled}
                                    isProcessing={isSwapInProgress}>
                                Swap
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourtToRoomSwap;
