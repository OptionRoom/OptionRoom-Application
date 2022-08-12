import React, {useState, useContext, useEffect} from "react";

import {
    DateTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
    get
} from "lodash";
import {
    useHistory
} from "react-router-dom";
import swal from "sweetalert";
import Joi from 'joi';
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    useForm,
    useFieldArray
} from "react-hook-form";
import {
    joiResolver
} from '@hookform/resolvers/joi';

import ChainAlert from '../../components/ChainAlert';
import OrSelect from './../../components/OrSelect';
import ConnectButton from "../../components/ConnectButton";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import CropModal from "../../components/CropModal";
import TradeInput from "../../components/TradeInput";

import {
    useStyles
} from "./styles";
import {
    AccountContext
} from "../../shared/AccountContextProvider";

import {
    toWei,
    fromWei,
    formatTradeValue,
    convertBase64ToBlob
} from "../../shared/helper";

import {
    getMarketCreationConfig
} from '../../methods/or-manager.methods';

import {
    createMarketProposal
} from '../../methods/market-controller.methods';

import {
    uploadMarketImageToIpfs,
} from "../../shared/ipfs.service";
import {
    useGetIsChainSupported,
    useGetMarketCategories
} from "../../shared/hooks";
import {
    getContractAddress
} from '../../shared/contracts/contracts.helper';
import {
    ContractNames,
    ChainNetworks,
    GovernanceTypes
} from "../../shared/constants";
import RepeaterField from "../../components/RepeaterField";
import {
    formatAddress,
    SmartContractsContextFunctions
} from "../../shared/SmartContractsContextProvider";
import {smartState} from "../../shared/SmartState";

const sourcesFieldName = 'sources';
const choicesFieldName = 'choices';
const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET, ChainNetworks.LOCAL_CHAIN, ChainNetworks.BINANCE_SMART_CHAIN];

function CreateMarket() {
    const classes = useStyles();
    const history = useHistory();
    const accountContext = useContext(AccountContext);
    const isChainSupported = useGetIsChainSupported(supportedChains);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingMarket, setIsCreatingMarket] = useState(false);
    const marketCategories = useGetMarketCategories(GovernanceTypes.MARKET, accountContext.account);
    const [croppingImg, setCroppingImg] = useState(null);
    const [marketCreationFees, setMarketCreationFees] = useState(0);
    const [marketMinLiq, setMarketMinLiq] = useState(1000);

    const {control, isValid, register, setValue, getValues, handleSubmit, watch, formState: {isDirty, errors}} = useForm({
        defaultValues: {
            [sourcesFieldName]: [{value: ''}],
            [`${choicesFieldName}`]: [{value: 'Yes'}, {value: 'No'}],
            liquidity: 0
        },
        resolver: joiResolver(Joi.object({
            title: Joi.string()
                .trim()
                .min(10)
                .max(100)
                .required()
                .label('Title'),
            description: Joi.string()
                .trim()
                .min(100)
                .max(4000)
                .required()
                .label('Description'),
            [sourcesFieldName]: Joi.array()
                .min(1)
                .items(
                    Joi.object().keys({
                        value: Joi.string()
                            .pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
                            .label('Source')
                            .required()
                            .messages({
                                'string.pattern.base': `"Source" should be a valid URL`
                            })
                    })
                ),
            [choicesFieldName]: Joi.array()
                .min(2)
                .items(
                    Joi.object().keys({
                        value: Joi.string()
                            .label('Choice')
                            .required()
                    })
                ),
            category: Joi.any()
                .required()
                .label('Category'),
            endDate: Joi.any()
                .required()
                .label('End date'),
            liquidity: Joi.number()
                .min(marketMinLiq)
                .max(parseFloat(fromWei(get(smartState.walletBalanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.busd))], 0))))
                .required()
                .label('Liquidity'),
            image: Joi.any()
                .required()
                .label('Image'),
        }))
    });

    const sourcesFieldArray = useFieldArray({
        control,
        name: sourcesFieldName,
    });

    const choicesFieldArray = useFieldArray({
        control,
        name: choicesFieldName,
    });

    const handleChangeSelectedFile = async (event) => {
        setCroppingImg(event.target.files[0]);
        setIsCropModalOpen(true);
    };

    const handleOnCrop = async (src) => {
        setValue("image", src, { shouldValidate: true });
    };

    const approveStableCoin = async () => {
        setIsCreatingMarket(true);
        try {
            await smartState.callApproveContractForSpender(accountContext.account, ContractNames.busd, ContractNames.marketControllerV4);
//            await smartState.executeFunction(SmartContractsContextFunctions.APPROVE_CONTRACT_TO_SPENDER, [accountContext.account, ContractNames.busd, ]);
        } catch (e) {

        } finally {
            setIsCreatingMarket(false);
        }
    };

    const approveRoomToken = async () => {
        setIsCreatingMarket(true);
        try {
            await smartState.executeFunction(SmartContractsContextFunctions.APPROVE_CONTRACT_TO_SPENDER, [accountContext.account, ContractNames.room, ContractNames.marketControllerV4]);
        } catch (e) {

        } finally {
            setIsCreatingMarket(false);
        }
    };

    const handleCreateMarket = async (data) => {
        if(parseFloat(fromWei(get(smartState.walletBalanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.room))], 0))) < parseFloat(fromWei(marketCreationFees))) {
            swal(
                "Insufficient funds",
                `You must hold at least ${fromWei(marketCreationFees)} ROOM Tokens to create the market`,
                "error"
            );
            return;
        }

        try {
            setIsCreatingMarket(true);
            const imgBlob = await convertBase64ToBlob(data.image);
            const imageUpload = await uploadMarketImageToIpfs(imgBlob);
            const resolveTimestamp = data.endDate.clone().add(24, 'hours').unix();
            const collateralTokenAddress = getContractAddress(ContractNames.busd);
            const sources = data.sources.map((entry) => entry.value);
            const categories = data.category.map((entry) => entry.value);
            const choices = data.choices.map((entry) => entry.value);

            const marketResult = await createMarketProposal(
                accountContext.account,
                collateralTokenAddress,
                data.endDate.unix(),
                resolveTimestamp,
                toWei(data.liquidity),
                data.title.trim(),
                choices,
                imageUpload,
                data.description.trim(),
                sources,
                categories
            );

            //Redirect to market page after creation
            history.push(`/markets/${get(marketResult, ['events', 'MarketCreated', 'returnValues', 'marketAddress'])}`);
        } catch (e) {
            console.log("Something went wrong!", e);
        } finally {
            setIsCreatingMarket(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            if (accountContext.account) {
                const marketCreationConfig = await getMarketCreationConfig(accountContext.account);
                setMarketMinLiq(parseFloat(fromWei(marketCreationConfig.minLiquidity)));
                setMarketCreationFees(marketCreationConfig.marketCreationFees);
                setIsLoading(false);
            }
        };

        if(isChainSupported) {
            init();
        }
    }, [accountContext.account, accountContext.chainId, isChainSupported]);

    const renderCreateBtn = () => {


        if (get(smartState.walletAllowanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.busd)), formatAddress(getContractAddress(ContractNames.marketControllerV4))], 0) <= 0) {
            return (
                <Button size={'large'}
                        role={'button'}
                        onClick={approveStableCoin}
                        isProcessing={isCreatingMarket}
                        color={'primary'}
                        fullWidth={true}>Approve BUSD</Button>
            )
        }

        if (get(smartState.walletAllowanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.room)), formatAddress(getContractAddress(ContractNames.marketControllerV4))], 0) <= 0) {
            return (
                <Button size={'large'}
                        role={'button'}
                        onClick={approveRoomToken}
                        isProcessing={isCreatingMarket}
                        color={'primary'}
                        fullWidth={true}>Approve ROOM</Button>
            )
        }

        return (
            <Button size={'large'}
                    isProcessing={isCreatingMarket}
                    color={'primary'}
                    type={'submit'}
                    fullWidth={true}>Create</Button>
        )
    }

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

    if(isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <>
            <div className={classes.CreateMarketPage}>
                <Navbar
                    title={"Create a market"}
                    details={
                        "Fill in details and have your market ready"
                    }
                />
                <div className={classes.CreateMarketPage__Main}>
                    <form noValidate
                          onSubmit={handleSubmit(handleCreateMarket)}>
                        <div className={classes.CreateMarketBox}>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Market Question <span
                                        className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <input {...register("title")}/>
                                        {
                                            errors.title?.message && (
                                                <div
                                                    className={classes.CreateMarket__FieldBodyFieldError}>
                                                    {errors.title?.message}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>

                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={classes.CreateMarket__FieldTitle}>
                                        Category <span
                                        className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div
                                        className={`${classes.CreateMarket__FieldBody} ${classes.CreateMarket__CategoryField}`}>
                                        <OrSelect onChange={(e) => {
                                            setValue("category", e, { shouldValidate: true });
                                        }}
                                                  isMulti={true}
                                                  options={marketCategories.map((entry) => {
                                                      return {
                                                          value: entry.id,
                                                          label: entry.title
                                                      };
                                                  })}/>
                                        {errors.category?.message && (
                                            <div
                                                className={classes.CreateMarket__FieldBodyFieldError}>
                                                {errors.category?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={classes.CreateMarket__FieldTitle}>End
                                        Date <span
                                            className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div
                                        className={`${classes.CreateMarket__FieldBody} ${classes.DateTimePickerField}`}>
                                        <MuiPickersUtilsProvider
                                            utils={MomentUtils}>
                                            <DateTimePicker
                                                format="yyyy/MM/DD hh:mm a"
                                                variant="inline"
                                                value={getValues('endDate') || moment().add(3, 'days')}
                                                onChange={(e) => {
                                                    setValue("endDate", e, { shouldValidate: true });
                                                }}
                                                minDate={moment().add(3, 'days')}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {errors.endDate?.message && (
                                            <div
                                                className={classes.CreateMarket__FieldBodyFieldError}>
                                                {errors.endDate?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div
                                    className={`${classes.CreateMarket__Field}`}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Choices <span
                                        className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <RepeaterField fieldArray={choicesFieldArray}
                                                       fieldName={choicesFieldName}
                                                       errors={errors}
                                                       minEntries={2}
                                                       register={register}/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Rules / Description <span
                                        className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <textarea {...register("description")}/>
                                        {errors.description?.message && (
                                            <div
                                                className={classes.CreateMarket__FieldBodyFieldError}>
                                                {errors.description?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div
                                    className={`${classes.CreateMarket__Field}`}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        References/Sources <span
                                        className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <RepeaterField fieldArray={sourcesFieldArray}
                                                       fieldName={sourcesFieldName}
                                                       errors={errors}
                                                       minEntries={1}
                                                       register={register}/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={`${classes.CreateMarket__FieldTitle} ${classes.CreateMarket__FieldTitleLiquidity}`}>
                                                                    <span>Liquidity <span
                                                                        className={classes.CreateMarket__FieldTitleRequired}>*</span></span>
                                        <span
                                            className={classes.CreateMarket__FieldTitle__helper}>(available {formatTradeValue(fromWei(get(smartState.walletBalanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.busd))], 0)))}) BUSD</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <TradeInput max={fromWei(get(smartState.walletBalanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.busd))], 0))}
                                                    min={marketMinLiq}
                                                    value={getValues('liquidity') || 0}
                                                    onValidityUpdate={(valid) => {
                                                        //setIsTradeDisabled(!valid);
                                                    }}
                                                    onChange={(e)=> {
                                                        setValue("liquidity", e,{ shouldValidate: true });
                                                    }}/>
                                    </div>
                                    {(isDirty && errors.liquidity?.message) && (
                                        <div
                                            className={classes.CreateMarket__FieldBodyFieldError}>
                                            {errors.liquidity?.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Image <span
                                        className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBodyImg}>
                                        {
                                            !getValues("image") && (
                                                <div
                                                    className={classes.CreateMarket__FieldBodyImgEmpty}>
                                                    <div>PNG or JPG: 300x300 pixels</div>
                                                    <Button size={'medium'}
                                                            component="label"
                                                            color={'primary'}>
                                                        <input accept="image/*"
                                                               hidden={true}
                                                               onChange={handleChangeSelectedFile}
                                                               type="file"/>
                                                        Upload
                                                    </Button>
                                                </div>
                                            )
                                        }
                                        {
                                            getValues("image") && (
                                                <div
                                                    className={classes.CreateMarket__FieldBodySelected}>
                                                    <div
                                                        className={classes.MarketImgFileWrap}>
                                                        <img
                                                            className={classes.MarketImgFileWrap__Img}
                                                            src={getValues("image")}/>
                                                    </div>
                                                    <Button size={'medium'}
                                                            component="label"
                                                            color={'primary'}>
                                                        <input accept="image/*"
                                                               hidden={true}
                                                               onChange={handleChangeSelectedFile}
                                                               type="file"/>
                                                        Change
                                                    </Button>
                                                </div>
                                            )
                                        }
                                    </div>
                                    {errors.image?.message && (
                                        <div
                                            className={classes.CreateMarket__FieldBodyFieldError}>
                                            {errors.image?.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={classes.CreateBtnWrap}>
                            {renderCreateBtn()}
                        </div>
                        <div className={classes.CreateNote}>
                            Creating a market costs {fromWei(marketCreationFees)} ROOM, your ROOM balance is: {fromWei(get(smartState.walletBalanceOfSomething, [formatAddress(accountContext.account), formatAddress(getContractAddress(ContractNames.room))], 0), null, 2)}
                        </div>
                    </form>
                    <CropModal isOpen={isCropModalOpen}
                               onCrop={handleOnCrop}
                               onClose={() => setIsCropModalOpen(false)}
                               file={croppingImg}/>
                </div>
            </div>
        </>
    );
}

export default CreateMarket;
