import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import index_spbe from '../../../localdata/indexSbpe.json'
import index_spbe_pertahun from '../../../localdata/indexSbpePertahun.json'
import DatePicker from "react-datepicker";

function IndeksSpbe() {
  const [indexSpbe, setIndexSpbe] = useState([]);
  const [nilaiSpbe, setNilaiSpbe] = useState([]);
  const [daftarSpbe, setDaftarSpbe] = useState([]);
  const [indexSpbePertahun, setIndexSpbePertahun] = useState([]);
  const [active, setactive] = useState({ active: 'table' });
  const [startDate, setStartDate] = useState(new Date());
  const [formSkalaNilai, setFormSkalaNilai] = useState(null);
  const [tambah, setTambah] = useState(null)
  const [nilaiPertahun, setNilaiPertahun] = useState(null)

  const setTambahData = (id) => {
    setTambah(id)
    setFormSkalaNilai(null)
  }
  const setBatalTambahData = (id) => {
    setTambah(id)
    setFormSkalaNilai(id)
  }
  const tambahSkalaNilai = (id) => {
    let data = {
      id_indikator: id,
      tahun: startDate.getFullYear(),
      skala_nilai: parseInt(formSkalaNilai),
    }
    axios.post(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/add-index-spbe`, data).then(res => {
      getIndexPertahun(data.tahun)
      setTambah(null)
    }).catch(err => {
      console.log(err)
    })
  }

  const getNilaiPertahun = (year) => {
    axios.get(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/get-nilai-index/${year}`).then(res => {
      setNilaiPertahun(res.data.data[0].hasil_index,)
    })
  }

  useEffect(() => {
    let year = startDate.getFullYear()
    console.log(startDate, 'tahun')
    getNilaiPertahun(year)
    getIndikatorSPBE()
    getIndexPertahun(year)
    // let nama_spbe = indexSpbe
    // let index_spbe = index_spbe_pertahun.data.data
    // let data_spbe = [];
    // let _nama_spbe = [];
    // for (let i = 0; i < nama_spbe.length; i++) {
    //   _nama_spbe.push([nama_spbe[i].nama_indikator]);
    // }
    // for (let i = 0; i < index_spbe.length; i++) {
    //   data_spbe.push(index_spbe[i].skala_nilai);
    // }
    // console.log(indexSpbe)
    // setDaftarSpbe(_nama_spbe)
    // setIndexSpbePertahun(data_spbe)
    console.log(index_spbe_pertahun.data.data, 'nama_spbe')
  }, [])
  const getIndikatorSPBE = () => {
    axios.get(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/get-master-indikator-spbe`).then(res => {
      setIndexSpbe(res.data.data)
    })
  }
  const getIndexPertahun = (value) => {
    axios.get(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/get-index-spbe/${value}`).then(res => {
      console.log(res.data.data, 'index')
      setNilaiSpbe(res.data.data)
    })
  }
  const setYear = (year) => {
    setFormSkalaNilai('')
    let _year = year.getFullYear()
    setStartDate(year)
    getIndexPertahun(_year)
    getNilaiPertahun(_year)
  }
  const series = [{
    name: 'Nilai Indeks',
    data: [0, 3.11, 3.72, 3.72, 3.19]
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
            <h6 className="m-0 font-weight-bold mb-4">Tabel Index SPBE {startDate.getFullYear()}</h6>
            <table className="table table-striped">
              <thead>
                <tr style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  <th scope="col">#</th>
                  <th scope="col">Nama Indikator</th>
                  <th scope="col">Tahun</th>
                  <th scope="col">Bobot</th>
                  <th scope="col">Skala Nilai</th>
                  <th scope="col">Index</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  indexSpbe.map((data, index) => {
                    return (
                      //   nilaiSpbe.map((nilai) => {
                      <tr style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.nama_indikator}</td>
                        <td>{startDate.getFullYear()}</td>
                        <td>{data.bobot}</td>
                        <td>
                          {
                            index == tambah ?
                              <input type="number" min={1} max={5} required onChange={(e) => setFormSkalaNilai(e.target.value)} value={formSkalaNilai} readOnly={nilaiSpbe[index]?.id_indikator == data.id ? true : false} class="form-control" placeholder="Nilai" style={{ maxWidth: 80, maxHeight: 25 }} />
                              : (
                                nilaiSpbe[index]?.id_indikator == data.id ? nilaiSpbe[index].skala_nilai :
                                  <p className="font-weight-bold text-gray-800">Belum Diisi</p>
                              )
                          }
                        </td>
                        <td>
                          {nilaiSpbe[index]?.id_indikator == data.id ? nilaiSpbe[index].index_nilai : ''}
                        </td>
                        <td>
                          {
                            nilaiSpbe[index]?.id_indikator == data.id ?
                              <p className="font-weight-bold text-gray-800">Sudah diisi</p>
                              // <button className="btn btn-primary btn-sm mr-2" onClick={null}>Ubah</button>
                              : (
                                index == tambah ?
                                  <>
                                    <button className="btn btn-primary btn-sm mr-2" onClick={() => tambahSkalaNilai(data.id)}>Tambah</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => setBatalTambahData(null)}>Batal</button>
                                  </>
                                  :
                                  <button className="btn btn-primary btn-sm" onClick={() => setTambahData(index)}>Tambah</button>
                              )
                          }
                        </td>
                      </tr>
                      //   })
                    )
                  })
                }
                <tr className="font-weight-bold">
                  <td colSpan={4}>Total Index</td>
                  <td>{nilaiPertahun}</td>
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
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setYear(date)}
                  showYearPicker
                  dateFormat="yyyy"
                />
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