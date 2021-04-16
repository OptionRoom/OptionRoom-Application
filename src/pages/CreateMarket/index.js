import {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import Select from 'react-select'
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {get, isEmpty} from "lodash";
import { useHistory } from "react-router-dom";

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
import {getMarketCategories, uploadMarketImage, createMarket} from "../../shared/firestore.service";

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
    const [isCreatingMarket, setIsCreatingMarket] = useState(false);
    const [formDataErrors, setFormDataErrors] = useState({});
    const [marketCategories, setMarketCategories] = useState([]);
    const [selectedMarketImage, setSelectedMarketImage] = useState(null);
    const history = useHistory();

    useEffect(() => {

    }, [accountContext.account]);

    const handleFormDataChange = (fieldKey, fieldValue) => {
        const newFormData = {...formData};
        newFormData[fieldKey] = fieldValue;

        console.log("newFormData", newFormData);
        setFormData(newFormData);
    };

    const handleAddNewSource = () => {
        const newSource = get(formData, ['newSource']);
        if (!newSource) {
            return;
        }

        const newFormData = {...formData};
        newFormData['sources'] = newFormData['sources'] || [];
        newFormData['sources'].push(newSource);

        console.log("newFormData", newFormData);
        setFormData(newFormData);
    };

    const handleRemoveSource = (entryIndex) => {
        const newFormData = {...formData};
        newFormData['sources'].splice(entryIndex, 1)
        console.log("newFormData", newFormData);
        setFormData(newFormData);
    };

    const handleChangeSelectedFile = (event) => {
        setSelectedMarketImage(event.target.files[0]);
    };

    const handleCreateMarket = async () => {
        const errors = {};
        if (!get(formData, ['title'])) {
            errors.title = "Title is required";
        }

        if (!get(formData, ['category'])) {
            errors.category = "Category is required";
        }

        if (!get(formData, ['endDate'])) {
            errors.endDate = "End date is required";
        }

        if (!get(formData, ['description'])) {
            errors.description = "Description is required";
        }

        if (!get(formData, ['sources']) || get(formData, ['sources']).length === 0) {
            errors.sources = "Sources is required";
        }

        if (!selectedMarketImage) {
            errors.image = "Image is required";
        }

        console.log("errors", errors);
        setFormDataErrors(errors);

        if (!isEmpty(errors)) {
            return;
        }

        setIsCreatingMarket(true);
        const imageUpload = await uploadMarketImage(selectedMarketImage);
        const createdMarket = await createMarket(
            accountContext.account,
            {
                id: get(formData, ['category', 'value']),
                title: get(formData, ['category', 'label']),
            },
            get(formData, ['description']),
            get(formData, ['endDate']).unix(),
            imageUpload,
            get(formData, ['sources']),
            get(formData, ['title'])
        );

        setIsCreatingMarket(false);
        console.log("imageUpload", imageUpload);
        console.log("createdMarket", createdMarket);
        console.log("createdMarket", createdMarket.id);
        //Redirect to market page after creation
        history.push(`/markets/${createdMarket.id}`);
    };

    useEffect(() => {
        const init = async () => {
            const cats = await getMarketCategories();
            console.log("cats", cats);
            setMarketCategories(cats);
        };

        init();
    }, [accountContext.account]);

    return (
        <>
            <Navbar
                title={"Create a market"}
                details={
                    "Fill in details and have your market ready"
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
                                        {get(formDataErrors, ['title']) && (
                                            <div className={classes.CreateMarket__FieldBodyFieldError}>
                                                {get(formDataErrors, ['title'])}
                                            </div>
                                        )}
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
                                                        options={marketCategories.map((entry) => {
                                                            return {value: entry.id, label: entry.title};
                                                        })}
                                                        classNamePrefix={'CreateMarket__CategoryField'}/>
                                                {get(formDataErrors, ['category']) && (
                                                    <div className={classes.CreateMarket__FieldBodyFieldError}>
                                                        {get(formDataErrors, ['category'])}
                                                    </div>
                                                )}
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
                                                {get(formDataErrors, ['endDate']) && (
                                                    <div className={classes.CreateMarket__FieldBodyFieldError}>
                                                        {get(formDataErrors, ['endDate'])}
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
                                        Rules / Description
                                    </div>
                                    <div className={classes.CreateMarket__FieldBody}>
                                        <textarea value={get(formData, ['description'])}
                                                  onChange={(e) => {
                                                      handleFormDataChange('description', e.target.value);
                                                  }}/>
                                        {get(formDataErrors, ['description']) && (
                                            <div className={classes.CreateMarket__FieldBodyFieldError}>
                                                {get(formDataErrors, ['description'])}
                                            </div>
                                        )}
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
                                               value={get(formData, ['newSource'])}
                                               onChange={(e) => {
                                                   handleFormDataChange('newSource', e.target.value);
                                               }}/>
                                        <Button size={'medium'}
                                                color={'black'}
                                                onClick={handleAddNewSource}>
                                            <AddIcon
                                                className={
                                                    classes.EarnCard__Action__Btn_Add__Icon
                                                }
                                            ></AddIcon>
                                        </Button>
                                    </div>
                                    {(get(formData, ['sources']) && get(formData, ['sources']).length > 0) && (
                                        <div className={classes.CreateMarket__Sources}>
                                            {get(formData, ['sources']).map((entry, index) => {
                                                return (
                                                    <div key={`Source-${index}`}>
                                                        <span>{entry}</span>
                                                        <span>
                                                            <DeleteIcon
                                                                onClick={() => handleRemoveSource(index)}
                                                                className={
                                                                    classes.RemoveSourceIcon
                                                                }
                                                            ></DeleteIcon>
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {get(formDataErrors, ['sources']) && (
                                        <div className={classes.CreateMarket__FieldBodyFieldError}>
                                            {get(formDataErrors, ['sources'])}
                                        </div>
                                    )}
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
                                        {
                                            !selectedMarketImage && (
                                                <div className={classes.CreateMarket__FieldBodyImgEmpty}>
                                                    <div>PNG or JPG: 180x180 pixels</div>
                                                    <Button size={'medium'}
                                                            component="label"
                                                            color={'primary'}>
                                                        <input accept="image/*"
                                                               hidden={true}
                                                               onChange={handleChangeSelectedFile}
                                                               type="file"/>
                                                        Upload</Button>
                                                </div>
                                            )
                                        }
                                        {
                                            selectedMarketImage && (
                                                <div className={classes.CreateMarket__FieldBodySelected}>
                                                    <div className={classes.MarketImgFileWrap}>
                                                        <img className={classes.MarketImgFileWrap__Img}
                                                             src={URL.createObjectURL(selectedMarketImage)}/>
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
                                    {get(formDataErrors, ['image']) && (
                                        <div className={classes.CreateMarket__FieldBodyFieldError}>
                                            {get(formDataErrors, ['image'])}
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
                            <Button size={'large'}
                                    isProcessing={isCreatingMarket}
                                    color={'primary'}
                                    onClick={handleCreateMarket}
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
