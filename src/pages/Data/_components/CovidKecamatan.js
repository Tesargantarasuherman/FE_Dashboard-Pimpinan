import React, { useEffect, useState } from 'react'
import moment from "moment";
import Chart from 'react-apexcharts';
import axios from 'axios'
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function CovidKecamatan() {
    const [covid, setCovid] = useState([]);
    const [nilai, setNilai] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kodeKecamatan, setKodeKecamatan] = useState(3273180);
    const [namaKecamatan, setNamaKecamatan] = useState('ANDIR');
    const [konfirmasiAktif, setKonfirmasiAktif] = useState([]);
    const [konfirmasiSembuh, setKonfirmasiSembuh] = useState([]);
    const [konfirmasiMeninggal, setKonfirmasiMeninggal] = useState([]);
    const [tanggal, setTanggal] = useState([]);
    // const series = [
    //     {
    //         name: 'Terkonfirmasi',
    //         data: nilai.length > 1 ? nilai : [0, 0, 0, 0]
    //     },
    //     {
    //         name: 'Konsfirmasi Aktif',
    //         data: konfirmasiAktif.length > 1 ? konfirmasiAktif : [0, 0, 0, 0]
    //     },
    //     {
    //         name: 'Konsfirmasi Sembuh',
    //         data: konfirmasiSembuh.length > 1 ? konfirmasiSembuh : [0, 0, 0, 0]
    //     },
    //     {
    //         name: 'Konsfirmasi Meninggal',
    //         data: konfirmasiMeninggal.length > 1 ? konfirmasiMeninggal : [0, 0, 0, 0]
    //     },
    // ]
    // const options = {
    //     chart: {
    //         height: 350,
    //         type: 'area'
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     stroke: {
    //         curve: 'smooth'
    //     },
    //     xaxis: {
    //         type: 'date',
    //         categories: tanggal
    //     },
    // }
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
    useEffect(() => {
        getKecamatan()
        GetCovidByKecamatan()
    }, [])
    const getKecamatan = () => {
        axios.get(`https://covid19.bandung.go.id/api/covid19bdg/v1/wilayah/get?induk=3273`, {
            headers: {
                Authorization: 'RkplDPdGFxTSjARZkZUYi3FgRdakJy',
            }
        }).then(res => {
            setKecamatan(res.data.data)
        })
    }
    const GetCovidByKecamatan = () => {
        axios.get(`https://covid19.bandung.go.id/api/covid19bdg/v1/covid/list?kode=${kodeKecamatan}`, {
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
            setCovid(res.data.data)
            setNilai(dataCovid)
            setKonfirmasiAktif(dataCovidAktif)
            setKonfirmasiSembuh(dataCovidSembuh)
            setKonfirmasiMeninggal(dataCovidMeninggal)
            setTanggal(tanggalCovid)
        })
    }
    const changeKodeKecamatan = (e) => {
        setKodeKecamatan(e.target.value)
        GetCovidByKecamatan()
    }
    return (
        <div className="row my-4">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h6 className="m-0 font-weight-bold ">Grafik PerKecamatan</h6>
                        <div class="form-group">
                            <label>Pilih Kecamatan</label>
                            <select class="form-control" onChange={changeKodeKecamatan}>
                                {
                                    kecamatan.map(kecamatan => {
                                        return (
                                            <option value={kecamatan.kode} onClick={()=>{setNamaKecamatan(kecamatan.nama)}}>{kecamatan.nama}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    nilai.length > 0 ? 
                                    // <Chart options={options} series={series} type="area" height={350} />
                                    <Line options={options} data={data} />

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
            </div>
        </div>)
}

export default CovidKecamatan