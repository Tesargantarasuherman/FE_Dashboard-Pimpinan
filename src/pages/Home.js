import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import CardProggress from '../components/CardProggress';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'
import data from '../dummy/news.json'
import CardBerita from '../components/CardBerita';
import Chart from 'react-apexcharts';
import { FaMosque } from "react-icons/fa";
const _news = data.data
function Home() {
    const [news, setNews] = useState(_news)

    const series = [{
        name: 'Jumlah',
        data: [21, 22, 10, 28, 16, 21, 13, 30]
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
        colors: [ '#E91E63', '#9C27B0','#1dd1a1','#F44336','#feca57','#01a3a4','#34ace0','#227093'],
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
                ['Aplikasi'],
                ['SDM'],
                ['CCTV'],
                ['IKM'],
                ['Tower'],
                ['Section A'],
                ['Section B'],
                ['Section C'],
            ],
            labels: {
                style: {
                    colors: ['#F44336', '#9C27B0','#1dd1a1', '#E91E63','#feca57','#01a3a4','#34ace0','#227093'],
                    fontSize: '12px'
                }
            }
        }
    }
    let _dataAgenda = [];
    const [timeSalat, setTimeSalat] = useState([]);
    const [agenda, setAgenda] = useState(null);
    const [data, setData] = useState([
        {
            id: "1",
            perihal: "Bimbingan Teknis 1",
            lokasi: "Bandung",
            tanggal_mulai: "2022-02-01",
            tanggal_selesai: "2022-02-02",
            jam_mulai: "08:30:00",
            jam_selesai: "12:00:00",
        },
        {
            id: "2",
            perihal: "Bimbingan Teknis Lanjutan",
            lokasi: "Bandung",
            tanggal_mulai: "2022-02-10",
            tanggal_selesai: "2022-02-11",
            jam_mulai: "08:30:00",
            jam_selesai: "12:00:00",
        },
        {
            id: "3",
            perihal: "Bimbingan Teknis Lanjutan 3",
            lokasi: "Bandung",
            tanggal_mulai: "2022-02-13",
            tanggal_selesai: "2022-02-14",
            jam_mulai: "08:30:00",
            jam_selesai: "12:00:00",
        }
    ]);

    useEffect(() => {
        Axios.get(`https://api.pray.zone/v2/times/today.json?city=bandung`).then(res => {
            let salat = res.data.results.datetime[0].times
            setTimeSalat(salat)
        })
        for (let i = 0; i < data.length; i++) {
            _dataAgenda.push({ Id: data[i].id, Subject: data[i].perihal, StartTime: data[i].tanggal_mulai + ' ' + data[i].jam_mulai, EndTime: data[i].tanggal_selesai + ' ' + data[i].jam_selesai })
        }
        setAgenda(_dataAgenda)
        console.log(_dataAgenda)
    }, [])
    return (
        <div className="container-fluid">
            <h6 className="m-0 font-weight-bold ">Beranda</h6>
            <div className="row my-4">
                <div className="col-md-12">
                    <div className="row">
                        <Card icon={<i class="fa fa-lg fa-building" aria-hidden="true"></i>} title={'Indeks Smart City'} value={3.21} color={'primary'} col={3} type={'border-left'} bgItem={'bg'} />
                        <Card icon={<i class="fa fa-lg fa-list" aria-hidden="true"></i>} title={'Indeks SPBE'} value={3.21} color={'info'} col={3} type={'border-left'} bgItem={'bg'} />
                        <Card icon={<i class="fa fa-lg fa-users" aria-hidden="true"></i>} title={'Indeks KAMI'} value={3.21} color={'warning'} col={3} type={'border-left'} bgItem={'bg'} />
                        <Card icon={<i class="fa fa-lg fa-info-circle" aria-hidden="true"></i>} title={'Indeks KIP'} value={3.21} color={'danger'} col={3} type={'border-left'} bgItem={'bg'} />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-9">
                            <div class="card shadow">
                                <div className="card-body">
                                    <h6 className="m-0 font-weight-bold">
                                        Statistik
                                    </h6>
                                    <Chart options={options} series={series} type="bar" height={300} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Card icon={<i class="fa fa-2x fa-calendar" aria-hidden="true"></i>} title={'Selasa'} value={`02 Maret`} color={'danger'} />
                            <Card icon={<i class="fa fa-2x" aria-hidden="true"> <FaMosque /></i>} title={'Ashar'} value={`15:06`} color={'danger'} />
                            <Card icon={<i class="fa fa-2x fa-sun" aria-hidden="true"></i>} title={'Suhu'} value={`24 Derajat`} color={'danger'} />
                        </div>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-12 col-md-12">
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <h6 className="m-0 font-weight-bold text-secondary">
                                Agenda
                            </h6>
                            <div className="row mt-4">
                                <div className="col-md-8">
                                    <ScheduleComponent currentView='Month'
                                        eventSettings={{
                                            dataSource: agenda
                                        }}>
                                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                                    </ScheduleComponent>
                                </div>
                                <div className="col-md-4">
                                    <h6 className="m-0 font-weight-bold text-secondary">
                                        23 Maret 2022
                                    </h6>
                                    <div className="mt-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    09:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 1
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    11:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 2
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    13:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 3
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    14:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 4
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    15:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 5
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    16:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 6
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    17:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 7
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='w-25'>
                                                <h5 className='font-weight-bold'>
                                                    18:00
                                                </h5>
                                            </div>
                                            <div className='w-75'>
                                                <h6 className='font-weight-bold m-0'>
                                                    Kegiatan 7
                                                </h6>
                                                <h6>
                                                    Zoom Meeting
                                                </h6>
                                            </div>
                                        </div>
                                        <hr className="m-0"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                                Berita
                            </h6>
                            <div className="card-body">

                                <div className="row">
                                    {
                                        news.map(news => {
                                            return (
                                                <div className="col-md-3 my-2">
                                                    <CardBerita news={news} />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Home