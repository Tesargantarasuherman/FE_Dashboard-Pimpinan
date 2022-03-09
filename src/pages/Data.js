import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from "moment";

function Data() {
    const [covid, setCovid] = useState([])
    useEffect(() => {
        getCovid()
    }, [])
    const getCovid = () => {
        axios.get(`https://covid19.bandung.go.id/api/covid19bdg/v1/covidsummary/list`, {
            headers: {
                Authorization: 'RkplDPdGFxTSjARZkZUYi3FgRdakJy',
            }
        }).then(res => {
            console.log(res.data.data)
            // let data = res.data.data
            // let dataCovid = []
            // for (let i = 0; i < data.length; i++) {
            //     dataCovid.push({ daktif: data[i].daktif })
            // }
            setCovid(res.data.data)
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
                            <table className="table table-striped table-responsive" style={{maxHeight:700}}>
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
                                <tbody>
                                    {
                                        covid?.map((covid, i) => {
                                            return(
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
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Data