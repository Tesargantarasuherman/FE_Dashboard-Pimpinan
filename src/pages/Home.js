import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import CardProggress from '../components/CardProggress';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'

function Home() {
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
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate
                </a>
            </div>
            {/* Content Row */}
            <div className="row">
                {/* Earnings (Monthly) Card Example */}
                <Card />
                {/* Earnings (Monthly) Card Example */}
                <Card />
                {/* Earnings (Monthly) Card Example */}
                <CardProggress />
                {/* Pending Requests Card Example */}
                <Card />
            </div>
            {/* Content Row */}
            <div className="row">
                {/* Area Chart */}
                <div className="col-xl-4 col-lg-6">
                    <div className="card shadow mb-4">
                        {/* Card Header - Dropdown */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                                Waktu Shalat Hari Ini
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
                            <table className="table table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">Imsak</th>
                                        <th scope="col">Subuh</th>
                                        <th scope="col">Terbit</th>
                                        <th scope="col">Duhur</th>
                                        <th scope="col">Asar</th>
                                        <th scope="col">Magrib</th>
                                        <th scope="col">Isya</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{timeSalat.Imsak}</td>
                                        <td>{timeSalat.Fajr}</td>
                                        <td>{timeSalat.Sunrise}</td>
                                        <td>{timeSalat.Dhuhr}</td>
                                        <td>{timeSalat.Asr}</td>
                                        <td>{timeSalat.Maghrib}</td>
                                        <td>{timeSalat.Isha}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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
            </div>
        </div>
    )
}

export default Home