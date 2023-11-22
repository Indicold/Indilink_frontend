/* The code is importing the React library and the Plot component from the 'react-plotly.js' library.
The React library is used to create and manage React components, while the Plot component is a React
wrapper for the Plotly.js library, which allows for the creation of interactive charts and graphs. */
import React from 'react';
import Plot from 'react-plotly.js';

const ScatterGeoChart = () => {
  /* The `const data` variable is an array that contains an object. This object represents the data for
  the scattergeo chart. */
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

  /* The `const layout` variable is an object that defines the layout options for the scattergeo chart.
  In this case, it specifies the geographical scope of the chart to be 'europe' and sets the
  resolution to 100. The 'scope' property determines the region to display on the chart, and the
  'resolution' property determines the level of detail in the map. */
  const layout = {
    geo: {
      scope: ['europe'],
      resolution: 100,
    },
  };

  const chartStyle = {
    width: '100%', // Set the width to 100% of the container
  };

  /* The `return` statement in the code is returning a JSX element. JSX is a syntax extension for
  JavaScript that allows you to write HTML-like code within JavaScript. In this case, the JSX
  element is a `<div>` element that contains a `<Plot>` component. */
  return (
    <div>
      <Plot data={data} layout={layout} config={{ displayModeBar: false }} style={chartStyle} />
    </div>
  );
};

export default ScatterGeoChart;
