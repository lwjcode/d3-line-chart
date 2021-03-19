class yAxis {
  constructor(d3, g, y, chartWidth, container, yAxis) {
    this.drawYAxis(d3, g, y, yAxis, container);
    this.drawGridLine(d3, g, y, chartWidth, container);
  }

  // 画y轴的刻度
  drawYAxis(d3, g, y, yAxis, container) {
    g.append('g') // 生成y轴
     .attr('class', 'yAxis')
     .call(d3.axisLeft(y)
             .ticks(5)
             .tickFormat((v) => {
              if (v >= 1000) {
              	return `${v / 1000}k`;
              } else if (v >= 10000) {
              	return `${v / 10000}w`;
              } else if (v >= 10000000) {
              	return `${v / 10000000}kw`;
              } else {
              	return v;
              }
            }));
    const tickColor = yAxis && yAxis.color ? yAxis.color : '#000';
    const tickOpacity = yAxis && yAxis.color ? 1 : 0.6;
    const tickFontSize = yAxis && yAxis.fontSize ? yAxis.fontSize : 10;
    d3.select(container)
      .selectAll('.yAxis .tick text')
      .attr('fill', tickColor)
      .style('opacity', tickOpacity)
      .style('font-size', tickFontSize);
  }

  // 画平行于y轴的网格线
  drawGridLine(d3, g, y, chartWidth, container) {
    const gridList = [];
    const ticks = d3.select(container).selectAll('.yAxis .tick');
    ticks.selectAll('.gridline')
        .data(function (d) {
          if (d !== 0) {
            gridList.push(y(d));
          }
          return d;
        })
        .enter();
    for (let i = 0; i < gridList.length; i++) {
      g.append('line')
       .attr('x1', 0)
       .attr('x2', chartWidth)
       .attr('y1', gridList[i])
       .attr('y2', gridList[i])
       .attr('stroke', '#000')
       .style('opacity', 0.1);
    }
  }

}

export default yAxis;
