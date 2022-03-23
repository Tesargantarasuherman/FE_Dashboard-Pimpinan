import axios from 'axios'
import Map from 'react-map-gl';
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { wifiIcon } from '../../../components/VenueLocationIcon';


function Wifi() {
  const [wifi, setWifi] = useState([]);
  const [position, setPosition] = useState({ lat: null, lng: null, name: '' })
  const [center,setCenter] = useState({lat:-6.914744,lng:107.609810})
  useEffect(() => {
    axios.get(`https://pelindung.bandung.go.id:8443/api/cek`).then(res => {
      console.log(res.data, 'data')
      setWifi(res.data)
    })
  }, [])
  const setActiveWifi = (val) => {
    console.log(val)
    setPosition({
      lat: val.lat,
      lng: val.lng,
      name: val.cctv_name
    })
  }


  return (
    <div className="container-fluid">
      <h6 className="m-0 font-weight-bold ">Data wifi</h6>
      <div className="row my-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="m-0 font-weight-bold ">Tabel wifi di Kota Bandung ({wifi.length})</h6>
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
                  wifi.length > 0 ?
                    <tbody>
                      {
                        wifi?.map((wifi, i) => {
                          return (
                            <tr key={i} onClick={() => setActiveWifi(wifi)}>
                              <td >{wifi.cctv_name}</td>
                              <td className='text-uppercase'>{wifi.dinas}</td>
                              <td>{wifi.status_cctv == 'ON' ? <i class="fa fa-check text-success" aria-hidden="true"></i> : <i className="fa fa-time text-danger" aria-hidden="true"></i>} </td>
                              <td className='text-uppercase'>
                                {wifi.vendor}
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
                {wifi.map(wifi => {
                  return (
                    <Marker position={position.lat !=null ?position :{lat:wifi.lat,lng:wifi.lng}} icon={wifiIcon}>
                      <Popup>
                        {position.name !='' ?position.name : wifi.cctv_name}
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

export default Wifi