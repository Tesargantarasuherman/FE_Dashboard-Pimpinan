import axios from 'axios'
import Map from 'react-map-gl';
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { cctvIcon, policeIcon } from '../../../components/VenueLocationIcon';


function Cctv() {
  const [cctv, setCCTV] = useState([]);
  const [position, setPosition] = useState({ lat: null, lng: null, name: '' })
  const [center,setCenter] = useState({lat:-6.914744,lng:107.609810})
  useEffect(() => {
    axios.get(`https://pelindung.bandung.go.id:8443/api/cek`).then(res => {
      console.log(res.data, 'data')
      setCCTV(res.data)
    })
  }, [])
  const setActiveCCTV = (val) => {
    console.log(val)
    setPosition({
      lat: val.lat,
      lng: val.lng,
      name: val.cctv_name
    })
  }


  return (
    <div className="container-fluid">
      <h6 className="m-0 font-weight-bold ">Data CCTV</h6>
      <div className="row my-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="m-0 font-weight-bold ">Tabel CCTV di Kota Bandung ({cctv.length})</h6>
              <table className="table table-striped table-responsive mt-4" style={{ maxHeight: '74.5vh' }}>
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
                            <tr key={i} onClick={() => setActiveCCTV(cctv)}>
                              <td >{cctv.cctv_name}</td>
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
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '80vh', width: '100wh' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cctv.map(cctv => {
                  return (
                    <Marker position={position.lat !=null ?position :{lat:cctv.lat,lng:cctv.lng}} icon={cctvIcon}>
                      <Popup>
                        {position.name !='' ?position.name : cctv.cctv_name}
                      </Popup>
                    </Marker>
                  )
                })}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cctv