import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {useState, useContext} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import {useStyles} from './styles'
import ConnectButton from '../ConnectButton';
import {AccountContext} from '../../shared/AccountContextProvider';
import {OptionroomThemeContext} from '../../shared/OptionroomThemeContextProvider';
import {
    ellipseAddress,
    getAddressImgUrl
} from '../../shared/helper';
import Button from "../Button";

function GovernanceCard(props) {

    const classes = useStyles();
    const {
        proposal
    } = props;

    const isActive = ((parseFloat(proposal.endTime) * 1000) > (new Date()).getTime()) ? true : false;
    return (
        <div className={classes.GovernanceCard}>
            {
                /**
                 <div className={classes.AvatarWrap}>
                 <div className={classes.Avatar}></div>
                 </div>
                 */
            }
            <div className={classes.Details}>
                <div className={classes.Details__Header}>
                    <div className={classes.Cat}>{proposal.cats.join(', ')}</div>
                    <div className={clsx(classes.State, {
                        [classes.State__IsActive] : isActive,
                        [classes.State__Ended] : !isActive,
                    })}>{ isActive ? 'Active' : 'Ended'}</div>
                </div>
                <div className={classes.Title}>{proposal.question}</div>
                <div className={classes.Description}>
                    {proposal.description}
                </div>
                <div className={classes.Details__Footer}>
                    <div className={classes.Dates}>
                        <div className={classes.PostedDate}>
                            <span className={classes.PostedDate__Title}>Posted:</span>
                            <span className={classes.PostedDate__Value}> {moment(proposal.createdTime * 1000).format('MMM, DD YYYY')}</span>
                        </div>
                        <div className={classes.EndDate}>
                            <span className={classes.EndDate__Title}>Ends:</span>
                            <span className={classes.EndDate__Value}> {moment(proposal.createdTime * 1000).format('MMM, DD YYYY')}</span>
                        </div>
                    </div>
                    <div className={classes.Options}>
                        {
                            proposal.choices.map((entry, index) => {
                              return (
                                  <div className={classes.Option}
                                       key={`option-${index}`}>
                                      <span className={classes.Option__Title}>{entry}</span>
                                      <span className={clsx(classes.Option__Value, classes.Option__ValueYes)}>{proposal.votesCounts[index]}</span>
                                  </div>
                              )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GovernanceCard;
