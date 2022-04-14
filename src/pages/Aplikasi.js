import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import axios from 'axios'
import data_aplikasi from '../localdata/dataAplikasi.json'

function Aplikasi() {
  const [dataAplikasi, setDataAplikasi] = useState(data_aplikasi.data)
  const [categoryApp, setCategoryApp] = useState([])
  const [klasifikasiApp, setKlasifikasiApp] = useState([])
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
    data: klasifikasiApp
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
    colors: ['#F44336', '#ffb142', '#218c74', '#E91E63', '#9C27B0'],
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
        ['Pengawasan'],
        ['Pengadaan B/J'],
        ['Akuntabilitas Kinerja'],
      ],
      labels: {
        style: {
          colors: ['#F44336', '#ffb142', '#218c74', '#E91E63', '#9C27B0'],
          fontSize: '12px'
        }
      }
    }
  }
  useEffect(() => {
    console.log(dataAplikasi[0]['meta']['detail_aplikasi_bidangsektor'])
    let data = dataAplikasi;
    let category = [];
    let jenis_layanan =[];
    for (let i = 0; i < data.length; i++) {
      category.push(data[i].meta.detail_aplikasi_bidangsektor)
    }
    for (let i = 0; i < data.length; i++) {
      jenis_layanan.push(data[i].meta.detail_aplikasi_jenis_layanan)
    }
    let counter = 0;
    let value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < category.length; i++) {
      if (category[i] == "Kepegawaian") {
        value[0]++;
      }
      if (category[i] == "Keuangan") {
        value[1]++;
      }
      if (category[i] == "Pariwisata") {
        value[2]++;
      }
      if (category[i] == "Pekerjaan & Usaha") {
        value[3]++;
      }
      if (category[i] == "Kependudukan") {
        value[4]++;
      }
      if (category[i] == "Kesehatan") {
        value[5]++;
      }
      if (category[i] == "Lingkungan Hidup") {
        value[6]++;
      }
      if (category[i] == "Instruktur Publik") {
        value[7]++;
      }
      if (category[i] == "Kepemudaan") {
        value[8]++;
      }
      if (category[i] == "Keolahragaan") {
        value[9]++;
      }
      if (category[i] == "Perencanaan") {
        value[10]++;
      }
      if (category[i] == "Perdagangan") {
        value[11]++;
      }
    }
    // value.push(counter)
    setCategoryApp(category)
    setKlasifikasiApp(value)
    console.log('category', value)

    axios.get('https://aplikasi.bandung.go.id/wp-json/api/v1/aplikasi?page=1&per_page=100', {
      headers: {
        Authorization: '261b3b04f89120d8515b57cd1011610b8fd2272a',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Accept': 'application/json'
      }
    }).then(res => {
      console.log(res, 'axiosdd')
    })
  }, [])
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
                  <Chart options={optionsPie} series={seriesPie} type="pie" height={300} style={{ minWidth: '100%' }} />
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
                        <td className="text-center font-weight-bold">{dataAplikasi.length}</td>
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