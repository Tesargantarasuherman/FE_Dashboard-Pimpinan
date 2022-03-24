import React, { useEffect } from 'react'
import Chart from 'react-apexcharts';
import axios from 'axios'
function Aplikasi() {
  const seriesPie = [21, 22]

  const optionsPie = {
    chart: {
      width: 380,
      type: 'pie',
    },
    colors: ['#ffb142', '#E91E63'],
    labels: ['Layanan Publik', 'Administrasi Pemerintahan'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]

  }
  const series = [{
    name: 'Jumlah',
    data: [21, 22, 10, 28, 16, 21, 13, 30,45,42,12,31,34,32,21,32,26,25]
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
    colors: ['#F44336','#ffb142','#218c74', '#E91E63', '#9C27B0'],
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
        ['Kepegawaian'],
        ['Keuangan'],
        ['Pariwisata'],
        ['Usaha'],
        ['Kependudukan'],
        ['Kesehatan'],
        ['Lingkungan'],
        ['Instruktur Publik'],
        ['Kepemudaan'],
        ['Keolahragaan'],
        ['Perencanaan'],
        ['Perdagangan'],
        ['Website'],
        ['Perhubungan'],
        ['Jaminan Sosial'],
        ['Ketenagakerjaan'],
        ['Kewilayahan'],
        ['Kearsipan'],
      ],
      labels: {
        style: {
          colors: ['#F44336','#ffb142','#218c74', '#E91E63', '#9C27B0'],
          fontSize: '12px'
        }
      }
    }
  }
  useEffect(()=>{
    axios.get('https://aplikasi.bandung.go.id/wp-json/wp/v2/aplikasi?page=1&&per_page=100').then(res=>{
      console.log(res,'axios')
    })
  })
  return (
    <div className="container-fluid">
      <h6 className="m-0 font-weight-bold ">Aplikasi</h6>
      <div className="row my-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h6 className="m-0 font-weight-bold">
                Grafik Berdasarkan Pelayanan
              </h6>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Chart options={optionsPie} series={seriesPie} type="pie" height={300} style={{minWidth:'100%'}} />
                </div>
                <div className="col-md-8">
                  <table class="table table-bordered">
                    <thead>
                      <tr className='text-center'>
                        <th scope="col">Layanan Publik</th>
                        <th scope="col">Administrasi Pemerintahan</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="text-center font-weight-bold">
                            21<br />
                            48.8%
                          </p>
                        </td>
                        <td>
                          <p className="text-center font-weight-bold">
                            22<br />
                            51.2%
                          </p>
                        </td>
                        <td className="text-center font-weight-bold">43</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h6 className="m-0 font-weight-bold">
                Grafik Berdasarkan Bidang/Sektor
              </h6>
              <div className="row">
                <div className="col-md-12">
                  <Chart options={options} series={series} type="bar" height={300} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Aplikasi