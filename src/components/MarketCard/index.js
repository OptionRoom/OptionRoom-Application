import React, {useEffect} from 'react';
import clsx from "clsx";
import {get} from 'lodash';
import numeral from "numeral";
/*
import {useState, useContext} from 'react';
*/
import {
    Link,
} from "react-router-dom";
import {useStyles} from './styles'
import {AccountContext} from '../../shared/AccountContextProvider';

/*
import MarketAPIs from "../../shared/contracts/MarketAPIs";
*/
import {fromWei, truncateText} from "../../shared/helper";
import {marketStateColors, marketStates} from '../../shared/constants';
/*
import {useGetMarketTradeVolume} from "../../pages/Market/hooks";
*/

function MarketCard(props) {
/*
    const marketAPIs = new MarketAPIs();
*/

    const classes = useStyles();
    const {
        market
    } = props;
/*    const [pricesOfBuy, setPricesOfBuy] = useState(0);
    const [marketState, setMarketState] = useState(null);
    const [marketContractAddress, setMarketContractAddress] = useState(null);
    const accountContext = useContext(AccountContext);*/
    //const marketTradeVolume = useGetMarketTradeVolume(accountContext.account, marketContractAddress);

    const handleInit = async () => {
        //marketId, buyAmount, outcomeIndex
        /*const marketContractAddress = await marketAPIs.getMarketById(accountContext.account, get(market, ['id']));
        setMarketContractAddress(marketContractAddress);

        const pricesOfBuy = await marketAPIs.getPricesOfBuy(accountContext.account, marketContractAddress);
        setPricesOfBuy({
            'yes': pricesOfBuy.priceOfYes,
            'no': pricesOfBuy.priceOfNo,
        });*/

/*        const marketContractInState = await marketAPIs.getMarketState(accountContext.account, marketContractAddress);
        setMarketState(marketContractInState);*/
    };

    const getMarketStateText = () => {
        if (!get(props, ['market', 'state'])) {
            return null;
        }

        return marketStates[get(props, ['market', 'state', 'value'])];
    };

    const getMarketStateColor = () => {
        if (!get(props, ['market', 'state'])) {
            return null;
        }
        return marketStateColors[get(props, ['market', 'state', 'value'])];
    };


    useEffect(() => {
        handleInit();
    }, []);

/*    useEffect(() => {
        props.onMarketDataLoad && props.onMarketDataLoad({
            tradeVolume: marketTradeVolume,
            pricesOfBuy: pricesOfBuy,
            state: marketState,
            marketContractAddress: marketContractAddress,
            marketId: get(market, ['id']),
        });
    }, [marketContractAddress, marketTradeVolume, pricesOfBuy, marketState]);*/
    if(props.isListView) {
        return (
            <Link to={`/markets/${get(market, ['id'])}`}
                  className={clsx(classes.MarketCardList, {
                      [classes.MarketIsFeatured]: props.isFeatured,
                  })}>
                {
                    props.isFeatured && (
                        <div className={classes.MarketCardList__IsFeatured}>Featured</div>
                    )
                }
                <div className={classes.MarketCardList__Avatar} style={{
                    backgroundImage: `url(${get(market, ['image'])})`
                }}></div>
                {
                    [
                        {
                            title: "Name",
                            value: get(market, ['title']),
                            id: "name",
                        },
                        {
                            title: "Category",
                            value: get(market, ['category', 'title']),
                            id: "category",
                        },
                        {
                            title: "Volume",
                            value: numeral(get(props, ['market', 'volume']) || 0).format("$0,0.00"),
                            id: "volume",
                        },
                        {
                            title: "Yes",
                            value: numeral(get(props, ['market', 'priceOfBuy', 'yes']) || 0).format("$0,0.00"),
                            id: "option",
                        },
                        {
                            title: "No",
                            value: numeral(get(props, ['market', 'priceOfBuy', 'no']) || 0).format("$0,0.00"),
                            id: "option",
                        }
                    ].map((entry) => {
                        return (
                            <div className={classes.MarketCardList__Info}
                                 data-key={entry.id}>
                                <div className={classes.Info__Title}>
                                    {entry.title}
                                </div>
                                <div className={classes.Info__Val}>
                                    {entry.value}
                                </div>
                            </div>
                        )
                    })
                }
            </Link>
        )
    }

    return (
        <Link to={`/markets/${get(market, ['id'])}`}
              style={(
                  props.isFeatured ? {
                      backgroundImage: `url(${get(market, ['image'])})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                  }: null
              )}
/*              style={{
                  borderRight: `5px solid ${getMarketStateColor()}`
              }}*/

              className={clsx(classes.MarketCard, {
                  [classes.MarketIsFeatured]: props.isFeatured,
                  [classes.MarketIsListView]: props.isListView,
              })}>
            {
                !props.isFeatured && (
                    <div className={classes.smallAn}></div>
                )
            }
            <div className={classes.Header}>
                <div className={classes.Avatar} style={{
                    backgroundImage: `url(${get(market, ['image'])})`
                }}></div>
            </div>
            <div className={classes.ContentWrap}>
                {
                    props.isFeatured && (
                        <div className={classes.IsFeatured}>Featured</div>
                    )
                }
                <div className={classes.TitleBlock}>
                    <div className={classes.Cat}>
                        <div className={classes.Cat__Title}>Category</div>
                        <div className={classes.Cat__Val}>{get(market, ['category', 'title'])}</div>
                    </div>
                    <h1 className={classes.Title}>
                        <div className={classes.Title__Title}>Question</div>
                        <div className={classes.Title__Val}>{truncateText(get(market, ['title']), 60)}</div>
                    </h1>
                </div>
                <div className={classes.Details}>
                    <div className={classes.Volume}>
                        <div className={classes.Volume__Title}>Volume</div>
                        <div className={classes.Volume__Value}>{numeral(get(props, ['market', 'volume']) || 0).format("$0,0.00")}</div>
                    </div>
                    <div className={classes.Options}>
                        <div className={classes.Option}>
                            <div className={classes.Option__Title}>Yes</div>
                            <div
                                className={`${classes.Option__Value} ${classes.Option__ValueYes}`}>{numeral(get(props, ['market', 'priceOfBuy', 'yes']) || 0).format("$0,0.00")}</div>
                        </div>
                        <div className={classes.Option}>
                            <div className={classes.Option__Title}>No</div>
                            <div
                                className={`${classes.Option__Value} ${classes.Option__ValueNo}`}>{numeral(get(props, ['market', 'priceOfBuy', 'no']) || 0).format("$0,0.00")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MarketCard;
