import moment from 'moment';

function getX(d3, series, width, xAxis) {
  const minDate = d3.min(series, function (s) { return d3.min(s, function (d) { return d.date; }); })
  const maxDate = d3.max(series, function (s) { return d3.max(s, function (d) { return d.date; }); })
  xAxis.min = minDate;
  xAxis.max = maxDate;
  const x = d3.scaleTime() // 定义x轴
              .domain([minDate, maxDate])
              .range([0, width]);
  return x;
}

export default getX;
