import axios from 'axios'
import Map from 'react-map-gl';
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { cctvIcon, cctvIconNotActive, policeIcon } from '../../../components/VenueLocationIcon';
import data_cctv from '../../../localdata/map.json'
import { Button, Modal } from 'react-bootstrap';
import Switch from "react-switch";

function Markers({ data }) {
  const map = useMap();
  return (
    data.length > 0 &&
    data.map((marker, index) => {
      return (
        <Marker
          eventHandlers={{
            click: () => {
              map.setView(
                [
                  marker.latitude,
                  marker.longitude
                ],
                18
              );
            }
          }}
          key={index}
          position={{
            lat: marker.latitude,
            lng: marker.longitude
          }}
          icon={marker.status == "aktif" ? cctvIcon : cctvIconNotActive}        >
          <Popup>
            <span>{marker.lokasi}</span>
          </Popup>
        </Marker>
      );
    })
  );
}

function Cctv() {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ lokasi: "", latitude: "", longitude: "", vendor: "", dinas: "", status: "" });
  const [cctv, setCCTV] = useState([]);
  const [checked, setChecked] = useState(false)
  const [position, setPosition] = useState({ latitude: null, longitude: null, name: '', status: '' });
  const [center, setCenter] = useState({ lat: -6.914744, lng: 107.609810 });
  
  useEffect(() => {
    getAllCctv()
  }, [])
  const getAllCctv = () => {
    axios.get(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/get-master-data-cctv`).then(res => {
      console.log(res.data.data.data, 'data')
      setCCTV(res.data.data.data)
    })
  }
  const setActiveCCTV = (val) => {
    setPosition({
      latitude: val.latitude,
      longitude: val.longitude,
      name: val.lokasi,
      status: val.status
    })
    console.log(position)
  }
  const setUbahData = (id) => {
    setEdit(id)
  }

  const handleChange = (checked, id) => {
    console.log(id)
    setChecked(checked);
  }
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm(
      {
        ...form,
        [name]: value,
      },
    );
  }
  const addCctv = () => {
    console.log(form)
    axios.post(`http://api-dashboard-pimpinan.herokuapp.com/api/v1/add-master-data-cctv`, form).then(res => {
      getAllCctv()
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="container-fluid">
      <h6 className="m-0 font-weight-bold ">Data CCTV</h6>
      <div className="row no-gutters my-4">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6 className="m-0 font-weight-bold ">Tabel CCTV di Kota Bandung ({cctv.length})</h6>
                {
                  show ? null :
                    <button className="btn btn-sm btn-primary" onClick={() => setShow(!show)}>Tambah Data CCTV</button>
                }
              </div>
              <table className="table table-striped table-responsive mt-4" style={{ maxHeight: '74.5vh' }}>
                <thead>
                  <tr style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    <th scope="col" style={{ minWidth: 110, minHeight: 25 }}>Lokasi</th>
                    <th scope="col" style={{ minWidth: 110, minHeight: 25 }}>Latitude</th>
                    <th scope="col" style={{ minWidth: 110, minHeight: 25 }}>Longitude</th>
                    {/* <th scope="col">Dinas</th> */}
                    <th scope="col" style={{ minWidth: 110, minHeight: 25 }}>Vendor</th>
                    <th scope="col" style={{ minWidth: 60, minHeight: 25 }}>Status</th>
                    <th scope="col" style={{ minWidth: 110, minHeight: 25 }}>Aksi</th>
                  </tr>
                </thead>
                {
                  cctv.length > 0 ?
                    <tbody>
                      {
                        show ? (
                          <tr>
                            <td>
                              <input type="text" name="lokasi" onChange={handleFormChange} className="form-control form-control-sm" placeholder="lokasi" style={{ maxWidth: 80 }} />
                            </td>
                            <td>
                              <input type="text" name="latitude" onChange={handleFormChange} className="form-control form-control-sm" placeholder="latitude" style={{ maxWidth: 80 }} />
                            </td>
                            <td>
                              <input type="text" name="longitude" onChange={handleFormChange} className="form-control form-control-sm" placeholder="longitude" style={{ maxWidth: 80 }} />
                            </td>
                            <td>
                              <input type="text" name="vendor" onChange={handleFormChange} className="form-control form-control-sm" placeholder="vendor" style={{ maxWidth: 80 }} />
                            </td>
                            <td>
                              <div className="form-group">
                                <select name="status" onChange={handleFormChange} className="form-control" style={{ fontSize: '12px', maxWidth: 80, maxHeight: 31, padding: 0 }}>
                                  <option style={{ fontSize: '12px', fontWeight: 'bold' }} value="aktif">Aktif</option>
                                  <option style={{ fontSize: '12px', fontWeight: 'bold' }} value="tidak aktif">Tidak</option>
                                </select>
                              </div>
                            </td>
                            <td>
                              <button className="btn btn-primary btn-sm mr-2" onClick={addCctv}>Tambah</button>
                              <button className="btn btn-danger btn-sm px-3 my-2" onClick={() => setShow(!show)}>Batal</button>
                            </td>
                          </tr>
                        ) : (null)
                      }
                      {
                        cctv?.map((cctv, i) => {
                          return (
                            <tr key={i} onClick={() => setActiveCCTV(cctv)} style={{ fontSize: '12px', fontWeight: 'bold' }}>
                             {/* <tr key={i}  style={{ fontSize: '12px', fontWeight: 500 }}> */}
                              <td>
                                {
                                  i != edit ? (
                                    cctv.lokasi)
                                    : (
                                      <input type="text" className="form-control form-control-sm" value={cctv.lokasi} style={{ maxWidth: 80, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {
                                  i != edit ? (
                                    cctv.latitude)
                                    : (
                                      <input type="text" className="form-control form-control-sm" value={cctv.latitude} style={{ maxWidth: 80, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {
                                  i != edit ? (
                                    cctv.longitude)
                                    : (
                                      <input type="text" className="form-control form-control-sm" value={cctv.longitude} style={{ maxWidth: 80, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td className='text-uppercase'>
                                {
                                  i != edit ? (
                                    cctv.vendor
                                  )
                                    : (
                                      <input type="text" className="form-control form-control-sm" value={cctv.vendor} style={{ maxWidth: 80, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {/* <label>
                                  <Switch onChange={(checked)=>handleChange(checked,i)} checked={cctv.status=="aktif" ? checked :false} height={15} width={25}/>
                                </label> */}
                                {cctv.status == 'aktif' ? <button className='btn btn-outline-primary btn-sm' data-toggle="tooltip" data-placement="top" title="Ubah Status"><i className="fa fa-check text-success" aria-hidden="true"></i></button> : <button className='btn btn-outline-primary btn-sm' data-toggle="tooltip" data-placement="top" title="Ubah Status"><i className="fa fa-times text-danger" aria-hidden="true"></i></button>}
                              </td>
                              <td>
                                <button className="btn btn-primary btn-sm mr-2" onClick={() => setUbahData(i)}>Ubah</button>
                                {
                                  i != edit ? (
                                    null
                                  ) : (
                                    <button className="btn btn-danger btn-sm" onClick={() => setEdit(null)}>Batal</button>
                                  )
                                }
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
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <MapContainer center={center} zoom={position.latitude != null ? 18 : 12} scrollWheelZoom={true} style={{ height: '80vh', width: '100wh' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cctv.map(cctv => {
                  return (
                    <Marker position={position.lat != null ? position : { lat: cctv.latitude, lng: cctv.longitude }} icon={cctv.status == "aktif" ? cctvIcon : cctvIconNotActive}>
                      <Popup>
                        {position.name != '' ? position.name : cctv.lokasi}<br />
                        {cctv.status}
                      </Popup>
                    </Marker>
                  )
                })}
                <Markers data={position.longitude ? position: cctv} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cctv