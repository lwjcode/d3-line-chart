import moment from 'moment';

function drawXAxis(d3, g, x, height, container, xAxis) {
  g.append('g') // 生成x轴
   .attr('class', 'xAxis')
   .attr('transform', `translate(0, ${height})`)
   .call(d3.axisBottom(x)
           .ticks(5)
           .tickFormat((d) => {
              if (xAxis.max - xAxis.min >= 3 * 24 * 60 * 60 * 1000) { // 时间大于等于三天就显示日期，否则显示时间
                return moment(d).format('MM-DD');
              }
              return moment(d).format('HH:mm');
           }));
  const tickColor = xAxis && xAxis.color ? xAxis.color : '#000';
  const tickOpacity = xAxis && xAxis.color ? 1 : 0.6;
  const tickFontSize = xAxis && xAxis.fontSize ? xAxis.fontSize : 10;
  d3.select(container)
    .selectAll('.xAxis .tick text')
    .attr('fill', tickColor)
    .style('opacity', tickOpacity)
    .style('font-size', tickFontSize);
}

export default drawXAxis;
