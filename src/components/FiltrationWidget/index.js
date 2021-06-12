import React, {useState} from "react";
import Select from "react-select";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {get} from 'lodash';
import clsx from "clsx";
import { withStyles } from '@material-ui/core/styles';
import {SearchIcon} from "../../shared/icons";

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import {useStyles} from "./styles";
import {useGetMarketCategories} from '../../shared/hooks';
import {marketStatesDisplay} from '../../shared/constants';
import OrSwitch from '../../components/OrSwitch';
import OrSelect from "../OrSelect";

function FiltrationWidget(props) {

    const classes = useStyles();
    const {filterDetails} = props;

    const marketCategories = useGetMarketCategories();

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

    return (
        <div className={classes.FiltrationWidget}>
            <div className={classes.CloseWrap}>
                <span onClick={props.onClose}>Close</span>
            </div>
            <div className={classes.SearchSection}>
                <div className={classes.SearchInput}>
                    <input placeholder={'Search markets'}
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
            <div className={classes.SectionShow}>
                <div className={classes.SectionShow__Title}>
                    Show
                </div>
                <div className={classes.SectionShow__Actions}>
                    <div>Traded only</div>
                    <OrSwitch
                            color="primary" onChange={()=>{}} name="checkedA" />
                </div>
            </div>
            <div className={classes.SectionSort}>
                <div className={classes.SectionSort__Title}>
                    Sort by
                </div>
                <div className={classes.SectionSort__Actions}>
                    <div className={classes.SortBlocks}>
                        {
                            ["Volume", "Created"].map((entry) => {
                                return (
                                    <div className={clsx(classes.SortBlock, {
                                        [classes.SortBlock__IsActive]: get(filterDetails, ['sort', 'by']) === entry.toLowerCase(),
                                    })}
                                         onClick={() => handleSort(entry.toLowerCase())}>
                                        <span>{entry}</span>
                                        {
                                            get(filterDetails, ['sort', 'by']) === entry.toLowerCase() && (
                                                <>
                                                    {
                                                        get(filterDetails, ['sort', 'direction']) === 'down' ? (
                                                            <ArrowDownwardIcon className={classes.SortBlock__Icon}/>
                                                        ) : (
                                                            <ArrowUpwardIcon className={classes.SortBlock__Icon}/>
                                                        )
                                                    }
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
{/*                     <div className={classes.FiltersBlock}>
                        <div className={classes.FiltersBlock__Title}>Category</div>
                        <div className={classes.FiltersBlock__Entries}>
                            <input placeholder={'Search markets'}
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
                    </div> */}
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
                                    [
                                        {
                                            title: 'All',
                                            id: "all"
                                        },
                                        ...marketCategories
                                    ].map((entry) => {
                                    return {
                                        value: entry.id,
                                        label: entry.title
                                    };
                                })}/>
{/*                            {
                                [
                                    {
                                        title: 'All',
                                        id: "all"
                                    },
                                    ...marketCategories
                                ].map((entry) => {
                                    return (
                                        <div className={clsx(classes.CheckInput, {
                                                [classes.CheckInput__IsActive]: get(filterDetails, ['category', 'id']) === entry.id,
                                            })}
                                            onClick={()=> {
                                                props.onFilterUpdate && props.onFilterUpdate({
                                                    ...filterDetails,
                                                    category: entry
                                                })
                                            }}
                                             key={`category-${entry.id}`}>
                                            <div className={classes.CheckInput__Indicator}></div>
                                            <div className={classes.CheckInput__Title}>{entry.title}</div>
                                        </div>
                                    )
                                })
                            }*/}
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
                              options={marketStatesDisplay.map((entry) => {
                                  return {
                                      value: entry.id,
                                      label: entry.title
                                  };
                              })}/>
{/*                            {
                               [
                                   {
                                       id: 'all',
                                       title: 'All'
                                   },
                                   ...marketStatesDisplay
                               ].map((entry) => {
                                    return (
                                        <div key={`state-${entry.id}`}
                                            onClick={()=> {
                                                props.onFilterUpdate && props.onFilterUpdate({
                                                    ...filterDetails,
                                                    state: entry
                                                })
                                            }}
                                            className={clsx(classes.CheckInput, {
                                                [classes.CheckInput__IsActive]: get(filterDetails, ['state', 'id']) === entry.id,
                                            })}>
                                            <div className={classes.CheckInput__Indicator}></div>
                                            <div className={classes.CheckInput__Title}>{entry.title}</div>
                                        </div>
                                    )
                                })
                            }*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiltrationWidget;
