import React from "react";

import OrDonutChart from './../OrDonutChart';

import { useStyles } from "./styles";

function OptionBlock(props) {
    const {
        children,
        className,
        ...rest
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.Options__OptionBlock}
             onClick={() => props.onClick && props.onClick(props.title)}
                data-selected={props.isSelected ? 'true' : 'false'}>
{/*
            <div className={classes.OptionBlock__Indicator}><div></div></div>
*/}
            <div className={classes.OptionBlock__Title}>{props.title}</div>
            {
                props.showDonut && (
                    <OrDonutChart size={'41px'}
                                  title={`${props.value}%`}
                                  value={props.value}
                                  bgColor={'#D7DCE1'}
                                  color={'#2E6AFA'}/>
                )
            }
            {
                ((props.value || props.value === 0) && props.showValueInChoice) && (
                    <div className={classes.OptionBlock__Value}>{props.value}</div>
                )
            }
        </div>
    );
}

export default OptionBlock;
