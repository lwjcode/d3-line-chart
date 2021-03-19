import * as d3 from 'd3';
import './style.less';
import drawLegend from './legend';
import getX from './x';
import getY from './y';
import drawX from './xAxis';
import drawY from './yAxis';
import drawLine from './line';
import drawThresholdLine from './threshold';
import drawAlarmLine from './alarm';
import drawCrossLine from './crossLine';
import Tooltip from './tooltip';
import Zoom from './zoom';

let colors = ['#3399CC', '#CC9933', '#9966CC', '#66CC66', '#CC3333', '#99CCCC', '#CCCC66', '#CC99CC', '#99CC99', '#CC6666', '#336699', '#996633', '#993399', '#339966', '#993333'];

function formatSeries(series, colorList) {
  if (colorList && colorList.length > 0) {
    colors = colorList.concat(colors);
  }
  if (series && series.length > 0) {
    const newSeries = series.map((item, index) => {
      const data = item.data;
      const itemData = [];
      if (data && data.length > 0) {
        data.forEach((it, i) => {
          itemData.push({
            color: colors[index],
            key: item.name,
            date: it[0],
            value: it[1],
          });
        });
      }
      return itemData;
    });
    return newSeries;
  }
  return [];
}
if (!window.D3LineCharts) {
  window.D3LineCharts = []; // 存储所有的charts实例
}

class D3LineChart {
  constructor(options) {
    const newSeries = formatSeries(options.series, options.colors);
    options.series = newSeries;
    this.options = options;
    this.series = options.series;
    this.chartContainer = null;
    this.chart = null;
    this.chartWidth = 0;
    this.chartHeight = 0;
    this.tooltip = null;
    this.zoom = null;
    this.margin = {};
    this.legendJson = {};
    this.isZoom = false;
    this.yAxisMax = 0;
    if (newSeries && newSeries.length > 0) {
      this.init();
    }
    if (options.tooltip && options.tooltip.chain) {
      window.D3LineCharts.push(this);
    }
  }

  init() {
    this.initChartBody();
    this.initScale();
    this.initLine();
    this.initLegend();
    this.initThresholdLine();
    this.initAlarmLine();
    this.initCrossLine();
    this.initZoom();
    this.initTooltip();
  }

  update(newOptions) { // 此处应该生成新的options，保留旧的options
    if (typeof newOptions === 'object') {
      if (newOptions.height) {
        this.options.chart.height = newOptions.height;
      }
      if (newOptions.series && newOptions.series.length > 0) {
        const newSeries = formatSeries(newOptions.series);
        this.options.series = newSeries;
        this.series = newSeries;
      }
      if (newOptions.yAxis) {
        this.options.yAxis = newOptions.yAxis;
      }
      if (newOptions.pointClick) {
        this.options.pointClick = newOptions.pointClick;
      }
      if (newOptions.tooltip) {
        this.options.tooltip.chain = newOptions.tooltip.chain;
      }
      if (newOptions.alarmLines) {
        this.options.alarmLines = newOptions.alarmLines;
      }
      if (newOptions.thresholdLines) {
        this.options.thresholdLines = newOptions.thresholdLines;
      }
    }
    this.clear();
    this.init();
  }

  initChartBody() {
    const { chart, series, xAxis, yAxis } = this.options;
    const { height, container, spacing } = chart;
    const width = container.parentNode.offsetWidth;
    const margin = spacing;
    const chartContainer = d3.select(container)
                             .attr('width', width)
                             .attr('height', height + margin.bottom);
    const chartBody = chartContainer.append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`) // 设最外包层在总图上的相对位置
                            .attr('class', 'd3-chart-body');
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const xScale = getX(d3, series, chartWidth, xAxis);
    const yScale = getY(d3, series, chartHeight, yAxis, this);
    this.chartContainer = chartContainer;
    this.chart = chartBody;
    this.chartWidth = chartWidth;
    this.chartHeight = chartHeight;
    this.margin = margin;
    this.xScale = xScale;
    this.yScale = yScale;
  }

  initScale() {
    const { chart, xScale, yScale, chartHeight, chartWidth} = this;
    const container = this.options.chart.container;
    const { xAxis, yAxis } = this.options;
    drawX(d3, chart, xScale, chartHeight, container, xAxis); // x轴
    new drawY(d3, chart, yScale, chartWidth, container, yAxis); // y轴
  }

  initLine() {
    const { chart, xScale, yScale } = this;
    const { series, pointClick } = this.options;
    drawLine(d3, chart, xScale, yScale, series, pointClick); // 曲线
  }

  initLegend() {
    const { chartContainer, chartWidth, series } = this;
    const { legend } = this.options;
    drawLegend(chartContainer, series, chartWidth, legend, colors, this); // 图例
  }

  initThresholdLine() {
    const { chartContainer, chartWidth, chartHeight, margin } = this;
    const { series, yAxis, thresholdLines } = this.options;
    drawThresholdLine(chartContainer, chartWidth, series, chartHeight, yAxis, thresholdLines, margin, this); // 阈值线
  }

  initAlarmLine() {
    const { chartContainer, chartWidth, chartHeight, margin } = this;
    const { xAxis, alarmLines } = this.options;
    drawAlarmLine(chartContainer, chartWidth, chartHeight, margin, xAxis, alarmLines); // 报警线
  }

  initCrossLine() {
    const { chartContainer, chartHeight, margin } = this;
    const { crossHair } = this.options;
    drawCrossLine(chartContainer, chartHeight, margin, crossHair);
  }

  initTooltip() {
    const { chart, tooltip } = this.options;
    const { chartHeight, zoom, margin }  = this;
    const { container } = chart;
    const tip = new Tooltip(d3, container, zoom, chartHeight, margin, tooltip, this);
    this.tooltip = tip;
  }

  initZoom() {
    const { chart, series } = this.options;
    const { container } = chart;
    const { chartContainer, chartWidth, margin } = this;
    const zoom = new Zoom(d3, container, chartContainer, chartWidth, margin, series, this);
    this.zoom = zoom;
  }

  clear() {
    const { chart } = this.options;
    d3.select(chart.container).selectAll('*').remove();
  }

  destory() {
    const { chart } = this.options;
    const { container } = chart;
    d3.select(container)
      .on('mousedown', null)
      .on('mousemove', null)
      .on('mouseup', null)
      .on('mouseleave', null);
    delete this.options;
    delete this.series;
    delete this.chartContainer;
    delete this.chart;
    delete this.chartWidth;
    delete this.chartHeight;
    delete this.zoom;
    delete this.margin;
    window.D3LineCharts = [];
  }
}

export default D3LineChart;
