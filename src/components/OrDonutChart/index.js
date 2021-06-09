import {PieChart} from "react-minimal-pie-chart";

function OrDonutChart(props) {
    return (
        <PieChart style={{height: props.size, width: props.size}}
                  label={({dataEntry, index}) => `${props.title}`}
                  labelStyle={{
                      fontSize: '30px',
                      fontWeight: '700',
                      fill: '#818B95',
                      textTransform: 'none',
                  }}
                  labelPosition={0}
                  data={
                      [
                          {
                              title: '',
                              value: (100 - ((props.value || 0) * 100)),
                              color: `${props.bgColor || '#E9EEF3'}`
                          },
                          {
                              title: `${props.label}`,
                              value: ((props.value || 0) * 100),
                              color: `${props.color}`
                          },
                      ]
                  }
                  lineWidth={25}
                  rounded/>
    );
}

export default OrDonutChart;
