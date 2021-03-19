function allFalse(keyJson) {
  let flag = true;
  Object.keys(keyJson).forEach(name => {
    if (keyJson[name]) {
      flag = false;
    }
  });
  return flag;
}

function setOpacity(d, keyJson, opacityValue) {
  if (allFalse(keyJson)) {
    return 1;
  } else {
    if (d && d.length > 0 && d[0].key) {
      if (keyJson[d[0].key]) {
        return 1;
      } else {
        return opacityValue;
      }
    }
  }
}

export default function drawLegend(chart, series, chartWidth, legendOptions, colors, _this) {
	// 画出图例，计算图例位置
  let defaultLength = 20;
  let currentLength = defaultLength;
  let gutterWidth = 30;
  let isFirst = true;
  let currentLine = 1;
  const lineHeight = 14;
  const g = chart.append('g');
  const legend = g.selectAll('.legend')
  .data(series)
  .enter()
  .append('g')
  .attr('class', 'legend')
  .style('display', function (d, i) {
    if (d && d.length > 0) {
      return 'inline-block';
    } else {
      return 'none';
    }
  })
  .attr('transform', function (d, i) {
    if (d && d.length > 0 && d[0].key) {
      let reg = /[\u4e00-\u9fa5]/;
      let reg1 = /[A-Z]/;
      let wordLength = 0;
      const key = d[0].key;
      for (var j = 0; j < key.length; j++) {
        if (reg.test(key[j]) || reg1.test(key[j])) {
          wordLength += 12; // 汉字或大写英文字母12个像素
        } else if (key[j] === '.') {
          wordLength += 6; // 点3个像素
        } else {
          wordLength += 6; // 英文字母, _, - 6个像素
        }
      }
      if (isFirst) { // 第一个
        isFirst = false;
        currentLength += wordLength;
        return `translate(${defaultLength}, ${lineHeight * currentLine})`;
      } else { // 每行中间的那些
        if (chartWidth - currentLength - gutterWidth >= wordLength) {
          const preLength = currentLength;
          currentLength += (wordLength + gutterWidth);
          return `translate(${preLength + gutterWidth}, ${lineHeight * currentLine})`;
        } else { // 换行后的第一个
          currentLength = defaultLength +  wordLength;
          currentLine += 1;
          return `translate(${defaultLength}, ${lineHeight * currentLine})`;
        }
      }
    }
  })
  .on('click', function (d, i) {
    if (d && d.length > 0 && d[0].key) {
      const lineKey = d[0].key;
      _this.legendJson[lineKey] = !_this.legendJson[lineKey];
      if (legendOptions.autoFit) {
        let newSeries = [];
        if (allFalse(_this.legendJson)) {
          newSeries = series;
        } else {
          Object.keys(_this.legendJson).forEach(item => {
            if (_this.legendJson[item]) {
              _this.series.forEach(lineItem => {
                if (lineItem && lineItem.length > 0 && lineItem[0].key === item) {
                  newSeries.push(lineItem);
                }
              });
            }
          });
        }
        _this.options.series = newSeries;
        _this.update();
      } else {
        // 修改图例的透明度
        chart.selectAll('.legend')
        .style('opacity', function (d) {
          return setOpacity(d, _this.legendJson, 0.3);
        });
        // 修改线的透明度
        chart.selectAll('.serie path')
        .style('opacity', function (d) {
          return setOpacity(d, _this.legendJson, 0.1);
        });
        // 修改点的透明度
        chart.selectAll('.markers')
        .style('opacity', function (d) {
          return setOpacity(d, _this.legendJson, 0.1);
        });
      }
    }
  });

  legend.append('rect')
  .attr('width', 10)
  .attr('height', 3)
  .style('display', function (d, i) {
    if (d && d.length > 0) {
      return 'inline-block';
    } else {
      return 'none';
    }
  })
  .style('fill', function (d) { if (d && d.length > 0) return d[0].color; });

  legend.append('text')
  .style('display', function (d, i) {
    if (d && d.length > 0) {
      return 'inline-block';
    } else {
      return 'none';
    }
  })
  .attr('fill', legendOptions.color)
  .style('font-size', legendOptions.fontSize)
  .attr('transform', function (d, i) {
    return `translate(15, 5)`;
  })
  .text(function(d) {if (d && d.length > 0) return d[0].key; });

  // 修改图例的透明度
  if (legendOptions.autoFit) {
    chart.selectAll('.legend')
    .style('opacity', function (d) {
      if (allFalse(_this.legendJson)) {
        return 1;
      } else {
        if (d && d.length > 0 && _this.legendJson[d[0].key]) {
          return 1;
        } else {
          return 0.3;
        }
      }
    });
  }
}
