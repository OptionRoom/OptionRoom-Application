import React, {useContext, useEffect, useState} from "react";
import swal from 'sweetalert';
import numeral from "numeral";
import {get} from 'lodash';

import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";
import Button from "../Button";
import DepositModal from "../DepositModal";
import UnstakeModal from "../UnstakeModal";
import {fromWei} from "../../shared/helper";
import ClaimAPIs from '../../shared/contracts/ClaimAPIs';
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {
    formatAddress,
    SmartContractsContext,
    SmartContractsContextFunctions
} from "../../shared/SmartContractsContextProvider";
import {getContractAddress} from "../../shared/contracts/contracts.helper";
import {ContractNames} from "../../shared/constants";

function MarketLiquidityWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const smartContractsContext = useContext(SmartContractsContext);
    const {
        marketContractAddress
    } = props;

    const busdAddress = getContractAddress(ContractNames.busd);
    const marketControllerV4Address = getContractAddress(ContractNames.marketControllerV4);
    const walletAllowanceOfCollateralToken = get(smartContractsContext.walletAllowanceOfSomething, [formatAddress(accountContext.account), formatAddress(busdAddress), formatAddress(marketControllerV4Address)], 0);
    const isWalletOptionTokenApprovedForMarket = get(smartContractsContext.marketWalletData, [formatAddress(marketContractAddress), formatAddress(accountContext.account), 'isWalletOptionTokenApprovedForMarket'], false);
    const walletBalanceOfMarket = get(smartContractsContext.marketWalletData, [formatAddress(marketContractAddress), formatAddress(accountContext.account), 'marketBalanceOf'], 0);
    const walletBalanceOfCollateral = get(smartContractsContext.walletBalanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.busd))], 0);

    console.log('222', smartContractsContext.marketWalletData, isWalletOptionTokenApprovedForMarket);

    //Liq
    const [isRemoveLiquidityModalOpen, setIsRemoveLiquidityModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isAddLiquidityInProgress, setIsAddLiquidityInProgress] = useState(false);
    const [isRemoveLiquidityInProgress, setIsRemoveLiquidityInProgress] = useState(false);
    const [marketLiqRewards, setMarketLiqRewards] = useState({});
    const [isClaimingLpRewards, setIsClaimingLpRewards] = useState(false);

    const loadMarketLiqRewards = async () => {
        const claimAPIs = new ClaimAPIs();
        const rewards = await claimAPIs.getMarketLiqRewards(accountContext.account, marketContractAddress);
        setMarketLiqRewards(rewards);
    }

    useEffect(() => {
        if(marketContractAddress) {
            loadMarketLiqRewards();
        }
    }, [marketContractAddress]);

    const showAddLiquiditySection = () => {
        return ["3"].indexOf(props.marketState) > -1;
    };

    const showRemoveLiquiditySection = () => {
        return ["0", "2", "3", "4", "6", "9"].indexOf(props.marketState) > -1;
    };

    const showClaimLpRewards = () => {
        return marketLiqRewards && (marketLiqRewards.claimedRewards > 0 || marketLiqRewards.pendingRewards > 0);
    };


    const handleAddLiquidity = async () => {
        if(walletAllowanceOfCollateralToken == 0) {
            setIsAddLiquidityInProgress(true);
            smartContractsContext.executeFunction(SmartContractsContextFunctions.APPROVE_CONTRACT_TO_SPENDER, [
                accountContext.account,
                ContractNames.busd,
                ContractNames.marketControllerV4
            ]);
            setIsAddLiquidityInProgress(false);
            return;
        }

        setIsDepositModalOpen(true);
    };

    const handleRemoveLiquidity = async () => {
        if(!isWalletOptionTokenApprovedForMarket) {
            setIsRemoveLiquidityInProgress(true);
            await smartContractsContext.executeFunction(SmartContractsContextFunctions.APPROVE_OPTION_TOKEN_TO_SPENDER, [
                accountContext.account,
                marketContractAddress
            ]);
            setIsRemoveLiquidityInProgress(false);
            return;
        }

        setIsRemoveLiquidityModalOpen(true);
    };

    const handleClaimLpRewards = async () => {
        try {
            setIsClaimingLpRewards(true);
            const claimAPIs = new ClaimAPIs();
            await claimAPIs.claimMarketLiqRewards(accountContext.account, marketContractAddress);
            loadMarketLiqRewards();
        } catch (e) {

        } finally {
            setIsClaimingLpRewards(false);
        }
    };

    return (
        <div className={classes.MarketLiquidityWidget}>
            <div className={classes.MarketLiquidityWidget__Header}>
                Liquidity
            </div>
            <div className={classes.MarketLiquidityWidget__Info}>
                <div>
                    <div>Total Liquidity</div>
                    <div>{numeral(fromWei(get(smartContractsContext, ['marketInfo', formatAddress(marketContractAddress), 'liquidity'], 0))).format("$0,0.00")}</div>
                </div>
                <div>
                    <div>Your Share</div>
                    <div>{numeral(fromWei(walletBalanceOfMarket)).format("0,0.00")}</div>
                </div>
            </div>
            <div className={classes.MarketLiquidityWidget__Actions}>
                {
                    showAddLiquiditySection() && (
                        <>
                            <div>
                                {(walletAllowanceOfCollateralToken == 0) && (<div className={classes.MarketLiquidityWidget__ActionsApprove} onClick={handleAddLiquidity}>(approve to unlock)</div>)}
                                <Button
                                    color="primary"
                                    isDisabled={walletAllowanceOfCollateralToken == 0}
                                    onClick={handleAddLiquidity}
                                    size={"small"}>
                                    Add Liquidity
                                </Button>
                            </div>
                        </>
                    )
                }
                {
                    (showRemoveLiquiditySection() && parseFloat(walletBalanceOfMarket) > 0) && (
                        <div>
                            {!isWalletOptionTokenApprovedForMarket && (<div className={classes.MarketLiquidityWidget__ActionsApprove} onClick={handleRemoveLiquidity}>(approve to unlock)</div>)}
                            <Button
                                isDisabled={false}
                                size={"small"}
                                color="primary"
                                onClick={handleRemoveLiquidity}
                            >
                                Remove liquidity
                            </Button>
                        </div>
                    )
                }
            </div>
            {
                showClaimLpRewards() && (
                    <div className={classes.LiquidityRewards}>
                        <div>
                            <div>
                                <div>Claimed rewards</div>
                                <div>{numeral(fromWei(marketLiqRewards.claimedRewards || 0)).format("$0,0.00")}</div>
                            </div>
                            <div>
                                <div>Claimable rewards</div>
                                <div>{numeral(fromWei(marketLiqRewards.pendingRewards || 0)).format("$0,0.00")}</div>
                            </div>
                        </div>
                        <Button
                            isDisabled={parseFloat(fromWei(marketLiqRewards.pendingRewards || 0)) < 0.01}
                            isProcessing={isClaimingLpRewards}
                            size={"small"}
                            color="primary"
                            onClick={handleClaimLpRewards}
                        >
                            Claim Rewards
                        </Button>
                    </div>
                )
            }
            <DepositModal open={isDepositModalOpen}
                          onClose={() => setIsDepositModalOpen(false)}
                          onStake={() => {
                              smartContractsContext.loadMarketWalletData(accountContext.account, marketContractAddress);
                              smartContractsContext.loadWalletBalanceOfToken(accountContext.account, getContractAddress(ContractNames.busd));
                              smartContractsContext.loadMarketInfo(accountContext.account, marketContractAddress);
                          }}
                          userRoomLPTokens={walletBalanceOfCollateral}
                          marketContractId={marketContractAddress}
                          type={"Add_Market_Liquidity"}/>
            <UnstakeModal
                marketContractId={marketContractAddress}
                open={isRemoveLiquidityModalOpen}
                onClose={() =>
                    setIsRemoveLiquidityModalOpen(false)
                }
                onUnStake={() => {
                    smartContractsContext.loadMarketWalletData(accountContext.account, marketContractAddress);
                    smartContractsContext.loadWalletBalanceOfToken(accountContext.account, getContractAddress(ContractNames.busd));
                    smartContractsContext.loadMarketInfo(accountContext.account, marketContractAddress);
                }}
                stakedTokensBalance={walletBalanceOfMarket}
                type={"market_liquidity"}
            />
        </div>
    );
}

export default MarketLiquidityWidget;
