import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const position = [51.505, -0.09]

function CCTV() {
  const [cctv, setCCTV] = useState([])
  const [viewport, setViewPort] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 14,
    width: '900px',
    height: '600px',
    zIndex: 999
  })
  useEffect(() => {
    axios.get(`https://pelindung.bandung.go.id:8443/api/cek`).then(res => {
      console.log(res.data, 'data')
      setCCTV(res.data)
    })
  }, [])


  return (
    <div className="container-fluid">
      <h6 className="m-0 font-weight-bold ">Data CCTV</h6>
      <div className="row my-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h6 className="m-0 font-weight-bold ">Tabel CCTV di Kota Bandung ({cctv.length})</h6>
              <table className="table table-striped table-responsive mt-4" style={{ maxHeight: 700 }}>
                <thead>
                  <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Dinas</th>
                    <th scope="col">Status</th>
                    <th scope="col">Vendor</th>
                  </tr>
                </thead>
                {
                  cctv.length > 0 ?
                    <tbody>
                      {
                        cctv?.map((cctv, i) => {
                          return (
                            <tr key={i}>
                              <td>{cctv.cctv_name}</td>
                              <td className='text-uppercase'>{cctv.dinas}</td>
                              <td>{cctv.status_cctv == 'ON' ? <i class="fa fa-check text-success" aria-hidden="true"></i> : <i className="fa fa-time text-danger" aria-hidden="true"></i>} </td>
                              <td className='text-uppercase'>
                                {cctv.vendor}
                              </td>
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

export default CCTV