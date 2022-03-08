import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import CardProggress from '../components/CardProggress';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'
import data from '../dummy/news.json'
import CardBerita from '../components/CardBerita';
const _news = data.data
function Home() {
    const [news, setNews] = useState(_news)

    let dataAgenda = new Object();
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
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                </div>
                {/* Area Chart */}
                <div className="col-md-4">
                    <div class="card shadow">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                                Jadwal Shalat Hari Ini
                            </h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='w-25 font-weight-bold'>
                                    {timeSalat.Imsak}
                                </h5>
                                <h6 className='w-75'>
                                    Imsak
                                </h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='w-25 font-weight-bold'>
                                    {timeSalat.Fajr}
                                </h5>
                                <h6 className='w-75'>
                                    Subuh
                                </h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='w-25 font-weight-bold'>
                                    {timeSalat.Sunrise}
                                </h5>
                                <h6 className='w-75'>
                                    Terbit
                                </h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='w-25 font-weight-bold'>
                                    {timeSalat.Dhuhr}
                                </h5>
                                <h6 className='w-75'>
                                    Dzuhur
                                </h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='w-25 font-weight-bold'>
                                    {timeSalat.Asr}
                                </h5>
                                <h6 className='w-75'>
                                    Ashar
                                </h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='w-25 font-weight-bold'>
                                    {timeSalat.Maghrib}
                                </h5>
                                <h6 className='w-75'>
                                    Maghrib
                                </h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='w-25 font-weight-bold'>
                                    {timeSalat.Isha}
                                </h5>
                                <h6 className='w-75'>
                                    Isya
                                </h6>
                            </div>
                        </div>
                    </div>
                    {/* <h6 className="font-weight-bold">
                        Berita
                    </h6>
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <Card />
                            </div>
                            <div className="carousel-item">
                                <Card />
                            </div>
                            <div className="carousel-item">
                                <Card />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div> */}


                </div>
                {/* Pie Chart */}
                <div className="col-xl-8 col-lg-8">
                    <div className="card shadow mb-4">
                        {/* Card Header - Dropdown */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                                Agenda
                            </h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        {/* Card Body */}
                        <div className="card-body">
                            <ScheduleComponent currentView='Month'
                                eventSettings={{
                                    dataSource: agenda
                                }}>
                                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                            </ScheduleComponent>
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