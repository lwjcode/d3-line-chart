function getY(d3, series, height, yAxis, _this) {
  const defaultMax = d3.max(series, function (s) { return d3.max(s, function (d) { return d.value; }); });
  const defaultMin = 0;
  const minValue = yAxis.min ? yAxis.min : defaultMin;
  const maxValue = yAxis.max ? yAxis.max : defaultMax;
  yAxis.min = minValue;
  // yAxis.max = maxValue;
  _this.yAxisMax = maxValue;
  const y = d3.scaleLinear() // 定义y轴
              .domain([minValue, maxValue])
              .range([height, 0]);
  return y;
}

export default getY;
