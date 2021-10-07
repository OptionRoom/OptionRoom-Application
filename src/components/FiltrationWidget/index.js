import React, {useContext, useState} from "react";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {get} from 'lodash';
import clsx from "clsx";
import {SearchIcon} from "../../shared/icons";


import {useStyles} from "./styles";
import {useGetMarketCategories} from '../../shared/hooks';
import {marketStatesDisplay, GovernanceTypes, FiltrationWidgetTypes} from '../../shared/constants';
import OrSwitch from '../../components/OrSwitch';
import OrSelect from "../OrSelect";
import {AccountContext} from "../../shared/AccountContextProvider";

function FiltrationWidget(props) {

    const classes = useStyles();
    const {
        filterDetails,
        type
    } = props;
    const accountContext = useContext(AccountContext);

    const marketCategories = useGetMarketCategories(get(filterDetails, ['type', 'id']), accountContext.account);

    const handleSort = (entry) => {
        if (get(filterDetails, ['sort', 'by']) === entry) {
            props.onFilterUpdate && props.onFilterUpdate({
                ...props.filterDetails,
                sort: {
                    by: entry,
                    direction: get(filterDetails, ['sort', 'direction']) === 'down' ? 'up' : 'down'
                }
            });

            return;
        }

        props.onFilterUpdate && props.onFilterUpdate({
            ...props.filterDetails,
            sort: {
                by: entry,
                direction: 'down'
            }
        });
    };

    const getCategoriesOptions = () => {
        if(FiltrationWidgetTypes.MARKETS === type || (get(filterDetails, ['type', 'id']) === GovernanceTypes.MARKET)) {
            return [
                {
                    title: 'All',
                    id: "all"
                },
                ...marketCategories
            ];
        }

        return marketCategories ? [
            {
                title: 'All',
                id: "all"
            },
            ...marketCategories.map((entry) => {
                return {
                    title: entry,
                    id: entry
                };
            })
        ] : [];
    };

    const getSortOptions = ()=> {
        if(FiltrationWidgetTypes.MARKETS === type) {
            return ["Volume", "Created"];
        }

        if(type === GovernanceTypes.ORACLE) {
            return ["Posted", "Ends"];
        }
    }

    const getStateOptions = ()=> {
        if(FiltrationWidgetTypes.MARKETS === type) {
            return marketStatesDisplay.filter(entry => entry.showInMarketsFilterWidget).map((entry) => {
                return {
                    value: entry.id,
                    label: entry.title
                };
            });
        }

        if(get(filterDetails, ['type', 'id']) === GovernanceTypes.MARKET) {
            return marketStatesDisplay.filter(entry => entry.showInGovernanceFilterWidget).map((entry) => {
                return {
                    value: entry.id,
                    label: entry.title
                };
            });
        }

        return [
            {
                value: 'all',
                label: 'All',
            },
            {
                value: 'active',
                label: 'Active'
            },
            {
                value: 'ended',
                label: 'Ended'
            }
        ];
    }

    return (
        <div className={classes.FiltrationWidget}>
            <div className={classes.CloseWrap}>
                <span onClick={props.onClose}>Close</span>
            </div>
            <div className={classes.SearchSection}>
                <div className={classes.SearchInput}>
                    <input placeholder={type === GovernanceTypes.ORACLE ? 'Search proposals' : 'Search markets'}
                            className={classes.MarketNameInput}
                            value={get(filterDetails, 'name')}
                            onChange={(e) => {
                                props.onFilterUpdate && props.onFilterUpdate({
                                    ...filterDetails,
                                    name: e.target.value
                                })
                            }}
                            type={'text'}/>
                    <SearchIcon className={classes.SearchIcon}/>
                </div>
            </div>
            {
                type == FiltrationWidgetTypes.MARKETS && (
                    <div className={classes.SectionShow}>
                        <div className={classes.SectionShow__Title}>
                            Show
                        </div>
                        <div className={classes.SectionShow__Actions}>
                            <div>Traded only</div>
                            <OrSwitch value={get(filterDetails, ['tradedOnly'])}
                                      color="primary"
                                      onChange={(value, value1)=> {
                                          props.onFilterUpdate && props.onFilterUpdate({
                                              ...filterDetails,
                                              tradedOnly:  value1
                                          });
                                      }}
                                      name="checkedA" />
                        </div>
                    </div>
                )
            }
            <div className={classes.SectionSort}>
                <div className={classes.SectionSort__Title}>
                    Sort by
                </div>
                <div className={classes.SectionSort__Actions}>
                    <div className={classes.SortBlocks}>
                        {
                            getSortOptions().map((entry) => {
                                return (
                                    <div className={clsx(classes.SortBlock, {
                                        [classes.SortBlock__IsActive]: get(filterDetails, ['sort', 'by']) === entry.toLowerCase(),
                                    })}
                                         onClick={() => handleSort(entry.toLowerCase())}>
                                        <span>{entry}</span>
                                        {
                                            get(filterDetails, ['sort', 'by']) === entry.toLowerCase() && (
                                                <>
                                                    <ArrowDownwardIcon className={clsx(classes.SortBlock__Icon, {
                                                                [classes.SortBlock__IconUp]: get(filterDetails, ['sort', 'direction']) === 'up',
                                                            })}/>
                                                </>
                                            )
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={classes.SectionFilters}>
                <div className={classes.SectionFilters__Title}>
                    Filters
                </div>
                <div className={classes.SectionShow__Body}>
                    {
                        [FiltrationWidgetTypes.GOVERNANCE].indexOf(type) > -1 && (
                            <div className={classes.FiltersBlock}>
                                <div className={classes.FiltersBlock__Title}>Type</div>
                                <div className={classes.FiltersBlock__Entries}>
                                    <OrSelect
                                        value={{
                                            value: get(filterDetails, ['type']).id,
                                            label: get(filterDetails, ['type']).title,
                                        }}
                                        onChange={(entry) => {
                                            props.onFilterUpdate && props.onFilterUpdate({
                                                ...filterDetails,
                                                type: {
                                                    title: entry.label,
                                                    id: entry.value
                                                }
                                            });
                                        }}
                                        options={[
                                            {
                                                value: GovernanceTypes.MARKET,
                                                label: 'Markets'
                                            },
                                            {
                                                value: GovernanceTypes.ORACLE,
                                                label: 'Oracle'
                                            }
                                        ]}/>
                                </div>
                            </div>
                        )
                    }
                    <div className={classes.FiltersBlock}>
                        <div className={classes.FiltersBlock__Title}>Category</div>
                        <div className={classes.FiltersBlock__Entries}>
                            <OrSelect
                                value={{
                                    value: get(filterDetails, ['category']).id,
                                    label: get(filterDetails, ['category']).title,
                                }}
                                onChange={(entry) => {
                                    props.onFilterUpdate && props.onFilterUpdate({
                                        ...filterDetails,
                                        category: {
                                            title: entry.label,
                                            id: entry.value
                                        }
                                    });
                                }}
                                options={
                                    getCategoriesOptions()
                                        .map((entry) => {
                                    return {
                                        value: entry.id,
                                        label: entry.title
                                    };
                                })}/>
                        </div>
                    </div>
                    <div className={classes.FiltersBlock}>
                        <div className={classes.FiltersBlock__Title}>State</div>
                        <div className={classes.FiltersBlock__Entries}>
                            <OrSelect
                                value={{
                                    value: get(filterDetails, ['state']).id,
                                    label: get(filterDetails, ['state']).title,
                                }}
                             onChange={(entry) => {
                                props.onFilterUpdate && props.onFilterUpdate({
                                    ...filterDetails,
                                    state: {
                                        title: entry.label,
                                        id: entry.value
                                    }
                                });
                            }}
                                menuPlacement={'top'}
                              options={getStateOptions()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiltrationWidget;
