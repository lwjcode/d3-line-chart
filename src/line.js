function drawLine(d3, g, x, y, series, pointClick) {
  let line = d3.line()
               .x(function (d) { return x(d.date); })
               .y(function (d) { return y(d.value); })
               .defined((d) => {
                 return typeof d.value === 'number';
               });

  let serie = g.selectAll('.serie') // 生成线条
              .data(series)
              .enter().append('g')
              .attr('class', 'serie');
  serie.append('path') // 绘画线条
      .attr('clip-path', 'url(#clip)')
      .attr('class', 'line')
      .attr('stroke-width', 2)
      .style('stroke', function (d) { if (d && d.length > 0) return d[0].color; })
      .attr('fill', 'none')
      .attr('d', line);

  let markers = g.selectAll('.markers')
                .data(series)
                .enter().append('g')
                .attr('class', 'markers');

  markers.selectAll('.label') // 生成独立的点
      .data(function (d) { return d; })
      .enter().append('circle')
      .attr('class', 'label')
      .attr('transform', function (d, i) { return `translate(${x(d.date)}, ${y(d.value)})`; })
      .attr('fill', function(d) { return d.color; })
      .attr('x', function (d) { return d.date; })
      .attr('y', function (d) { return d.value; })
      .attr('r', 1)
      .style('opacity', (d) => { return typeof d.value === 'number' ? 1 : 0 })
      .style('cursor', 'pointer')
      .on('click', function(d) {
        if (pointClick) {
          pointClick(d);
        }
      });
}

export default drawLine;
