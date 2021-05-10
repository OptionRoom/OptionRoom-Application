import React, {useState} from "react";
import Select from "react-select";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {get} from 'lodash';
import clsx from "clsx";
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import {useStyles} from "./styles";
import {useGetMarketCategories} from '../../../shared/hooks';
import {marketStatesDisplay} from '../../../shared/constants';
import SearchIcon from "@material-ui/icons/Search";

function MarketsFiltration(props) {

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
        <div className={classes.MarketsFiltration}>
            <div className={classes.SearchWrap}>
                <div className={classes.SearchLabel}>Search:</div>
                <div className={classes.MarketNameInputWrap}>
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
            <div className={classes.TradedOnlyWrap}>
                <div className={classes.TradedOnlyWrapLabel}>&nbsp;</div>
                <div className={classes.TradedOnlyWrap_Input}>
                    <Switch
                        color="primary" onChange={()=>{}} name="checkedA" />
                    <div>Traded only</div>
                </div>
            </div>
            <div className={classes.FilterActions}>
                <div className={classes.SearchLabel}>Filter By:</div>
                <div className={classes.SearchActions}>
                    <Select placeholder={'Category'}
                            isClearable={true}
                            onChange={(e) => {
                                props.onFilterUpdate && props.onFilterUpdate({
                                    ...filterDetails,
                                    category: e
                                })
                            }}
                            options={marketCategories.map((entry) => {
                                return {value: entry.id, label: entry.title};
                            })}
                            classNamePrefix={'MarketsFiltration__CategoryField'}/>
                    <Select isClearable={false}
                            value={get(props.filterDetails, 'state')}
                            onChange={(e) => {
                                props.onFilterUpdate && props.onFilterUpdate({
                                    ...filterDetails,
                                    state: e
                                })
                            }}
                            placeholder={'Status'}
                            options={Object.keys(marketStatesDisplay).map((entry) => {
                                return {
                                    value: entry,
                                    label: marketStatesDisplay[entry]
                                };
                            })}
                            classNamePrefix={'MarketsFiltration__StateField'}/>
                </div>
            </div>
            <div>
                <div className={classes.SearchLabel}>
                    Sort by:
                </div>
                <div className={classes.SearchActions}>
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
            <div className={classes.ViewActions}>
                <div className={classes.SearchLabel}>&nbsp;</div>
                <div className={classes.SearchActions}>
                    <ViewComfyIcon className={clsx({
                        [classes.View__IsActive]: get(props.filterDetails, 'view') === 'grid',
                    })}
                    onClick={() => {
                        props.onFilterUpdate && props.onFilterUpdate({
                            ...filterDetails,
                            view: 'grid'
                        })
                    }}/>
                    <FormatListBulletedIcon className={clsx({
                        [classes.View__IsActive]: get(props.filterDetails, 'view') === 'list',
                    })}
                    onClick={() => {
                        props.onFilterUpdate && props.onFilterUpdate({
                            ...filterDetails,
                            view: 'list'
                        })
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default MarketsFiltration;
