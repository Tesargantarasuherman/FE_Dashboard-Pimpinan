import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import index_spbe from '../../../localdata/indexSbpe.json'
import index_spbe_pertahun from '../../../localdata/indexSbpePertahun.json'

function IndeksSpbe() {
  const [indexSpbe, setIndexSpbe] = useState(index_spbe.data);
  const [daftarSpbe, setDaftarSpbe] = useState([]);
  const [indexSpbePertahun, setIndexSpbePertahun] = useState([]);
  const [active, setactive] = useState({ active: 'chart' });

  useEffect(() => {
    let nama_spbe = indexSpbe
    let index_spbe = index_spbe_pertahun.data.data
    let data_spbe = [];
    let _nama_spbe = [];
    for (let i = 0; i < nama_spbe.length; i++) {
      _nama_spbe.push([nama_spbe[i].nama_indikator]);
    }
    for (let i = 0; i < index_spbe.length; i++) {
      data_spbe.push(index_spbe[i].skala_nilai);
    }
    // console.log(indexSpbe)
    setDaftarSpbe(_nama_spbe)
    setIndexSpbePertahun(data_spbe)
    console.log(index_spbe_pertahun.data.data, 'nama_spbe')
  }, [])
  const series = [{
    name: 'Nilai Indeks',
    data: [0, 3, 4, 5, 3.5, 4]
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
  const seriesSpbe = [{
    data: indexSpbePertahun,
  }]
  const optionsSpbe = {
    chart: {
      height: 800,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          alert('run')
        }
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
      '#f48024', '#69d2e7'
    ],
    plotOptions: {
      bar: {
        barHeight: '100%',
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 0.5,
      colors: ['#fff']
    },
    xaxis: {
      categories:
        daftarSpbe,
    },
    yaxis: {
      labels: {
        show: true
      },
      max: 5
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }
    }
  }
  const renderSwitch = (active) => {
    switch (active) {
      case "chart":
        return (
          <div className="card-body" >
            <Chart options={optionsSpbe} series={seriesSpbe} type="bar" height={1000} />
          </div>
        );
      case "table":
        return (
          <div className="card-body">
            <h6 className="m-0 font-weight-bold ">Tabel Index SPBE</h6>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nama Indikator</th>
                  <th scope="col">Bobot</th>
                  <th scope="col">Skala Nilai</th>
                  <th scope="col">Index</th>
                </tr>
              </thead>
              <tbody>
                {
                  index_spbe_pertahun.data.data.map((data, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{data.nama_indikator}</td>
                        <td>{data.skala_nilai}</td>
                        <td>{data.skala_nilai}</td>
                        <td>{data.skala_nilai}</td>
                      </tr>
                    )
                  })
                }
                <tr className="font-weight-bold">
                  <td colSpan={4}>Total Index</td>
                  <td>3.5</td>
                </tr>
              </tbody>
            </table>

          </div>
        );
      default:
        return (
          active.active
        );
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h6 className="m-0 font-weight-bold ">Indeks SPBE</h6>
          <Chart options={options} series={series} type="area" height={300} />
        </div>
      </div>
      <div className="card my-4">
        <div className="card-body">
          <h6 className="m-0 font-weight-bold ">Indeks SPBE Tahunan</h6>
          <div className="col-md-12">
            <div className="card">
              <div className="form-group my-2 mx-2">
                <label htmlFor="exampleFormControlSelect1">Pilih Tahun</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>2021</option>
                </select>
              </div>
              <div className="d-flex justify-content-end my-4 mr-4">
                <button className={`btn ${active.active == 'chart' ? 'btn-primary btn-sm' : 'btn-light'} px-4 mr-4`} onClick={() => setactive({ active: 'chart' })}>Grafik</button>
                <button className={`btn ${active.active == 'table' ? 'btn-primary btn-sm' : 'btn-light'} px-4`} onClick={() => setactive({ active: 'table' })}>Tabel</button>
              </div>
              {renderSwitch(active.active)}
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  )
}

export default IndeksSpbe