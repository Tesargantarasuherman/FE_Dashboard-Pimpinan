import React from 'react'
import Chart from 'react-apexcharts';

function IndeksSpbe() {
  const series = [{
    name: 'Nilai Indeks',
    data: [0,3,4,5,3.5,4]
  }]
  const options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        }
      }
    },
    colors: ['#227093'],
    plotOptions: {
      bar: {
        columnWidth: '50%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        [2017],
        [2018],
        [2019],
        [2020],
        [2021],
        [2022],
      ],
      labels: {
        style: {
          colors: ['#227093'],
          fontSize: '12px'
        }
      }
    }
  }
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h6 className="m-0 font-weight-bold ">Indeks SPBE</h6>
          <Chart options={options} series={series} type="area" height={300} />

        </div>
      </div>
    </div>
  )
}

export default IndeksSpbe