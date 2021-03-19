import 'antd/dist/antd.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import D3Chart from './D3Chart';
import './style.less';

class App extends Component {
  render() {
      const successRatioPoints = [
    {"timestamp": 1489649460, "value": 99.9989}, {
      "timestamp": 1489649520,
      "value": 99.9987
    }, {"timestamp": 1489649580, "value": 99.9991}, {
      "timestamp": 1489649640,
      "value": 99.9986
    }, {"timestamp": 1489649700, "value": 99.9984}, {
      "timestamp": 1489649760,
      "value": 99.9991
    }, {"timestamp": 1489649820, "value": 0}, {
      "timestamp": 1489649880,
      "value": 99.9985
    }, {"timestamp": 1489649940, "value": 99.9984}, {
      "timestamp": 1489650000,
      "value": 99.9984
    }, {"timestamp": 1489650060, "value": 99.9986}, {
      "timestamp": 1489650120,
      "value": 99.9989
    }, {"timestamp": 1489650180, "value": 99.9989}, {
      "timestamp": 1489650240,
      "value": 99.9988
    }, {"timestamp": 1489650300, "value": 99.999}, {
      "timestamp": 1489650360,
      "value": 99.9984
    }, {"timestamp": 1489650420, "value": 99.9983}, {
      "timestamp": 1489650480,
      "value": 99.9983
    }, {"timestamp": 1489650540, "value": 99.9984}, {
      "timestamp": 1489650600,
      "value": 99.9991
    }, {"timestamp": 1489650660, "value": 99.999}, {
      "timestamp": 1489650720,
      "value": 99.9983
    }, {"timestamp": 1489650780, "value": 99.9978}, {
      "timestamp": 1489650840,
      "value": 99.998
    }, {"timestamp": 1489650900, "value": 99.9985}, {
      "timestamp": 1489650960,
      "value": 99.9987
    }, {"timestamp": 1489651020, "value": 99.9987}, {
      "timestamp": 1489651080,
      "value": 99.9984
    }, {"timestamp": 1489651140, "value": 99.998}, {
      "timestamp": 1489651200,
      "value": 99.9981
    }, {"timestamp": 1489651260, "value": 99.9984}, {
      "timestamp": 1489651320,
      "value": 99.9987
    }, {"timestamp": 1489651380, "value": 99.9918}, {
      "timestamp": 1489651440,
      "value": 99.9913
    }, {"timestamp": 1489651500, "value": 99.9933}, {
      "timestamp": 1489651560,
      "value": 99.9937
    }, {"timestamp": 1489651620, "value": 99.9986}, {
      "timestamp": 1489651680,
      "value": 99.9989
    }, {"timestamp": 1489651740, "value": 99.9985}, {
      "timestamp": 1489651800,
      "value": 99.9976
    }, {"timestamp": 1489651860, "value": 99.9971}, {
      "timestamp": 1489651920,
      "value": 99.9977
    }, {"timestamp": 1489651980, "value": 99.998}, {"timestamp": 1489652040, "value": 99.998}, {
      "timestamp": 1489652100,
      "value": 99.9986
    }, {"timestamp": 1489652160, "value": 99.9984}, {
      "timestamp": 1489652220,
      "value": 99.9983
    }, {"timestamp": 1489652280, "value": 99.9985}, {
      "timestamp": 1489652340,
      "value": 99.9985
    }, {"timestamp": 1489652400, "value": 0}, {
      "timestamp": 1489652460,
      "value": 99.9981
    }, {"timestamp": 1489652520, "value": 99.9984}, {
      "timestamp": 1489652580,
      "value": 99.9991
    }, {"timestamp": 1489652640, "value": 99.9995}, {
      "timestamp": 1489652700,
      "value": 99.9987
    }, {"timestamp": 1489652760, "value": 99.9984}, {"timestamp": 1489652820, "value": 99.9986}];
    const successRatioPoints2 = [
    {"timestamp": 1489649460, "value": 99.9989}, {
      "timestamp": 1489649520,
      "value": 99.9987
    }, {"timestamp": 1489649580, "value": 99.9991}, {
      "timestamp": 1489649640,
      "value": 99.9986
    }, {"timestamp": 1489649700, "value": 99.9984}, {
      "timestamp": 1489649760,
      "value": 99.9991
    }, {"timestamp": 1489649820, "value": 99.9986}, {
      "timestamp": 1489649880,
      "value": 99.9985
    }, {"timestamp": 1489649940, "value": 0}, {
      "timestamp": 1489650000,
      "value": 99.9984
    }, {"timestamp": 1489650060, "value": 99.9986}, {
      "timestamp": 1489650120,
      "value": 99.9989
    }, {"timestamp": 1489650180, "value": 99.9989}, {
      "timestamp": 1489650240,
      "value": 99.9988
    }, {"timestamp": 1489650300, "value": 99.999}, {
      "timestamp": 1489650360,
      "value": 99.9984
    }, {"timestamp": 1489650420, "value": 99.9983}, {
      "timestamp": 1489650480,
      "value": 99.9983
    }, {"timestamp": 1489650540, "value": 99.9984}, {
      "timestamp": 1489650600,
      "value": 99.9991
    }, {"timestamp": 1489650660, "value": 99.999}, {
      "timestamp": 1489650720,
      "value": 99.9983
    }, {"timestamp": 1489650780, "value": 99.9978}, {
      "timestamp": 1489650840,
      "value": 99.998
    }, {"timestamp": 1489650900, "value": 99.9985}, {
      "timestamp": 1489650960,
      "value": 99.9987
    }, {"timestamp": 1489651020, "value": 99.9987}, {
      "timestamp": 1489651080,
      "value": 99.9984
    }, {"timestamp": 1489651140, "value": 99.998}, {
      "timestamp": 1489651200,
      "value": 99.9981
    }, {"timestamp": 1489651260, "value": 0}, {
      "timestamp": 1489651320,
      "value": 99.9987
    }, {"timestamp": 1489651380, "value": 99.9918}, {
      "timestamp": 1489651440,
      "value": 99.9913
    }, {"timestamp": 1489651500, "value": 99.9933}, {
      "timestamp": 1489651560,
      "value": 99.9937
    }, {"timestamp": 1489651620, "value": 99.9986}, {
      "timestamp": 1489651680,
      "value": 99.9989
    }, {"timestamp": 1489651740, "value": 99.9985}, {
      "timestamp": 1489651800,
      "value": 99.9976
    }, {"timestamp": 1489651860, "value": 99.9971}, {
      "timestamp": 1489651920,
      "value": 99.9977
    }, {"timestamp": 1489651980, "value": 99.998}, {"timestamp": 1489652040, "value": 99.998}, {
      "timestamp": 1489652100,
      "value": 99.9986
    }, {"timestamp": 1489652160, "value": 99.9984}, {
      "timestamp": 1489652220,
      "value": 99.9983
    }, {"timestamp": 1489652280, "value": 99.9985}, {
      "timestamp": 1489652340,
      "value": 99.9985
    }, {"timestamp": 1489652400, "value": 99.9982}, {
      "timestamp": 1489652460,
      "value": 99.9981
    }, {"timestamp": 1489652520, "value": 99.9984}, {
      "timestamp": 1489652580,
      "value": 99.9991
    }, {"timestamp": 1489652640, "value": 99.9995}, {
      "timestamp": 1489652700,
      "value": 99.9987
    }, {"timestamp": 1489652760, "value": 99.9984}, {"timestamp": 1489652820, "value": 99.9986}];
      var latencyPoints = [
    {"timestamp": 1489649460, "value": 108.55}, {
      "timestamp": 1489649520,
      "value": 108.86
    }, {"timestamp": 1489649580, "value": 108.19}, {"timestamp": 1489649640, "value": 107.76}, {
      "timestamp": 1489649700,
      "value": 107.35
    }, {"timestamp": 1489649760, "value": 107.54}, {"timestamp": 1489649820, "value": null}, {
      "timestamp": 1489649880,
      "value": 107.84
    }, {"timestamp": 1489649940, "value": null}, {"timestamp": 1489650000, "value": null}, {
      "timestamp": 1489650060,
      "value": 107.59
    }, {"timestamp": 1489650120, "value": 107.68}, {"timestamp": 1489650180, "value": 107.64}, {
      "timestamp": 1489650240,
      "value": 107.34
    }, {"timestamp": 1489650300, "value": 108.09}, {"timestamp": 1489650360, "value": 109.5}, {
      "timestamp": 1489650420,
      "value": 108.46
    }, {"timestamp": 1489650480, "value": 0}, {"timestamp": 1489650540, "value": 108.65}, {
      "timestamp": 1489650600,
      "value": 108.4
    }, {"timestamp": 1489650660, "value": 108.23}, {"timestamp": 1489650720, "value": 108.65}, {
      "timestamp": 1489650780,
      "value": 108.85
    }, {"timestamp": 1489650840, "value": 109.02}, {"timestamp": 1489650900, "value": 110.57}, {
      "timestamp": 1489650960,
      "value": 110.04
    }, {"timestamp": 1489651020, "value": 0}, {"timestamp": 1489651080, "value": 107.82}, {
      "timestamp": 1489651140,
      "value": 108.46
    }, {"timestamp": 1489651200, "value": 109.62}, {"timestamp": 1489651260, "value": 109.42}, {
      "timestamp": 1489651320,
      "value": 109
    }, {"timestamp": 1489651380, "value": 109.58}, {"timestamp": 1489651440, "value": 109.12}, {
      "timestamp": 1489651500,
      "value": 109.54
    }, {"timestamp": 1489651560, "value": 109.08}, {"timestamp": 1489651620, "value": 108.21}, {
      "timestamp": 1489651680,
      "value": 108.3
    }, {"timestamp": 1489651740, "value": 108.44}, {"timestamp": 1489651800, "value": 108.39}, {
      "timestamp": 1489651860,
      "value": 109
    }, {"timestamp": 1489651920, "value": 111.66}, {"timestamp": 1489651980, "value": 112.06}, {
      "timestamp": 1489652040,
      "value": 109.69
    }, {"timestamp": 1489652100, "value": 110.19}, {"timestamp": 1489652160, "value": 113.06}, {
      "timestamp": 1489652220,
      "value": 112.09
    }, {"timestamp": 1489652280, "value": 109.13}, {"timestamp": 1489652340, "value": 108.52}, {
      "timestamp": 1489652400,
      "value": 110.45
    }, {"timestamp": 1489652460, "value": 112.9}, {"timestamp": 1489652520, "value": 112.45}, {
      "timestamp": 1489652580,
      "value": 110.94
    }, {"timestamp": 1489652640, "value": 109.55}, {"timestamp": 1489652700, "value": 108.71}, {
      "timestamp": 1489652760,
      "value": 108.79
    }, {"timestamp": 1489652820, "value": 109.48}, {"timestamp": 1489652880, "value": 112.03}];

    var latencyPoints2 = [
    {"timestamp": 1489649460, "value": 108.55}, {
      "timestamp": 1489649520,
      "value": 108.86
    }, {"timestamp": 1489649580, "value": 108.19}, {"timestamp": 1489649640, "value": 107.76}, {
      "timestamp": 1489649700,
      "value": 107.35
    }, {"timestamp": 1489649760, "value": 107.54}, {"timestamp": 1489649820, "value": null}, {
      "timestamp": 1489649880,
      "value": 107.84
    }, {"timestamp": 1489649940, "value": null}, {"timestamp": 1489650000, "value": null}, {
      "timestamp": 1489650060,
      "value": 107.59
    }, {"timestamp": 1489650120, "value": 0}, {"timestamp": 1489650180, "value": 107.64}, {
      "timestamp": 1489650240,
      "value": 107.34
    }, {"timestamp": 1489650300, "value": 108.09}, {"timestamp": 1489650360, "value": 109.5}, {
      "timestamp": 1489650420,
      "value": 108.46
    }, {"timestamp": 1489650480, "value": 108.05}, {"timestamp": 1489650540, "value": 108.65}, {
      "timestamp": 1489650600,
      "value": 108.4
    }, {"timestamp": 1489650660, "value": 108.23}, {"timestamp": 1489650720, "value": 108.65}, {
      "timestamp": 1489650780,
      "value": 108.85
    }, {"timestamp": 1489650840, "value": 109.02}, {"timestamp": 1489650900, "value": 110.57}, {
      "timestamp": 1489650960,
      "value": 110.04
    }, {"timestamp": 1489651020, "value": 107.9}, {"timestamp": 1489651080, "value": 107.82}, {
      "timestamp": 1489651140,
      "value": 108.46
    }, {"timestamp": 1489651200, "value": 109.62}, {"timestamp": 1489651260, "value": 109.42}, {
      "timestamp": 1489651320,
      "value": 109
    }, {"timestamp": 1489651380, "value": 0}, {"timestamp": 1489651440, "value": 109.12}, {
      "timestamp": 1489651500,
      "value": 109.54
    }, {"timestamp": 1489651560, "value": 109.08}, {"timestamp": 1489651620, "value": 108.21}, {
      "timestamp": 1489651680,
      "value": 108.3
    }, {"timestamp": 1489651740, "value": 108.44}, {"timestamp": 1489651800, "value": 108.39}, {
      "timestamp": 1489651860,
      "value": 109
    }, {"timestamp": 1489651920, "value": 111.66}, {"timestamp": 1489651980, "value": 112.06}, {
      "timestamp": 1489652040,
      "value": 109.69
    }, {"timestamp": 1489652100, "value": 110.19}, {"timestamp": 1489652160, "value": 113.06}, {
      "timestamp": 1489652220,
      "value": 112.09
    }, {"timestamp": 1489652280, "value": 109.13}, {"timestamp": 1489652340, "value": 108.52}, {
      "timestamp": 1489652400,
      "value": 110.45
    }, {"timestamp": 1489652460, "value": 112.9}, {"timestamp": 1489652520, "value": 112.45}, {
      "timestamp": 1489652580,
      "value": 110.94
    }, {"timestamp": 1489652640, "value": 109.55}, {"timestamp": 1489652700, "value": 108.71}, {
      "timestamp": 1489652760,
      "value": 108.79
    }, {"timestamp": 1489652820, "value": 109.48}, {"timestamp": 1489652880, "value": 112.03}];

    const data = {
      'hna-kkkk-you-90': successRatioPoints,
      'hnb-llo-67e637': latencyPoints,
      'hna-kkkk-you-he': successRatioPoints2,
      'hnb-llo-she': latencyPoints2,
    };

    const chartss = [];
    for (let i = 0; i < 1; i++) {
      chartss.push(<Row gutter={10} key={i}>
	      {/* <Col className="gutter-row" md={24}>
          <div className="gutter-box">
            <D3Chart data={data} />
          </div>
	      </Col> */}

	      <Col className="gutter-row" md={8}>
          <div className="gutter-box">
            <D3Chart data={data} />
          </div>
	      </Col>
	      <Col className="gutter-row" md={8}>
          <div className="gutter-box">
            <D3Chart data={data} />
          </div>
	      </Col>

        <Col className="gutter-row" md={8}>
          <div className="gutter-box">
            <D3Chart data={data} />
          </div>
        </Col>

      </Row>);
    }
    return (
      <div className="gutter-example simple-line-chart-demo" style={{margin: 50}}>
      {chartss}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-content'));
