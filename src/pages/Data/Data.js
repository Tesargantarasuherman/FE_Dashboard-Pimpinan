import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from "moment";
import Chart from 'react-apexcharts';
import CovidKecamatan from './_components/CovidKecamatan';
import Card from '../../components/Card';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CardProggress from '../../components/CardProggress';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Data() {
    const [covid, setCovid] = useState([]);
    const [covidUpdate, setCovidUpdate] = useState([]);
    const [nilai, setNilai] = useState([]);
    const [konfirmasiAktif, setKonfirmasiAktif] = useState([]);
    const [konfirmasiSembuh, setKonfirmasiSembuh] = useState([]);
    const [konfirmasiMeninggal, setKonfirmasiMeninggal] = useState([]);
    const [tanggal, setTanggal] = useState([]);
    const [active, setactive] = useState({ active: 'chart' });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Grafik Perkembangan Covid-19 di Kota Bandung',
            },
        },
    };

    const labels = tanggal;

    const data = {
        labels,
        datasets: [
            {
                label: 'Terkonfirmasi',
                data: nilai.length > 1 ? nilai : [0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Konsfirmasi Aktif',
                data: konfirmasiAktif.length > 1 ? konfirmasiAktif : [0, 0, 0, 0],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Konsfirmasi Sembuh',
                data: konfirmasiSembuh.length > 1 ? konfirmasiSembuh : [0, 0, 0, 0],
                backgroundColor: 'rgb(139,200,143)',
            },
            {
                label: 'Konsfirmasi Meninggal',
                data: konfirmasiMeninggal.length > 1 ? konfirmasiMeninggal : [0, 0, 0, 0],
                backgroundColor: 'rgb(254,136,66)',
            },
        ],
    };
    const renderSwitch = (active) => {
        switch (active) {
            case "chart":
                return (
                    <div className="card-body" >
                        {
                            nilai.length > 0 ?
                                <Line options={options} data={data} />
                                :
                                <div className=' d-flex justify-content-center my-4'>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>

                        }
                    </div>
                );
            case "table":
                return (
                    <div className="card-body">
                        <h6 className="m-0 font-weight-bold ">Tabel Covid di Kota Bandung</h6>
                        <table className="table table-striped table-responsive mt-4" style={{ maxHeight: 500 }}>
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
                );
            default:
                return (
                    active.active
                );
        }
    };
    useEffect(() => {
        getCovid()
        getUpdateCovid()
    }, [])
    const getUpdateCovid = () => {
        axios.get(`https://covid19.bandung.go.id/api/covid19bdg/v1/covidsummary/get`, {
            headers: {
                Authorization: 'RkplDPdGFxTSjARZkZUYi3FgRdakJy',
            }
        }).then(res => {
            console.log('update', res.data.data)
            setCovidUpdate(res.data.data)
        })
    }
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
                tanggalCovid.push(moment(data[i].date).format("LL"))
            }
            for (let i = 0; i < data.length; i++) {
                dataCovid.push(data[i].positif)
                dataCovidAktif.push(data[i].positif_dirawat)
                dataCovidSembuh.push(data[i].sembuh)
                dataCovidMeninggal.push(data[i].meninggal)
            }
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
            <h6 className="m-0 font-weight-bold ">Data Covid-19</h6>
            <label htmlFor="">Update Terakhir, {moment(covidUpdate.date).format("LL")}</label>
            <div className="row my-4">
                <Card icon={<i class="fa fa-lg fa-asterisk" aria-hidden="true"></i>} iconProgress={covidUpdate.dpositif > 0 ? <i className='fa fa-lg fa-angle-double-up'> </i> : <i className='fa fa-lg fa-angle-double-down'> </i>} valueProgress={covidUpdate?.dpositif?.toLocaleString()} title={'Total Konfirmasi'} value={covidUpdate?.positif?.toLocaleString()} color={'primary'} col={3} type={'border-left'} bgItem={'bg'} />
                <Card icon={<i class="fa fa-lg fa-asterisk" aria-hidden="true"></i>} iconProgress={covidUpdate.daktif > 0 ? <i className='fa fa-lg fa-angle-double-up'> </i> : <i className='fa fa-lg fa-angle-double-down'> </i>} valueProgress={covidUpdate?.daktif?.toLocaleString()} title={'Konfirmasi Aktif'} value={covidUpdate?.positif_dirawat?.toLocaleString()} color={'primary'} col={3} type={'border-left'} bgItem={'bg'} />
                <Card icon={<i class="fa fa-lg fa-asterisk" aria-hidden="true"></i>} iconProgress={covidUpdate.dsembuh > 0 ? <i className='fa fa-lg fa-angle-double-up'> </i> : <i className='fa fa-lg fa-angle-double-down'> </i>} valueProgress={covidUpdate?.dsembuh?.toLocaleString()} title={'Konfirmasi Sembuh'} value={covidUpdate?.sembuh?.toLocaleString()} color={'primary'} col={3} type={'border-left'} bgItem={'bg'} />
                <Card icon={<i class="fa fa-lg fa-asterisk" aria-hidden="true"></i>} iconProgress={covidUpdate.dmeninggal > 0 ? <i className='fa fa-lg fa-angle-double-up'> </i> : <i className='fa fa-lg fa-angle-double-down'> </i>} valueProgress={covidUpdate?.dmeninggal?.toLocaleString()} title={'Konfirmasi Meninggal'} value={covidUpdate?.meninggal?.toLocaleString()} color={'primary'} col={3} type={'border-left'} bgItem={'bg'} />
                <CardProggress title={'Suspek'} total={covidUpdate.suspek} totalProgress={covidUpdate.dsuspek } dipantau={covidUpdate.suspek_dipantau} dipantauProgress={covidUpdate.dsuspek_dipantau} discarded={covidUpdate.suspek_discarded} discardedProgress={covidUpdate.dsuspek_discarded} />
                <CardProggress title={'Kontak Erat'} total={covidUpdate.kontak_erat} totalProgress={covidUpdate.dkontak_erat} dipantau={covidUpdate.kontak_erat_dipantau} dipantauProgress={covidUpdate.dkontak_erat_dipantau} discarded={covidUpdate.kontak_erat_discarded} discardedProgress={covidUpdate.dkontak_erat_discarded} />
                <div className="col-md-12">
                    <div className="card">
                        <div className="d-flex justify-content-end my-4 mr-4">
                            <button className={`btn ${active.active == 'chart' ? 'btn-primary btn-sm' : 'btn-light'} px-4 mr-4`} onClick={() => setactive({ active: 'chart' })}>Grafik</button>
                            <button className={`btn ${active.active == 'table' ? 'btn-primary btn-sm' : 'btn-light'} px-4`} onClick={() => setactive({ active: 'table' })}>Tabel</button>
                        </div>
                        {renderSwitch(active.active)}
                    </div>
                </div>
            </div>
            <CovidKecamatan />
        </div>

    )
}

export default Data