function getThresholdPosition(margin, width, height, yAxis, value, yAxisMax) {
  const y = (1 - value / (yAxisMax - yAxis.min)) * height;
  return y + margin.top;
}

function drawThreshold(chart, width, series, height, yAxis, thresholdList, margin, _this) {
  // 画出阈值线
  const g = chart.append('g');
  const threshold = g;
  const thresholdList2 = [];
  if (thresholdList && thresholdList.length > 0) {
    thresholdList.forEach(item => {
      const name = item.name;
      series.forEach(it => {
        if (it[0].key === name) {
          thresholdList2.push({
            ...item,
            color: it[0].color,
          });
        }
      })
    });
    thresholdList2.forEach((item) => {
      let y = 0;
      y = getThresholdPosition(margin, width, height, yAxis, item.value, _this.yAxisMax);
      threshold.append('line')
               .attr('x1', function (d, i) { return margin.left;})
               .attr('y1', y)
               .attr('x2', width + margin.left)
               .attr('y2', y)
               .attr("stroke-width", 2)
               .style("stroke", item.color)
               .style('fill', item.color)
               .style('opacity', '0.4')
               .style('stroke-dasharray', '3 2');
    });
  }
}

export default drawThreshold;
