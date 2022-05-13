import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';

import { useStyles } from "./styles";


function LinearChart(props) {
    const classes = useStyles();

    const options = {
        chart: {
            type: "line",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: 'none'
        },
        tooltip: {
            enabled: true,
            shared: true,
            marker: {
                show: true,
            },
            x: {
                show: true,
                formatter: (value) => `${moment(value).format('MMMM Do YYYY, h:mm a')}`,
            },
            y: {
                show: true,
                formatter: (value) => `${parseFloat(value).toFixed(3)}`,
            },
        },
        legend: {
            horizontalAlign: 'left',
            position: 'top',
            show: true,
            markers: {
                width: 16,
                height: 16,
                radius: 2,
            },
            itemMargin: {
                horizontal: 6,
                vertical: 2,
            },
            fontSize: "14px",
            fontWeight: 700,
            labels: {
                colors: ["#000"],
            },
            onItemClick: {
                toggleDataSeries: false,
            },
        },
        markers: {
            size: 0,
            colors: undefined,
            strokeColors: ["#9F7EFF", "#FF83B0"],
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 3,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            type: "datetime",
            labels: {
                show: true,
                formatter: function(value, timestamp, opts) {
                    return `${moment(timestamp).format('MMM DD')}`
                },
                style: {
                    cssClass: "apexcharts-xaxis-label",
                },
            },
            tooltip: {
                enabled: false,
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: true,
                formatter(value) {
                    return `${value}`;
                },
                offsetX: -15,
                style: {
                    cssClass: "apexcharts-yaxis-label",
                },
            },
            min: 0,
            max: 1,
        },
        grid: {
            show: true,
            borderColor: "#252C3B",
            strokeDashArray: 5,
            position: "back",
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 12,
                left: 0,
            },
        },
        colors: ["#2E6AFA", "#EB5757"],
    };

    return (
        <div className={classes.MarketOutcome}>
            <Chart
                options={options}
                series={props.series}
                type="line"
                width="100%"
            />
        </div>
    );
}

export default LinearChart;
