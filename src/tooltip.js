import moment from 'moment';
import { debounce, throttle, map } from 'lodash';

// let preNearstPointes = [];
let startPoints = [];
let endPoints = [];

class tooltip {
  constructor(d3, container, zoom, height, margin, tip, _this) {
    this.d3 = d3;
    this.container = container;
    this.zoom = zoom;
    this.height = height;
    this.margin = margin;
    this.tip = tip;
    this.preNearstPointes = [];
    this.tooltipContainer = null;
    this.instance = _this;
    this.createTooltip();
    this.addMousemoveListener();
  }

  addMousemoveListener() {
    const d3 = this.d3;
    const zoom = this.zoom;
    const height = this.height;
    const margin = this.margin;
    const tip = this.tip;
    let x = 0; // 记录鼠标点下去的初始值
    const chart = d3.select(this.container);
    let isMouseOver = false;
    const handleMouseover = debounce((d3Event) => {
      if (isMouseOver) {
        const bodyPosition = this.getChartBodyPosition();
        const endX = d3Event.clientX;
        const startX = x - bodyPosition.startX;
        const endx = endX - bodyPosition.startX;
        if (x === 0) {
          if (tip.chain) { // 联动
            this.showAllModal(d3Event, bodyPosition.startY);
          } else {
            this.showModal(d3Event, bodyPosition.startY);
          }
        }
        // zoom时的背景
        if (x > 0) {
          this.hindAllTooltip();
          if (Math.abs(endx - startX) > 5) {
            zoom.showBackground(x, endX, height, margin.top);
          } else {
            zoom.clearBackground();
          }
        }
      }
    }, 20);

    const handleMouseLeave = throttle(() => {
      if (tip.chain) {
        this.hindAllTooltip();
      } else {
        this.hindTooltip();
      }
    }, 16);

    chart
    .on('mousedown', () => {
      x = d3.event.clientX;
      const { clientX, clientY } = d3.event;
      startPoints = this.getNearstPoints(clientX);
    })
    .on('mousemove', () => {
      isMouseOver = true;
      handleMouseover(d3.event);
    })
    .on('mouseup', () => {
      const { clientX } = d3.event;
      if (Math.abs(clientX - x) > 5) {
        this.instance.isZoom = true;
        zoom.showZoomBtn();
        zoom.clearBackground();
        endPoints = this.getNearstPoints(clientX);
        if (endPoints.length > 0 && startPoints.length > 0 && startPoints[0].__data__ && endPoints[0].__data__) {
          if (x > clientX) {
            zoom.expandChart(endPoints[0].__data__.date, startPoints[0].__data__.date);
          } else {
            zoom.expandChart(startPoints[0].__data__.date, endPoints[0].__data__.date);
          }
        }
      } else {
        this.instance.isZoom = false;
        zoom.clearBackground();
      }
      x = 0; // 重置为0
    })
    .on('mouseleave', () => {
      isMouseOver = false;
      handleMouseLeave();
    });
  }

  getChartBodyPosition() {
    const chartBody = this.container.querySelector('.d3-chart-body');
    const position = chartBody.getBoundingClientRect();
    return {
      startX: position.left,
      startY: position.top,
      endX: position.left + position.width,
      endY: position.top + position.height,
    }
  }

  getNearstPoints(x) {
    let max = 0, maxIndex;
    const lenArr = map(this.instance.options.series, (item, index) => {
      if (item.length > max) {
        max = item.length;
        maxIndex = index;
      }
      return item.length;
    });
    const circleList = this.container.getElementsByTagName('circle');
    let min = 1000;
    let pointArray = [];
    let point = null;
    let start = 0;
    for (let i = 0; i < lenArr.length; i++) {
      if (i === maxIndex) {
        for (let j = start; j < start + lenArr[i]; j++) {
          const position = circleList[j].getBoundingClientRect();
          const distance = Math.abs(position.left - x);
          if (distance < min) {
            min = distance;
            point = circleList[j];
          }
        }
        break;
      }
      start += lenArr[i];
    }
    start = 0;
    const date = parseInt(point.__data__.date);
    for (let i = 0; i < lenArr.length; i++) {
      const startDate = parseInt(circleList[start].__data__.date);
      const time = parseInt(circleList[start + 1].__data__.date) - startDate;
      const per = (date - startDate) / time;
      if (per === parseInt(per)) {
        pointArray.push(circleList[start + per]);
      }
      start = start + lenArr[i];
    }
    return pointArray;
  }
  // 鼠标移动时清除掉上一次的最近点的样式
  clearPreNearstPoints() {
    for (let i = 0; i < this.preNearstPointes.length; i++) {
      this.preNearstPointes[i].style.r = 1;
    }
  }

  showPoints(points) {
    for (let i = 0; i < points.length; i++) { // 修改点的半径
      points[i].style.r = 5;
    }
  }

  showCrossLine(x) {
    const d3 = this.d3;
    d3.select(this.container.querySelector('.cross-line'))
      .attr('x1', x + 1)
      .attr('x2', x + 1)
      .style('opacity', 1);
  }

  showTooltip(points, clientX, clientY) {
    const lineTooltip = this.tooltipContainer.querySelector('.d3-chart-tooltip');
    let content = '';
    if (this.tip && this.tip.formatter) {
      content = this.tip.formatter(points);
    } else {
      content = `<div>${moment(points[0].__data__.date).format('YYYY-MM-DD HH:mm:ss')}</div>`;
      let preKey = '';
      for (let i = 0; i < points.length; i++) {
        const d = points[i].__data__;
        if (d.value !== undefined && preKey !== d.key && d.value !== null) {
          preKey = d.key;
          content += `<div>
          	<span style="color: ${d.color}">◼</span>
          	<span>${d.key}：</span>
          	<strong>${d.value}</strong>
          </div>`;
        }
      }
    }
    lineTooltip.innerHTML = content;
    lineTooltip.style.display = 'block'; // 必须设在前面，不然get不到高度和宽度
    const leftX = clientX + lineTooltip.getBoundingClientRect().width + 30;
    const topY = clientY + lineTooltip.getBoundingClientRect().height + 120;
    const chartContainerWidth = this.tooltipContainer.getBoundingClientRect().width;
    const chartContainerHeight = this.tooltipContainer.getBoundingClientRect().height;
    if (leftX > chartContainerWidth) { // 如果在chartBody右边缘
      lineTooltip.style.left = clientX - lineTooltip.getBoundingClientRect().width - 30 + 'px';
    } else {
      lineTooltip.style.left = clientX + 30 + 'px';
    }
    if (topY > chartContainerHeight) {
      lineTooltip.style.top = clientY - lineTooltip.getBoundingClientRect().height + 'px';
    } else {
      lineTooltip.style.top = clientY + 100 + 'px';
    }
  }

  createTooltip() {
    if (this.tip.share === true) {
      if (document.getElementById('chart-tooltip')) {
        return;
      } else {
        this.tooltipContainer = document.body;
      }
    } else {
      this.tooltipContainer = this.container.parentNode;
    }
    const lineTooltip = document.createElement('div');
    lineTooltip.id = 'chart-tooltip';
    lineTooltip.className = 'd3-chart-tooltip';
    lineTooltip.style.display = 'none';
    this.tooltipContainer.appendChild(lineTooltip);
  }

  hindTooltip() {
    const d3 = this.d3;
    d3.select(this.container.querySelector('.cross-line'))
      .style('opacity', 0);
    this.tooltipContainer.querySelector('#chart-tooltip').style.display = 'none';
    this.clearPreNearstPoints();
  }

  hindAllTooltip() {
    const d3 = this.d3;
    for (let i = 0; i < window.D3LineCharts.length; i++) {
      const tooltipObj = window.D3LineCharts[i].tooltip;
      d3.select(tooltipObj.container.querySelector('.cross-line'))
        .style('opacity', 0);
      tooltipObj.tooltipContainer.querySelector('#chart-tooltip').style.display = 'none';
      tooltipObj.clearPreNearstPoints();
    }
  }

  showModal(event, startY) {
    this.clearPreNearstPoints();
    const { clientX, clientY } = event;
    const bodyPosition = this.getChartBodyPosition();
    if (
      clientX >= bodyPosition.startX &&
      clientX <= bodyPosition.endX &&
      clientY >= bodyPosition.startY &&
      clientY <= bodyPosition.endY
    ) {
      const nearstPoints = this.getNearstPoints(clientX);
      this.preNearstPointes = nearstPoints;
      if (nearstPoints.length > 0) {
        const containerPosition = this.container.getBoundingClientRect();
        const pointPosition = nearstPoints[0].getBoundingClientRect();
        const xLeft = pointPosition.left - containerPosition.left;
        const yTop = clientY - startY;
        this.showPoints(nearstPoints);
        this.showCrossLine(xLeft);
        this.showTooltip(nearstPoints, xLeft, yTop);
      }
    }
  }

  showAllModal(event, startY) {
    const { clientX, clientY } = event;
    const bodyPosition = this.getChartBodyPosition();
    if (
      clientX >= bodyPosition.startX &&
      clientX <= bodyPosition.endX &&
      clientY >= bodyPosition.startY &&
      clientY <= bodyPosition.endY
    ) {
      const nearstPoints = this.getNearstPoints(clientX);
      if (nearstPoints.length > 0) {
        const yTop = clientY - startY;
        showAllTooltip(nearstPoints[0], yTop);
      }
    }
  }
};

function showAllTooltip(point, clientY) {
  const date = point.__data__.date;
  const charts = window.D3LineCharts;
  for (let i = 0; i < charts.length; i++) {
    const series = charts[i].options.series;
    if (series && series.length > 0) {
      const tooltipObj = charts[i].tooltip;
      tooltipObj.clearPreNearstPoints();
      const pointArray = getPoints(series, date, tooltipObj);
      tooltipObj.preNearstPointes = pointArray;
      if (pointArray.length > 0) {
        const pointPosition = pointArray[0].getBoundingClientRect();
        const containerPosition = tooltipObj.container.getBoundingClientRect();
        const xLeft = pointPosition.left - containerPosition.left;
        tooltipObj.showPoints(pointArray);
        tooltipObj.showCrossLine(xLeft);
        tooltipObj.showTooltip(pointArray, xLeft, clientY);
      } else {
        tooltipObj.hindTooltip();
      }
    }
  }
}

function getPoints(series, date, tooltipObj) {
  let max = 0;
  const lenArr = map(series, (item) => {
    if (item.length > max) {
      max = item.length;
    }
    return item.length;
  });
  const circleList = tooltipObj.container.getElementsByTagName('circle');
  let pointArray = [];
  let start = 0;
  for (let i = 0; i < lenArr.length; i++) {
    const startDate = parseInt(circleList[start].__data__.date);
    const time = parseInt(circleList[start + 1].__data__.date) - startDate;
    const per = (date - startDate) / time;
    if (per === parseInt(per)) {
      pointArray.push(circleList[start + per]);
    }
    start = start + lenArr[i];
  }
  return pointArray;
}

export default tooltip;
