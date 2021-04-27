import React from "react";
import clsx from "clsx";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiSlider-mark': {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            top: '10px',
            background: `#d6d6d6`,
            //border: `2px solid ${theme.palette.primary.main}`,
            boxSizing: 'border-box',
            transform: 'translate(-6.5px, -1px)',
            '&.MuiSlider-markActive': {
                background: `${theme.palette.primary.main}`,
                opacity: '1 !important'
            }
        },
        '& .MuiSlider-rail': {
            color: '#d6d6d6'
        }
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const marks = [
    {
        value: 0,
    },
    {
        value: 25,
    },
    {
        value: 50,
    },
    {
        value: 75,
    },
    {
        value: 100,
    },
];

function valuetext(value) {
    return `${value}`;
}

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open}
                 enterTouchDelay={0}
                 placement="bottom"
                 title={value}>
            {children}
        </Tooltip>
    );
}

function TradeSlider2(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Slider
                value={props.value}
                ValueLabelComponent={ValueLabelComponent}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                min={0}
                max={100}
                marks={marks}
                onChange={props.onChange}
            />
        </div>
    );
}

export default TradeSlider2;
