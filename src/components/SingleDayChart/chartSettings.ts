export const chartSettings = {
    height: 300,
    margin: { top: 20, right: 20, bottom: 30, left: 40 },
    grid: {
      horizontal: true,
      vertical: false,
    },
    sx: {
      '& .MuiChartsAxis-label': {
        fontSize: 14,
        fill: '#555',
      },
      '& .MuiChartsLegend-root': {
        marginTop: 2,
      },
    },
  };


export default chartSettings;