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

function MarketLiquidityWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    const [isProcessing, setIsProcessing] = useState(false);
    //Liq
    const [isRemoveLiquidityModalOpen, setIsRemoveLiquidityModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isAddLiquidityInProgress, setIsAddLiquidityInProgress] = useState(false);
    const [isRemoveLiquidityInProgress, setIsRemoveLiquidityInProgress] = useState(false);

    useEffect(() => {
    }, []);

    const showAddLiquiditySection = () => {
        return ["3"].indexOf(props.marketState) > -1;
    };

    const showRemoveLiquiditySection = () => {
        return ["0", "2", "3", "4", "6"].indexOf(props.marketState) > -1;
    };

    const handleAddLiquidity = async () => {
        if(props.walletAllowanceOfCollateralToken == 0) {
            setIsAddLiquidityInProgress(true);
            const marketAPIs = new MarketAPIs();
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
            const marketAPIs = new MarketAPIs();
            await marketAPIs.approveOptionTokenForMarket(accountContext.account, props.marketContractAddress);
            props.onApproveOptionToken && props.onApproveOptionToken('market');
            setIsRemoveLiquidityInProgress(false);
            return;
        }

        setIsRemoveLiquidityModalOpen(true);
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
