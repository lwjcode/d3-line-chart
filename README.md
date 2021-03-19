# d3-line-chart

d3封装的折线图

## 安装

```shell
npm i -S d3-line-chart
```

## 使用

```jsx
import React from 'react';
import D3LineChart from 'd3-line-chart';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
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
    // chart、series为必选参数，其他非必选
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
      },
      xAxis: {
        color: '#5D738B',
        fontSize: 10,
      },
      yAxis: {
        color: '#5D738B',
        fontSize: 10,
      },
      crossHair: {
        color: 'orange',
        lineWidth: 2,
      },
      pointClick: () => {
        // 点击曲线上的点时执行的函数
      },
      tooltip: {
      	formatter(points) { // 可自定义，支持默认
          let html = '';
          if (points.length) {
            html = `<div>${moment(points[0].__data__.date).format('YYYY-MM-DD HH:mm:ss')}</div>`;
            for (let i = 0; i < points.length; i++) {
              const d = points[i].__data__;
              if (d.value && d.value !== null) {
                html += `<div>
                  <span style="color: ${d.color}">◼</span>
                  <span>${d.key}：</span>
                  <strong>${d.value}</strong>
                </div>`;
              }
            }
          }
          return html;
        },
      },
      alarmLines: [1489649460000, 1489659460032], // 时间戳数组，报警时的红线
      thresholdLines: [ // 阈值
      	name: 'xxx1',
      	value: 100
      ],
      series: [
        {
          name: 'xxx1',
          data: [
            [1489649460000, 102],
            [1489649460032, 103],
          ]
        },
        {
          name: 'xxx2',
          data: [
            [1489659460000, 102],
            [1489659460032, 103],
          ]
        },
      ]
    };
    this.chart = new D3LineChart(options);
  }

  // 更新函数height单独一个key，其他与new时的options相同
  expand = () => {
    this.chart.update({
      height: 600,
    });
  }

  render() {
    return (
      <div>
        <svg ref={(r) => this.chartRef = r}></svg>
        <button onClick={this.expand}>放大</button>
      </div>
    )
  }
}

export default D3Chart;

```
## API

| 名称 | 功能 | 参数 | 说明 |
| :------| :------ | :------ | :------ |
| update | 更新图表 | options | - |
| destory | 销毁图表 | 无 | - |
