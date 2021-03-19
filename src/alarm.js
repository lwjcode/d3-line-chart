function getAlarmPosition(width, margin, xAxis, timestamp) {
  const x = (timestamp - xAxis.min)/ (xAxis.max - xAxis.min) * width;
  return x + margin.left;
}

function drawAlarm(chart, width, height, margin, xAxis, alarmList) {
  // 画出阈值
  if (alarmList && alarmList.length > 0) {
    const g = chart.append('g');
    for (let i = 0; i < alarmList.length; i++) {
      const x = getAlarmPosition(width, margin, xAxis, alarmList[i]);
      g.append('line')
      .attr('class', 'alarm-line')
      .attr('x1', x)
      .attr('y1', margin.top)
      .attr('x2', x)
      .attr('y2', height + margin.top)
      .attr('stroke-width', 1.5)
      .style('stroke', 'red')
      .style('fill', 'red')
      .style('stroke-dasharray', '4 4');
    }
  }
}

export default drawAlarm;
