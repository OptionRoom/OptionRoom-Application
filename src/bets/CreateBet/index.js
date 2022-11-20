import React, {useState, useContext, useEffect} from "react";

import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Joi from "joi";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useForm, useFieldArray} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import ChainAlert from "../../components/ChainAlert";
import OrSelect from "./../../components/OrSelect";
import ConnectButton from "../../components/ConnectButton";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";
import {useCreateBet} from '../apis';
import {
    useGetIsChainSupported,
    useGetMarketCategories,
} from "../../shared/hooks";
import {
    ChainNetworks,
    GovernanceTypes,
} from "../../shared/constants";
import RepeaterField from "../../components/RepeaterField";

const choicesFieldName = "choices";
const supportedChains = [
    ChainNetworks.BINANCE_SMART_CHAIN_TESTNET,
    ChainNetworks.LOCAL_CHAIN,
    ChainNetworks.BINANCE_SMART_CHAIN,
];

function CreateBet() {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const isChainSupported = useGetIsChainSupported(supportedChains);
    const createBet = useCreateBet();
    const [isLoading] = useState(false);
    const marketCategories = useGetMarketCategories(
        GovernanceTypes.MARKET,
        accountContext.account
    );

    const {
        control,
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            [`${choicesFieldName}`]: [{value: "Choice 1"}, {value: "Choice 2"}],
            ["categories"]: [],
        },
        resolver: joiResolver(
            Joi.object({
                title: Joi.string()
                    .trim()
                    .min(10)
                    .max(100)
                    .required()
                    .label("Title"),
                description: Joi.string()
                    .trim()
                    .min(100)
                    .max(4000)
                    .required()
                    .label("Description"),
                [choicesFieldName]: Joi.array()
                    .min(2)
                    .items(
                        Joi.object().keys({
                            value: Joi.string().label("Choice").required(),
                        })
                    ),
                categories:
                    Joi.array()
                        .label("Categories")
                        .items(
                            Joi.object({
                                value: Joi.number().required(),
                                label: Joi.string().label("Choice").required(),
                            })
                        ).min(1).required(),
                startDate: Joi.any().required().label("Start date"),
                endDate: Joi.any().required().label("End date"),
            })
        ),
    });

    const choicesFieldArray = useFieldArray({
        control,
        name: choicesFieldName,
    });

    const handleCreateMarket = async (data) => {
        try {
            await createBet.mutateAsync({
                starBetTime: data.startDate.unix(),
                endBetTime: data.endDate.unix(),
                resolveTime: data.endDate.clone().add(1, 'days').unix(),
                title: data.title,
                description: data.description,
                choices: data.choices.map(e => e.value),
                categories: data.categories.map(e => e.value),
                baseToken: '0x51A4B023681Ac5D2C346efB2b8Eb4D250729c329'
            });
        } catch (e) {
            console.log(e);
        }
    };

    const renderCreateBtn = () => {
        return (
            <Button
                size={"large"}
                isProcessing={createBet.isLoading}
                color={"primary"}
                type={"submit"}
                fullWidth={true}
            >
                Create
            </Button>
        );
    };

    if (!isChainSupported) {
        return <ChainAlert/>;
    }

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <>
            <div className={classes.CreateMarketPage}>
                <Navbar
                    title={"Create a bet"}
                    details={"Fill in details and have your bet ready"}
                />
                <div className={classes.CreateMarketPage__Main}>
                    <form
                        noValidate
                        onSubmit={handleSubmit(handleCreateMarket)}
                    >
                        <div className={classes.CreateMarketBox}>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldTitle
                                        }
                                    >
                                        Title{" "}
                                        <span
                                            className={
                                                classes.CreateMarket__FieldTitleRequired
                                            }
                                        >
                                            *
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldBody
                                        }
                                    >
                                        <input {...register("title")} />
                                        {errors.title?.message && (
                                            <div
                                                className={
                                                    classes.CreateMarket__FieldBodyFieldError
                                                }
                                            >
                                                {errors.title?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldTitle
                                        }
                                    >
                                        Categories{" "}
                                        <span
                                            className={
                                                classes.CreateMarket__FieldTitleRequired
                                            }
                                        >
                                            *
                                        </span>
                                    </div>
                                    <div
                                        className={`${classes.CreateMarket__FieldBody} ${classes.CreateMarket__CategoryField}`}
                                    >
                                        <OrSelect
                                            onChange={(e) => {
                                                setValue("categories", e, {
                                                    shouldValidate: true,
                                                });
                                            }}
                                            isMulti={true}
                                            options={marketCategories.map(
                                                (entry) => {
                                                    return {
                                                        value: entry.id,
                                                        label: entry.title,
                                                    };
                                                }
                                            )}
                                        />
                                        {errors.categories?.message && (
                                            <div
                                                className={
                                                    classes.CreateMarket__FieldBodyFieldError
                                                }
                                            >
                                                {errors.categories?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldTitle
                                        }
                                    >
                                        Start Date{" "}
                                        <span
                                            className={
                                                classes.CreateMarket__FieldTitleRequired
                                            }
                                        >
                                            *
                                        </span>
                                    </div>
                                    <div
                                        className={`${classes.CreateMarket__FieldBody} ${classes.DateTimePickerField}`}
                                    >
                                        <MuiPickersUtilsProvider
                                            utils={MomentUtils}
                                        >
                                            <DateTimePicker
                                                format="yyyy/MM/DD hh:mm a"
                                                variant="inline"
                                                value={
                                                    getValues("startDate") ||
                                                    moment().add(3, "days")
                                                }
                                                onChange={(e) => {
                                                    setValue("startDate", e, {
                                                        shouldValidate: true,
                                                    });
                                                }}
                                                minDate={moment().add(
                                                    3,
                                                    "days"
                                                )}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {errors.startDate?.message && (
                                            <div
                                                className={
                                                    classes.CreateMarket__FieldBodyFieldError
                                                }
                                            >
                                                {errors.startDate?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldTitle
                                        }
                                    >
                                        End Date{" "}
                                        <span
                                            className={
                                                classes.CreateMarket__FieldTitleRequired
                                            }
                                        >
                                            *
                                        </span>
                                    </div>
                                    <div
                                        className={`${classes.CreateMarket__FieldBody} ${classes.DateTimePickerField}`}
                                    >
                                        <MuiPickersUtilsProvider
                                            utils={MomentUtils}
                                        >
                                            <DateTimePicker
                                                format="yyyy/MM/DD hh:mm a"
                                                variant="inline"
                                                value={
                                                    getValues("endDate") ||
                                                    moment().add(6, "days")
                                                }
                                                onChange={(e) => {
                                                    setValue("endDate", e, {
                                                        shouldValidate: true,
                                                    });
                                                }}
                                                minDate={moment().add(
                                                    3,
                                                    "days"
                                                )}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {errors.endDate?.message && (
                                            <div
                                                className={
                                                    classes.CreateMarket__FieldBodyFieldError
                                                }
                                            >
                                                {errors.endDate?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div
                                    className={`${classes.CreateMarket__Field}`}
                                >
                                    <div
                                        className={
                                            classes.CreateMarket__FieldTitle
                                        }
                                    >
                                        Choices{" "}
                                        <span
                                            className={
                                                classes.CreateMarket__FieldTitleRequired
                                            }
                                        >
                                            *
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldBody
                                        }
                                    >
                                        <RepeaterField
                                            fieldArray={choicesFieldArray}
                                            fieldName={choicesFieldName}
                                            errors={errors}
                                            minEntries={2}
                                            register={register}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldTitle
                                        }
                                    >
                                        Rules / Description{" "}
                                        <span
                                            className={
                                                classes.CreateMarket__FieldTitleRequired
                                            }
                                        >
                                            *
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            classes.CreateMarket__FieldBody
                                        }
                                    >
                                        <textarea
                                            {...register("description")}
                                        />
                                        {errors.description?.message && (
                                            <div
                                                className={
                                                    classes.CreateMarket__FieldBodyFieldError
                                                }
                                            >
                                                {errors.description?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.CreateBtnWrap}>
                            {renderCreateBtn()}
                        </div>
                        <div className={classes.CreateNote}>
                            Creating a bet is free
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateBet;
