import React, {useContext, useEffect, useState} from "react";
import swal from 'sweetalert';
import numeral from "numeral";

import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";
import Button from "../Button";
import DepositModal from "../DepositModal";
import UnstakeModal from "../UnstakeModal";
import {fromWei} from "../../shared/helper";
import MarketAPIs from '../../shared/contracts/MarketAPIs';
import ClaimAPIs from '../../shared/contracts/ClaimAPIs';

function MarketLiquidityWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    const [isProcessing, setIsProcessing] = useState(false);
    //Liq
    const [isRemoveLiquidityModalOpen, setIsRemoveLiquidityModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isAddLiquidityInProgress, setIsAddLiquidityInProgress] = useState(false);
    const [isRemoveLiquidityInProgress, setIsRemoveLiquidityInProgress] = useState(false);
    const [marketLiqRewards, setMarketLiqRewards] = useState({});
    const [isClaimingLpRewards, setIsClaimingLpRewards] = useState(false);

    const loadMarketLiqRewards = async () => {
        const claimAPIs = new ClaimAPIs();
        const rewards = await claimAPIs.getMarketLiqRewards(accountContext.account, props.marketContractAddress);
        setMarketLiqRewards(rewards);
    }

    useEffect(() => {
        if(props.marketContractAddress) {
            loadMarketLiqRewards();
        }
    }, [props.marketContractAddress]);

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
        if(props.walletAllowanceOfCollateralToken == 0) {
            setIsAddLiquidityInProgress(true);
            const marketAPIs = new MarketAPIs(props.marketVersion);
            await marketAPIs.approveCollateralTokenForMarketRouter(accountContext.account);
            props.onApproveCollateralToken && props.onApproveCollateralToken();
            setIsAddLiquidityInProgress(false);
            return;
        }

        setIsDepositModalOpen(true);
    };

    const handleRemoveLiquidity = async () => {
        if(!props.isWalletOptionTokenApprovedForMarket) {
            setIsRemoveLiquidityInProgress(true);
            const marketAPIs = new MarketAPIs(props.marketVersion);
            await marketAPIs.approveOptionTokenForMarket(accountContext.account, props.marketContractAddress);
            props.onApproveOptionToken && props.onApproveOptionToken('market');
            setIsRemoveLiquidityInProgress(false);
            return;
        }

        setIsRemoveLiquidityModalOpen(true);
    };

    const handleClaimLpRewards = async () => {
        try {
            setIsClaimingLpRewards(true);
            const claimAPIs = new ClaimAPIs();
            await claimAPIs.claimMarketLiqRewards(accountContext.account, props.marketContractAddress);
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
                    <div>{numeral(fromWei(props.marketLiquidity || 0)).format("$0,0.00")}</div>
                </div>
                <div>
                    <div>Your Share</div>
                    <div>{numeral(props.walletSharesPercentageOfMarket / 1000000).format("0%")}</div>
                </div>
            </div>
            <div className={classes.MarketLiquidityWidget__Actions}>
                {
                    showAddLiquiditySection() && (
                        <>
                            <div>
                                {(props.walletAllowanceOfCollateralToken == 0) && (<div className={classes.MarketLiquidityWidget__ActionsApprove} onClick={handleAddLiquidity}>(approve to unlock)</div>)}
                                <Button
                                    color="primary"
                                    isDisabled={props.walletAllowanceOfCollateralToken == 0}
                                    onClick={handleAddLiquidity}
                                    size={"small"}>
                                    Add Liquidity
                                </Button>
                            </div>
                        </>
                    )
                }
                {
                    (showRemoveLiquiditySection() && parseFloat(props.walletSharesOfMarket) > 0) && (
                        <div>
                            {!props.isWalletOptionTokenApprovedForMarket && (<div className={classes.MarketLiquidityWidget__ActionsApprove} onClick={handleRemoveLiquidity}>(approve to unlock)</div>)}
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
                              props.onAddLiquidity && props.onAddLiquidity();
                          }}
                          userRoomLPTokens={
                              props.walletBalanceOfCollateralToken
                          }
                          marketContractId={props.marketContractAddress}
                          type={"Add_Market_Liquidity"}/>
            <UnstakeModal
                marketContractId={props.marketContractAddress}
                open={isRemoveLiquidityModalOpen}
                onClose={() =>
                    setIsRemoveLiquidityModalOpen(false)
                }
                onUnStake={() => {
                    props.onRemoveLiquidity && props.onRemoveLiquidity();
                }}
                stakedTokensBalance={props.walletSharesOfMarket || 0}
                type={"market_liquidity"}
            />
        </div>
    );
}

export default MarketLiquidityWidget;
