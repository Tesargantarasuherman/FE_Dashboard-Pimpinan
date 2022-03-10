import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from "moment";
import Chart from 'react-apexcharts';

function Data() {
    const [covid, setCovid] = useState([]);
    const [nilai, setNilai] = useState([]);
    const [konfirmasiAktif, setKonfirmasiAktif] = useState([]);
    const [konfirmasiSembuh, setKonfirmasiSembuh] = useState([]);
    const [konfirmasiMeninggal, setKonfirmasiMeninggal] = useState([]);
    const [tanggal, setTanggal] = useState([]);
    const series = [
        {
            name: 'Terkonfirmasi',
            data: nilai
        },
        {
            name: 'Konsfirmasi Aktif',
            data: konfirmasiAktif
        },
        {
            name: 'Konsfirmasi Sembuh',
            data: konfirmasiSembuh
        },
        {
            name: 'Konsfirmasi Meninggal',
            data: konfirmasiMeninggal
        },
    ]
    const options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'date',
            categories: tanggal
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    }
    useEffect(() => {
        getCovid()
    }, [])
    const getCovid = () => {
        axios.get(`https://covid19.bandung.go.id/api/covid19bdg/v1/covidsummary/list`, {
            headers: {
                Authorization: 'RkplDPdGFxTSjARZkZUYi3FgRdakJy',
            }
        }).then(res => {
            let data = res.data.data
            let tanggalCovid = []
            let dataCovid = []
            let dataCovidAktif = []
            let dataCovidSembuh = []
            let dataCovidMeninggal = []
            for (let i = 0; i < data.length; i++) {
                dataCovid.push(data[i].positif)
                dataCovidAktif.push(data[i].positif_dirawat)
                dataCovidSembuh.push(data[i].sembuh)
                dataCovidMeninggal.push(data[i].meninggal)
                tanggalCovid.push(moment(data[i].date).format("LL"))
            }
            console.log(dataCovid)
            setCovid(res.data.data)
            setNilai(dataCovid)
            setKonfirmasiAktif(dataCovidAktif)
            setKonfirmasiSembuh(dataCovidSembuh)
            setKonfirmasiMeninggal(dataCovidMeninggal)
            setTanggal(tanggalCovid)
        }
        )
    }
    return (
        <div className="container-fluid">
            <h6 className="m-0 font-weight-bold ">Data Covid</h6>
            <div className="row my-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="m-0 font-weight-bold ">Grafik Covid-19 di Kota Bandung</h6>
                            {
                                nilai.length > 0 ? <Chart options={options} series={series} type="area" height={350} />
                                    :
                                    <div className=' d-flex justify-content-center my-4'>
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="m-0 font-weight-bold ">Tabel Covid di Kota Bandung</h6>

                            <table className="table table-striped table-responsive mt-4" style={{ maxHeight: 700 }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Tanggal</th>
                                        <th scope="col">Kontak Erat</th>
                                        <th scope="col">Kontak Erat Discarded</th>
                                        <th scope="col">Suspek</th>
                                        <th scope="col">Suspek Discarded </th>
                                        <th scope="col">Terkonfirmasi</th>
                                        <th scope="col">Terkonfirmasi Aktif</th>
                                        <th scope="col">Terkonfirmasi Sembuh</th>
                                        <th scope="col">Terkonfirmasi Meninggal</th>
                                    </tr>
                                </thead>
                                {
                                    covid.length > 0 ?
                                        <tbody>
                                            {
                                                covid?.map((covid, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{moment(covid.date).format("DD/MM/YY")}</td>
                                                            <td>{covid.dkontak_erat}</td>
                                                            <td>{covid.dkontak_erat_discarded}</td>
                                                            <td>{covid.dsuspek}</td>
                                                            <td>{covid.dsuspek_discarded}</td>
                                                            <td>{covid.positif}</td>
                                                            <td>{covid.positif_dirawat}</td>
                                                            <td>{covid.sembuh}</td>
                                                            <td>{covid.meninggal}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                        :
                                        <div className=' d-flex justify-content-center my-4'>
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                }

                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Data