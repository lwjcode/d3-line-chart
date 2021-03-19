import _ from 'lodash';

class Zoom {
  constructor(d3, container, chart, width, margin, data, _this) {
    this.chart = chart;
    this.d3 = d3;
    this.container = container;
    this.width = width;
    this.margin = margin;
    this.data = data;
    this.intance = _this;
    this.renderZoomBtn();
    this.renderBackground();
  }

  renderZoomBtn() {
    const chart = this.chart;
    const width = this.width;
    const g = chart.append('g');
    const opacity = this.intance.isZoom ? 1 : 0;
    g.append('text')
      .attr('class', 'd3-resetzoom')
      .attr('width', 100)
      .attr('height', 30)
      .attr('x', width - this.margin.left)
      .attr('y', 20)
      .style('fill', '#bbb')
      .style('opacity', opacity)
      .style('cursor', 'pointer')
      .text('Reset zoom')
      .on('click', () => {
      	const d3 = this.d3;
      	const target = d3.event.target;
        this.resetChart();
        this.clearZoomBtn(target);
      });
  }

  renderBackground() {
    const chart = this.chart;
    const g = chart.append('g');
    g.append('rect')
    .attr('class', 'd3-background')
  }

  showZoomBtn() {
    const d3 = this.d3;
    d3.select(this.container.querySelector('.d3-resetzoom'))
      .style('opacity', 1);
  }

  clearZoomBtn(target) {
    if (target) {
      target.style.opacity = 0;
    }
  }

  showBackground(startX, endX, height, top) {
    const d3 = this.d3;
    const containerPosition = this.container.getBoundingClientRect();
    let width = endX - startX;
    let x = startX - containerPosition.left;
    if (startX > endX) {
      width = startX - endX;
      x = endX - containerPosition.left;
    }
    d3.select(this.container.querySelector('.d3-background'))
      .attr('width', width)
      .attr('height', height)
      .attr('x', x)
      .attr('y', top)
      .style('fill', 'blue')
      .style('opacity', 0.4);
  }

  clearBackground() {
    const d3 = this.d3;
    d3.select(this.container.querySelector('.d3-background'))
      .attr('width', 0)
      .style('opacity', 0);
  }

  expandChart(startPointDate, endPointDate) {
    const series = Object.keys(this.data).map((name, index) => {
      return this.data[name].filter(item => {
        if (item.date >= startPointDate && item.date <= endPointDate) {
          return item;
        }
      });
    });
    this.intance.options.series = series;
    this.intance.update();
  }

  resetChart() {
    this.intance.options.series = this.intance.series;
    this.intance.legendJson = {};
    this.intance.update();
  }
}

export default Zoom;

