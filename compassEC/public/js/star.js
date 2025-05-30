/**
 * star.js
 * function： auto scroll
 **/

'use strict';

// dom
const ctx = document.getElementById('myChart').getContext('2d');

const data = {
  labels: ['★★★★★ (5)', '★★★★☆ (5)', '★★★☆☆ (5)', '★★☆☆☆ (5)', '★☆☆☆☆ (5)'],
  datasets: [
    {
      label: '',
      data: [100, 80, 60, 40, 20],
      backgroundColor: '#e40014'
    }
  ]
};

const options = {
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false // ツールチップを非表示
    }
  },
  scales: {
    x: {
      border: {
        display: false
      },
      ticks: {
        callback: function(value, index, values) {
          return '';
        }
      },
      grid: {
        display: false
      }
    },

    y: {
      ticks: {
        color: '#e40014',
        font: {
          size: 12
        },
        beginAtZero: true
      },
      border: {
        display: false
      },
      grid: {
        display: false
      }
    }
  }
};

new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});
