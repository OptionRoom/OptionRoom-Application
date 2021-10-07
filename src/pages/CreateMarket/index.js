import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {get, isEmpty} from "lodash";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import Joi from 'joi';
import CircularProgress from "@material-ui/core/CircularProgress";
import {useForm, useFieldArray} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi';

import ChainAlert from '../../components/ChainAlert';
import {useStyles} from "./styles";
import OrSelect from './../../components/OrSelect';
import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import MarketAPIs from "../../shared/contracts/MarketAPIs";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import ButtonSteps from "../../components/ButtonSteps";

import {walletHelper} from "../../shared/wallet.helper";
import {
    toWei,
    fromWei,
    isValidURL
} from "../../shared/helper";

import {
    uploadMarketImage,
    createMarket,
    createAuthOnFirebase,
    signInUserWithToken,
    signoutUser, getIfWalletIsWhitelistedForBeta
} from "../../shared/firestore.service";
import NotWhitelisted from "../../components/NotWhitelisted";
import CropModal from "../../components/CropModal";
import {useGetMarketCategories} from "../../shared/hooks";
import TradeInput from "../../components/TradeInput";
import {getContractAddress, getWalletBalanceOfContract} from '../../shared/contracts/contracts.helper';
import ConfigHelper from "../../shared/config.helper";
import {ChainNetworks, GovernanceTypes} from "../../shared/constants";

const walletHelperInsatnce = walletHelper();

function CreateMarket() {
    const classes = useStyles();
    const history = useHistory();

    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");

    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [isWalletWhitelistedForBeta, setIsWalletWhitelistedForBeta] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const accountContext = useContext(AccountContext);
    const [isCreatingMarket, setIsCreatingMarket] = useState(false);
    const marketCategories = useGetMarketCategories(GovernanceTypes.MARKET);

    const [walletBalanceOfCollateralToken, setWalletBalanceOfCollateralToken] = useState(0);
    const [walletAllowanceOfCollateralTokenForMarketRouter, setWalletAllowanceOfCollateralTokenForMarketRouter] = useState(0);
    const [walletAllowanceOfRoomTokenForMarketRouter, setWalletAllowanceOfRoomTokenForMarketRouter] = useState(0);
    const [walletRoomBalance, setWalletRoomBalance] = useState(0);
    const [croppingImg, setCroppingImg] = useState(null);
    const [marketCreationFees, setMarketCreationFees] = useState(0);

    const {control, isValid, register, setValue, getValues, handleSubmit, watch, formState: {isDirty, errors}} = useForm({
        defaultValues: {
            sources: [{value: ''}],
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
            sources: Joi.array()
                .min(1)
                .items(
                    Joi.object().keys({
                        name: Joi.string()
                            .pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
                            .label('Source')
                            .required()
                            .messages({
                                'string.pattern.base': `"Source" should be a valid URL`
                            })
                    })
                ),
            category: Joi.any()
                .required()
                .label('Category'),
            endDate: Joi.any()
                .required()
                .label('End date'),
            liquidity: Joi.number()
                .min(1000)
                .max(parseFloat(walletBalanceOfCollateralToken ? fromWei(walletBalanceOfCollateralToken) : 0))
                .required()
                .label('Liquidity'),
            image: Joi.any()
                .required()
                .label('Image'),
        }))
    });

    const {
        fields: sourceFields,
        append: appendSource,
        remove: removeSource
    } = useFieldArray({
        control,
        name: "sources",
    });


    const loadWalletBalanceOfCollateralToken = async () => {
        const marketApis = new MarketAPIs();
        const balanceOfColletralToken = await marketApis.getWalletBalanceOfCollateralToken(accountContext.account);
        setWalletBalanceOfCollateralToken(balanceOfColletralToken);

        const walletAllowanceOfCollateralTokenForMarketRouter = await marketApis.getWalletAllowanceOfCollateralTokenForMarketRouter(accountContext.account);
        setWalletAllowanceOfCollateralTokenForMarketRouter(walletAllowanceOfCollateralTokenForMarketRouter);

        const walletAllowanceOfRoomTokenForMarketRouter = await marketApis.getWalletAllowanceOfRoomTokenForMarketRouter(accountContext.account);
        setWalletAllowanceOfRoomTokenForMarketRouter(walletAllowanceOfRoomTokenForMarketRouter);

        const walletRoomBalance = await getWalletBalanceOfContract(accountContext.account, 'room');
        setWalletRoomBalance(walletRoomBalance);
    };

    const loadWalletData = async () => {
        loadWalletBalanceOfCollateralToken();
    };

    const handleChangeSelectedFile = (event) => {
        setCroppingImg(event.target.files[0]);
        setIsCropModalOpen(true);
    };

    const handleOnCrop = async (src) => {
        setValue("image", src, { shouldValidate: true });
        const imageUpload = await uploadMarketImage(src);

    } ;

    const approveStableCoin = async () => {
        setIsCreatingMarket(true);
        const marketApis = new MarketAPIs();
        await marketApis.approveCollateralTokenForMarketRouter(accountContext.account);
        loadWalletData();
        setIsCreatingMarket(false);
        return;
    };

    const approveRoomToken = async () => {
        setIsCreatingMarket(true);
        const marketApis = new MarketAPIs();
        await marketApis.approveRoomTokenForMarketRouter(accountContext.account);
        loadWalletData();
        setIsCreatingMarket(false);
        return;
    };

    const handleCreateMarket = async (data) => {
        if(parseFloat(fromWei(walletRoomBalance)) < parseFloat(fromWei(marketCreationFees))) {
            swal(
                "Insufficient funds",
                `You must hold at least ${fromWei(marketCreationFees)} ROOM Tokens to create the market`,
                "error"
            );
            return;
        }

        try {
            setIsCreatingMarket(true);

            await handleLogin();
            const marketApis = new MarketAPIs();
            const imageUpload = await uploadMarketImage(data.image);

            const resolveTimestamp = data.endDate.clone().add(24, 'hours').unix();
            const collateralTokenAddress = getContractAddress('usdt');
            const sources = data.sources.map((entry) => entry.name);

            //wallet, category, description, endTimestamp, resolveTimestamp, collateralTokenAddress, initialLiquidity, image, sources, title
            const createdMarket = await createMarket(
                accountContext.account,
                {
                    id: data.category.value,
                    title: data.category.label,
                },
                data.description.trim(),
                data.endDate.unix(),
                resolveTimestamp,
                collateralTokenAddress,
                data.liquidity,
                imageUpload,
                sources,
                data.title.trim()
            );

            //wallet, question, marketMetadatasID, participationEndTime, resolvingEndTime, collateralTokenAddress, initialLiquidity, resolveResources
            const newMarketContract = await marketApis.createMarket(
                accountContext.account,
                data.title.trim(),
                createdMarket.id,
                data.endDate.unix(),
                resolveTimestamp,
                collateralTokenAddress,
                toWei(data.liquidity),
                JSON.stringify(sources)
            );

            //Redirect to market page after creation
            history.push(`/markets/${createdMarket.id}`);
        } catch (e) {
            console.log("Something went wrong!", e);
        } finally {
            setIsCreatingMarket(false);
        }
    };

    const handleLogin = async () => {
        const message = "OptionRoom login";
        const sign = await walletHelperInsatnce.signWallet(message);
        const token = await createAuthOnFirebase(accountContext.account, message, sign);
        const userDetails = await signInUserWithToken(token);
    };

    const handleLogout = async () => {
        signoutUser();
    };

    useEffect(() => {
        const init = async () => {
            if (accountContext.account) {
                const marketApis = new MarketAPIs();
                const marketCreationFees = await marketApis.getMarketCreationFees(accountContext.account);
                setMarketCreationFees(marketCreationFees);

                loadWalletData();
                setIsLoading(true);
                //const isWalletWhitelistedForBetaRes = await getIfWalletIsWhitelistedForBeta(accountContext.account);
                //setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);
                setIsLoading(false);
            }
        };

        if(accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
            init();
        }
    }, [accountContext.account, accountContext.chainId]);

    const renderCreateBtn = () => {
        if (walletAllowanceOfCollateralTokenForMarketRouter <= 0) {
            return (
                <Button size={'large'}
                        role={'button'}
                        onClick={approveStableCoin}
                        isProcessing={isCreatingMarket}
                        color={'primary'}
                        fullWidth={true}>Approve BUSD</Button>
            )
        }

        if (walletAllowanceOfRoomTokenForMarketRouter <= 0) {
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

    if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
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

    if(!isWalletWhitelistedForBeta) {
        return (
            <NotWhitelisted/>
        )
    }

/*    const formButtons = [];

    if(walletAllowanceOfCollateralTokenForMarketRouter <= 0) {
        formButtons.push((
            <Button size={'large'}
                    isProcessing={isCreatingMarket}
                    color={'primary'}
                    type={'submit'}
                    fullWidth={true}>Approve</Button>
        ));
    }

    formButtons.push((
        <Button size={'large'}
                isProcessing={isCreatingMarket}
                color={'primary'}
                type={'submit'}
                fullWidth={true}>Create</Button>
    ));*/

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
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
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
                                    </Grid>
                                    <Grid item xs={6}>
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
                                                        value={getValues('endDate') || moment().add(1, 'days')}
                                                        onChange={(e) => {
                                                            setValue("endDate", e, { shouldValidate: true });
                                                        }}
                                                        minDate={moment().add(1, 'days')}
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
                                    </Grid>
                                </Grid>
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
                                    className={`${classes.CreateMarket__Field} ${classes.CreateMarket__FieldSources}`}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        References/Sources <span
                                        className={classes.CreateMarket__FieldTitleRequired}>*</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <div className={classes.CreateMarket__Sources}>
                                            {sourceFields.map((entry, index) => {
                                                return (
                                                    <>
                                                        <div key={`Source-${index}`}>
                                                            <input type={'text'}
                                                                   key={entry.id}
                                                                   {...register(`sources.${index}.name`)}/>
                                                            {
                                                                index === 0 ? (
                                                                    <Button size={'medium'}
                                                                            color={'black'}
                                                                            onClick={() => {
                                                                                appendSource({
                                                                                    name: ""
                                                                                });
                                                                            }}>
                                                                        <AddIcon
                                                                            className={
                                                                                classes.EarnCard__Action__Btn_Add__Icon
                                                                            }
                                                                        ></AddIcon>
                                                                    </Button>
                                                                ) : (
                                                                    <Button size={'medium'}
                                                                            color={'red'}
                                                                            onClick={() => {
                                                                                removeSource(index);
                                                                            }}>
                                                                        <DeleteIcon
                                                                            className={
                                                                                classes.RemoveSourceIcon
                                                                            }
                                                                        ></DeleteIcon>
                                                                    </Button>
                                                                )
                                                            }
                                                        </div>
                                                        {
                                                            get(errors, ['sources', index, 'name', 'message']) && (
                                                                <div key={`Source2-${index}`}
                                                                     className={classes.CreateMarket__FieldBodyFieldError}>
                                                                    {get(errors, ['sources', index, 'name', 'message'])}

                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                );
                                            })}
                                        </div>
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
                                            className={classes.CreateMarket__FieldTitle__helper}>(available {fromWei(walletBalanceOfCollateralToken)})</span>
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <TradeInput max={fromWei(walletBalanceOfCollateralToken)}
                                                    min={1000}
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
                        {
                            /**
                             <div className={`${classes.CreateMarketBox} ${classes.CreateMarketBoxInfo}`}>
                             <div>Info</div>
                             <div></div>
                             </div>
                             */
                        }
                        <div className={classes.CreateBtnWrap}>
                            {renderCreateBtn()}
                        </div>
                        <div className={classes.CreateNote}>Creating a market costs {fromWei(marketCreationFees)} ROOM, your ROOM balance is: {fromWei(walletRoomBalance, null, 2)}</div>
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
