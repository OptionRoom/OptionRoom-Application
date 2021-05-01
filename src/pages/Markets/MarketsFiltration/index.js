import React, {useState} from "react";
import Select from "react-select";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {get} from 'lodash';

import {useStyles} from "./styles";
import {useGetMarketCategories} from '../../../shared/hooks';
import {marketStates} from '../../../shared/constants';

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
                <input placeholder={'Search by market name'}

                       className={classes.MarketNameInput}
                       value={get(filterDetails, 'name')}
                       onChange={(e) => {
                           props.onFilterUpdate && props.onFilterUpdate({
                               ...filterDetails,
                               name: e.target.value
                           })
                       }}
                       type={'text'}/>
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
                    <Select isClearable={true}
                            value={get(props.filterDetails, 'state')}
                            onChange={(e) => {
                                props.onFilterUpdate && props.onFilterUpdate({
                                    ...filterDetails,
                                    state: e
                                })
                            }}
                            placeholder={'Status'}
                            options={Object.keys(marketStates).map((entry) => {
                                return {
                                    value: entry,
                                    label: marketStates[entry]
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
                    {
                        ["Volume", "Created"].map((entry) => {
                            return (
                                <div className={classes.SortBlock}
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
    );
}

export default MarketsFiltration;
