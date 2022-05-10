import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import CardProggress from '../components/CardProggress';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'
import data from '../dummy/news.json'
import CardBerita from '../components/CardBerita';
import Chart from 'react-apexcharts';
import { FaMosque } from "react-icons/fa";
import axios from 'axios';

const _news = data.data
function Home() {
    const [user, setUser] = useState(useState(JSON.parse(localStorage.getItem('data'))))
    const [token, setToken] = useState(null)
    const [password, setPassword] = useState('')

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
        colors: ['#E91E63', '#9C27B0', '#1dd1a1', '#F44336', '#feca57', '#01a3a4', '#34ace0', '#227093'],
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
                    colors: ['#F44336', '#9C27B0', '#1dd1a1', '#E91E63', '#feca57', '#01a3a4', '#34ace0', '#227093'],
                    fontSize: '12px'
                }
            }
        }
    }
    let _dataAgenda = [];
    const [timeSalat, setTimeSalat] = useState([]);
    const [weather, setWeather] = useState([]);
    const [agenda, setAgenda] = useState(null);
    const [data, setData] = useState([]);
    var today = new Date();
    const [dateBefore, setDateBefore] = useState('2019-01-01');
    const [dateNow, setDateNow] = useState(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const getAgenda = () => {
        var today = new Date();
        var start_date = `2019-01-01`;
        var end_date = `2022-01-01`;
        var date_now = today.getFullYear() + '-' + (today.getMonth() ) + '-' + today.getDate();
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "surol=1m5l1g0p6eacprvchqecskf5qm593tup");

        var formdata = new FormData();
        formdata.append("token", user[0].token);
        formdata.append("start", start_date);
        formdata.append("end", date_now);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch("http://localhost:8001/api/v1/agenda/kegiatan", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(user[0].token)
                console.log('data', result)
                let _data = result;
                for (let i = 0; i < _data.length; i++) {
                    _dataAgenda.push({ Id: _data[i].id, Subject: _data[i].perihal, StartTime: _data[i].tanggal_mulai + ' ' + _data[i].jam_mulai, EndTime: _data[i].tanggal_selesai + ' ' + _data[i].jam_selesai })
                }
                setAgenda(_dataAgenda)
            })
            .catch(error => console.log('error', error));
    }
    const getWeather = () => {
        axios.get(`http://localhost:8001/api/v1/cuaca`).then(res => {
            console.log('cuaca', res.data.response.data.main)
            setWeather(res.data.response.data.main)

        })
    }
    const getAgendaKegiatan = () => {
        var formdata = new FormData();
        var today = new Date();
        var start_date = `2019-01-01`;
        var end_date = `2022-01-01`;
        var date_now = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate();
        formdata.append("token", user[0].data.token);
        formdata.append("start", start_date);
        formdata.append("end", end_date);

        axios.post(`http://localhost:8001/api/v1/agenda/kegiatan`, formdata).then(res => {
            console.log(res.data)
            let _data = res.data;
            for (let i = 0; i < _data.length; i++) {
                _dataAgenda.push({ Id: _data[i].id, Subject: _data[i].perihal, StartTime: _data[i].tanggal_mulai + ' ' + _data[i].jam_mulai, EndTime: _data[i].tanggal_selesai + ' ' + _data[i].jam_selesai })
            }
            setAgenda(_dataAgenda)
        })
    }

    useEffect(() => {
        let date = new Date()
        var h = date.getHours();
        var h = date.getHours();
        getAgendaKegiatan();

        axios.get(`https://api.pray.zone/v2/times/today.json?city=bandung`).then(res => {
            console.log(h)
            let salat = res.data.results.datetime[0].times
            setTimeSalat(salat)
        })
        // getAgenda()
        getWeather()
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
                            <Card icon={<i class="fa fa-2x fa-sun" aria-hidden="true"></i>} title={'Suhu'} value={weather.temp} color={'danger'} />
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
                                        {date}
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
                                        <hr className="m-0" />
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
                                        <hr className="m-0" />
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
                                        <hr className="m-0" />
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
                                        <hr className="m-0" />
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
                                        <hr className="m-0" />
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
                                        <hr className="m-0" />
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
                                        <hr className="m-0" />
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
                                        <hr className="m-0" />
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