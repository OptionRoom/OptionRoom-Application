import {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Select from 'react-select'
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import {get} from "lodash";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import MarketCard from "../../components/MarketCard";
import {useStyles} from "./styles";

import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";

const walletHelperInsatnce = walletHelper();

const getNumberFromBigNumber = (bigNumber) => {
    return fromWei(bigNumber, "ether", 2);
};

const getBigNumberFromNumber = (number) => {
    return toWei(number, "ether");
};
const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
]

function CreateMarket() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));
    const classes = useStyles();
    const [formData, setFormData] = useState({});

    useEffect(() => {

    }, [accountContext.account]);

    const handleFormDataChange = (fieldKey, fieldValue) => {
        const newFormData = {...formData};
        newFormData[fieldKey] = fieldValue;

        console.log("newFormData", newFormData);
        setFormData(newFormData);
    };

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

    return (
        <>
            <Navbar
                title={"Create a market"}
                details={
                    "Earn COURT tokens by providing liquidity to one of the pools on this page."
                }
            />
            <div className={classes.CreateMarketPage}>
                {accountContext.account && (
                    <div className={classes.CreateMarketPage__Main}>

                        <div className={classes.CreateMarketBox}>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Market Question
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <input type={'text'}
                                               value={get(formData, ['title'])}
                                               onChange={(e) => {
                                                   handleFormDataChange('title', e.target.value);
                                               }}/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <div className={classes.CreateMarket__Field}>
                                            <div className={classes.CreateMarket__FieldTitle}>Category
                                            </div>
                                            <div
                                                className={`${classes.CreateMarket__FieldBody} ${classes.CreateMarket__CategoryField}`}>
                                                <Select onChange={(e) => {
                                                            handleFormDataChange('category', e);
                                                        }}
                                                        options={options}
                                                        classNamePrefix={'CreateMarket__CategoryField'}/>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.CreateMarket__Field}>
                                            <div className={classes.CreateMarket__FieldTitle}>End Date</div>
                                            <div
                                                className={`${classes.CreateMarket__FieldBody} ${classes.DateTimePickerField}`}>
                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                    <DateTimePicker
                                                        variant="inline"
                                                        value={get(formData, ['endDate'])}
                                                        onChange={(e) => {
                                                            handleFormDataChange('endDate', e);
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Rules / Description
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <textarea value={get(formData, ['description'])}
                                                  onChange={(e) => {
                                                      handleFormDataChange('description', e.target.value);
                                                  }}/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div
                                    className={`${classes.CreateMarket__Field} ${classes.CreateMarket__FieldSources}`}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        References/Sources
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <input type={'text'}
                                               value={get(formData, ['sources'])}
                                               onChange={(e) => {
                                                   handleFormDataChange('sources', e.target.value);
                                               }}/>
                                        <Button size={'medium'}
                                                color={'black'}>
                                            <AddIcon
                                                className={
                                                    classes.EarnCard__Action__Btn_Add__Icon
                                                }
                                            ></AddIcon>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Liquidity
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <input type={'text'}
                                               className={classes.CreateMarket__LiquidityInput}
                                               value={get(formData, ['liquidity'])}
                                               onChange={(e) => {
                                                   handleFormDataChange('liquidity', e.target.value);
                                               }}/>
                                        <div className={classes.CreateMarket__FieldAddon}>
                                            <div className={classes.Liquidity__MaxBtn}>Max</div>
                                            <Button className={classes.Liquidity__AddBtn}
                                                    size={'medium'}
                                                    color={'primary'}>Add</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.CreateMarket__Section}>
                                <div className={classes.CreateMarket__Field}>
                                    <div className={classes.CreateMarket__FieldTitle}>
                                        Image
                                    </div>
                                    <div className={classes.CreateMarket__FieldBodyImg}>
                                        <div>PNG or JPG: 180x180 pixels</div>
                                        <Button size={'medium'}
                                                color={'primary'}>Upload</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${classes.CreateMarketBox} ${classes.CreateMarketBoxInfo}`}>
                            <div>Info</div>
                            <div>This is a market on if Donald Trump will be President of the United States on March
                                31, 2021, 12pm EST. This market will resolve to “Yes“ if, on the resolution date,
                                Donald Trump is the current President of the substantiated More
                            </div>
                        </div>
                        <div className={classes.CreateBtnWrap}>
                            <Button size={'large'}
                                    color={'primary'}
                                    fullWidth={true}>Create</Button>
                        </div>

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

export default CreateMarket;
