import React from 'react';
import D3SimpleLineChart from '../src';

class D3Chart extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }
  componentDidMount() {
    const data = this.props.data;
    const colors = [
		  '#4fa72a',
		  '#e64d30',
		  '#224bde',
		  '#079de4',
		  '#c19801',
		  '#d10ab0',
		  '#627080',
		  '#7900d6',
		  '#659e67',
		  '#029faf',
		  '#ab5656',
		  '#5c799c',
		];
    const series = Object.keys(data).map((name, index) => {
      const values = [];
      data[name].forEach(item => {
        values.push([item.timestamp * 1000, item.value]);
      });
      return {
        name,
        data: values,
      };
    });
    const options = {
      chart: {
        height: 260,
        spacing: {
          left: 40,
          right: 20,
          top: 50,
          bottom: 30,
        },
        container: this.chartRef, // dom节点
      },
      legend: {
        fontSize: 12,
        color: '#5D738B',
        autoFit: true,
      },
      xAxis: {
        color: '#5D738B',
        fontSize: 10,
      },
      yAxis: {
        color: '#5D738B',
        fontSize: 10,
      },
      tooltip: {
        chain: true,
      },
      crossHair: {
        color: 'orange',
        lineWidth: 2,
      },
      pointClick: () => {
        console.log(colors);
      },
      series: series,
    };
    this.chart = new D3SimpleLineChart(options);
  }
  expand = () => {
    // this.chartRef.width = 500;
    this.chart.update({
      height: 600,
      tooltip: {
        chain: false,
      }
    });
  }
  render() {
    return (
      <div className="line-chart--simple">
         <svg ref={(r) => this.chartRef = r}></svg>
         <button onClick={this.expand}>放大</button>
      </div>
    )
  }
}

export default D3Chart;
