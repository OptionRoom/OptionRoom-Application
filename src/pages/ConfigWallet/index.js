import {useState, useContext, useEffect} from "react";
import {get, isEmpty} from "lodash";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import MarketAPIs from "../../shared/contracts/MarketAPIs";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import {useStyles} from "./styles";

import {
    toWei,
    fromWei,
} from "../../shared/helper";
import {
    getWalletBalanceOfContract,
    mintRoomDemoTokenToWallet,
} from "../../shared/contracts/contracts.helper";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

function ConfigWallet() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const classes = useStyles();

    const [formDataErrors, setFormDataErrors] = useState({});
    const [formData, setFormData] = useState({
        addType: 'collateral'
    });
    const [walletBalances, setWalletBalances] = useState(null);
    const accountContext = useContext(AccountContext);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAdd = async () => {
        try {

            const marketApis = new MarketAPIs();
            if(get(formData, ['addType']) === 'collateral') {
                await marketApis.mintCollateralToken(get(formData, ['walletAddress']), toWei(get(formData, ['addInput'])));
            }
            if(get(formData, ['addType']) === 'room') {
                await mintRoomDemoTokenToWallet(get(formData, ['walletAddress']), get(formData, ['addInput']));
            }
            setIsProcessing(true);
        } catch (e) {
            console.log("Something went wrong!", e);
        } finally {
            setIsProcessing(false);
        }

        handleLoadWalletBalance(get(formData, ['walletAddress']));
    };


    const handleIncreaseMarketTime = async () => {

        try {
            const marketApis = new MarketAPIs();
            const marketAddress = get(formData, ['marketAddress']);
            const timeIncrease = get(formData, ['marketTime']);
            marketApis.increaseTime(accountContext.account, marketAddress, timeIncrease);

        } catch (e) {
            console.log("Something went wrong!", e);
        } finally {
        }
    };

    const handleLoadWalletBalance = async (fieldValue) => {
        const marketApis = new MarketAPIs();

        try {
            const balanceOfColletralToken = await marketApis.getWalletBalanceOfCollateralToken(fieldValue);
            const balanceOfRoomToken = await getWalletBalanceOfContract(fieldValue, 'room');
            setWalletBalances({
                balanceOfCollateralToken: balanceOfColletralToken,
                balanceOfRoomToken: balanceOfRoomToken,
            })

        } catch (e) {

        }

    };


    const handleLoadMarketTime = async (fieldValue) => {
        const marketApis = new MarketAPIs();

        try {
            const marketTimeRes = await marketApis.getMarketTime(accountContext.account, fieldValue);
        } catch (e) {

        }

    };

    const handleFormDataChange = (fieldKey, fieldValue) => {
        const newFormData = {...formData};
        newFormData[fieldKey] = fieldValue;
        setFormData(newFormData);

        if(fieldKey == 'walletAddress') {
            handleLoadWalletBalance(fieldValue);
        }

        if(fieldKey == 'marketAddress') {
            handleLoadMarketTime(fieldValue);
        }
    };

    useEffect(() => {
        const init = async () => {

        };

        init();
    }, [accountContext.account]);

    return (
        <>
            <Navbar
                title={"Configure wallet"}
                details={''}
            />
            <div className={classes.CreateMarketPage}>
                {accountContext.account && (
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
                                               }}/>
                                        {get(formDataErrors, ['walletAddress']) && (
                                            <div className={classes.CreateMarket__FieldBodyFieldError}>
                                                {get(formDataErrors, ['walletAddress'])}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {get(formData, ['walletAddress']) && (
                                    <>
                                        <div className={classes.CreateMarket__Field}>
                                            <div className={classes.CreateMarket__FieldTitle}>Details</div>
                                            <div className={classes.CreateMarket__FieldBody}>
                                                <div>Collateral: {fromWei(get(walletBalances, 'balanceOfCollateralToken') || 0)}</div>
                                                <div>ROOM: {fromWei(get(walletBalances, 'balanceOfRoomToken') || 0)}</div>
                                            </div>
                                        </div>
                                        <div className={classes.CreateMarket__Field}>
                                            <div className={classes.CreateMarket__FieldTitle}>Add</div>
                                            <div className={classes.CreateMarket__FieldBody}>
                                                <RadioGroup
                                                    row
                                                    aria-label="position"
                                                    name="addType"
                                                    value={get(formData, ['addType'])}
                                                    onChange={(event) => {
                                                        handleFormDataChange('addType', event.target.value);
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="collateral"
                                                        control={
                                                            <Radio color="primary" />
                                                        }
                                                        label="Collateral"
                                                        labelPlacement="end"
                                                    />
                                                    <FormControlLabel
                                                        value="room"
                                                        control={
                                                            <Radio color="primary" />
                                                        }
                                                        label="Room"
                                                        labelPlacement="end"
                                                    />
                                                </RadioGroup>
                                                <input type={'number'}
                                                       value={get(formData, ['addInput'])}
                                                       onChange={(e) => {
                                                           handleFormDataChange('addInput', e.target.value);
                                                       }}/>
                                                {get(formDataErrors, ['addInput']) && (
                                                    <div className={classes.CreateMarket__FieldBodyFieldError}>
                                                        {get(formDataErrors, ['addInput'])}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {get(formData, ['walletAddress']) && (
                            <>
                                <div className={classes.CreateBtnWrap}>
                                    <Button size={'large'}
                                            isProcessing={isProcessing}
                                            color={'primary'}
                                            onClick={handleAdd}
                                            fullWidth={true}>
                                        Complete
                                    </Button>
                                </div>
                            </>
                        )}
                        <hr/>
{/*                        <div>Increase market time</div>
                        <div>
                            <div>
                                <input type={'text'}
                                       placeholder={'market Address'}
                                       value={get(formData, ['marketAddress'])}
                                       onChange={(e) => {
                                           handleFormDataChange('marketAddress', e.target.value);
                                       }}/>
                                <input type={'number'}
                                       placeholder={'time'}
                                       value={get(formData, ['marketTime'])}
                                       onChange={(e) => {
                                           handleFormDataChange('marketTime', e.target.value);
                                       }}/>
                            </div>
                            <div>
                                Current market time:
                            </div>
                            <Button onClick={handleIncreaseMarketTime}>Confirm</Button>
                        </div>*/}
                    </div>
                )}
                {!accountContext.account && (
                    <div className={classes.ConnectWrap}>
                        <ConnectButton/>
                    </div>
                )}
            </div>
        </>
    );
}

export default ConfigWallet;
