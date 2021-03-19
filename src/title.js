function drawTitle(chart, width, margin) {
  chart.append('g')// 输出标题
  .attr('class', 'line-title')
  .append('text')
  .attr('fill', '#000')
  .attr('font-weight', '700')
  .attr("transform", "translate(" + (width / 2 + margin.left) + "," + 20 + ")")
  .attr('text-anchor', 'middle')
  .attr('x', 0)
  .attr('y', 0)
  .text('');
}

export default drawTitle;
