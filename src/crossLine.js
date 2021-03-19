function drawCrossLine(chart, height, margin, crossHair) {
  // 画出阈值线
  let g = chart.append('g');
  g.append('line')
  .attr('class', 'cross-line')
  .attr('x1', margin.left)
  .attr('y1', margin.top)
  .attr('x2', margin.left)
  .attr('y2', height + margin.top)
  .attr('stroke-width', crossHair.lineWidth)
  .style('stroke', crossHair.color)
  .style('opacity', 0);
}

export default drawCrossLine;
