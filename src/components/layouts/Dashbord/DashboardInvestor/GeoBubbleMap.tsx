import React from 'react';
import Plot from 'react-plotly.js';

const ScatterGeoChart = () => {
  const data :any= [
    {
      type: 'scattergeo',
      mode: 'markers',
      locations: ['FRA', 'DEU', 'RUS', 'ESP'],
      marker: {
        size: [20, 30, 15, 10],
        color: [10, 20, 40, 50],
        cmin: 0,
        cmax: 50,
        colorscale: 'Greens',
        line: {
          color: 'black',
        },
      },
      name: 'europe data',
    },
  ];

  const layout = {
    geo: {
      scope: ['europe'],
      resolution: 100,
    }
  };

  const chartStyle = {
    width: '100%', // Set the width to 100% of the container
  };

  return (
    <div>
      <Plot data={data} layout={layout} config={{ displayModeBar: false }} style={chartStyle} />
    </div>
  );
};

export default ScatterGeoChart;
