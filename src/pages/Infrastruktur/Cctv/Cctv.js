import axios from 'axios'
import Map from 'react-map-gl';
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { cctvIcon, cctvIconNotActive, policeIcon } from '../../../components/VenueLocationIcon';
import data_cctv from '../../../localdata/map.json'
import { Button, Modal } from 'react-bootstrap';
import Switch from "react-switch";
import ReactHlsPlayer from 'react-hls-player';

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
          icon={marker.status == true ? cctvIcon : cctvIconNotActive}        >
          <Popup>
            <ReactHlsPlayer
              src={marker.link_stream}
              autoPlay={true}
              controls={true}
              width="200px"
              height="auto"
            />
            <p className='font-weight-bold m-0'>{marker.lokasi}</p>
          </Popup>
        </Marker>
      );
    })
  );
}

function Cctv() {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ lokasi: "", latitude: "", longitude: "", vendor: "", dinas: "",link_stream:"", status: true });
  const [cctv, setCCTV] = useState([]);
  const [checked, setChecked] = useState(false)
  const [position, setPosition] = useState([{ lat: null, lng: null, lokasi: '', status: null }]);
  const [center, setCenter] = useState({ lat: -6.914744, lng: 107.609810 });

  useEffect(() => {
    getAllCctv()
  }, [])
  const getAllCctv = () => {
    axios.get(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/get-master-data-cctv`).then(res => {
      console.log(res, 'data')
      setCCTV(res.data.data)
    })
  }
  const setActiveCCTV = (val) => {
    setPosition({
      lat: val.latitude,
      lng: val.longitude,
      lokasi: val.lokasi,
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
    axios.post(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/add-master-data-cctv`, form).then(res => {
      setForm(
        { lokasi: "", latitude: "", longitude: "", vendor: "", dinas: "",link_stream:"", status: true }
      )
      getAllCctv();

    }).catch(err => {
      console.log(err)
    })
  }
  const editCctv = (data) => {
    let ubah_data = {
      lokasi: form.lokasi == "" ? data.lokasi : form.lokasi,
      latitude: form.latitude == "" ? data.latitude : form.latitude,
      longitude: form.longitude == "" ? data.longitude : form.longitude,
      vendor: form.vendor == "" ? data.vendor : form.vendor,
      dinas: form.dinas == "" ? data.dinas : form.dinas,
      link_stream: form.link_stream == "" ? data.link_stream : form.link_stream,
      status: form.status == "" ? data.status : form.status
    }
    axios.put(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/update-master-data-cctv/${data.id}`, ubah_data).then(res => {
      setEdit(null);
      getAllCctv()
    }).catch(err => {
      console.log(err)
    })
  }

  const ubahStatus = (data) => {
    let ubah_data = {
      lokasi: data.lokasi,
      latitude: data.latitude,
      longitude: data.longitude,
      vendor: data.vendor,
      dinas: data.dinas,
      link_stream: data.link_stream,
      status: !data.status
    }
    axios.put(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/update-master-data-cctv/${data.id}`, ubah_data).then(res => {
      getAllCctv()
    }).catch(err => {
      console.log(err)
    })
  }
  const cariCctv = () => {
    axios.get(`https://api-dashboard-pimpinan.herokuapp.com/api/v1/master-data-cctv/?cari=jakarta`).then(res => {

    })
  }

  return (
    <div className="container-fluid">
      <h6 className="m-0 font-weight-bold ">Data CCTV</h6>
      <div className="row no-gutters my-4">
        <div className="col-md-12">
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
                    <th scope="col" style={{ minWidth: 110, minHeight: 25 }}>Dinas</th>
                    <th scope="col" style={{ minWidth: 110, minHeight: 25 }}>Stream</th>
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
                              <input type="text" value={form.lokasi} name="lokasi" onChange={handleFormChange} className="form-control form-control-sm" placeholder="lokasi" style={{ maxWidth: 140 }} />
                            </td>
                            <td>
                              <input type="text" value={form.latitude} name="latitude" onChange={handleFormChange} className="form-control form-control-sm" placeholder="latitude" style={{ maxWidth: 80 }} />
                            </td>
                            <td>
                              <input type="text" value={form.longitude} name="longitude" onChange={handleFormChange} className="form-control form-control-sm" placeholder="longitude" style={{ maxWidth: 80 }} />
                            </td>
                            <td>
                              <input type="text" value={form.dinas} name="dinas" onChange={handleFormChange} className="form-control form-control-sm" placeholder="dinas" style={{ maxWidth: 140 }} />
                            </td>
                            <td>
                              <input type="text" value={form.link_stream} name="link_stream" onChange={handleFormChange} className="form-control form-control-sm" placeholder="stream" style={{ maxWidth: 350 }} />
                            </td>
                            <td>
                              <input type="text" value={form.vendor} name="vendor" onChange={handleFormChange} className="form-control form-control-sm" placeholder="vendor" style={{ maxWidth: 100 }} />
                            </td>
                            <td>
                              <div className="form-group">
                                <select name="status" onChange={handleFormChange} className="form-control" style={{ fontSize: '12px', maxWidth: 80, maxHeight: 31, padding: 0 }}>
                                  <option style={{ fontSize: '12px', fontWeight: 'bold' }} value={true}>Aktif</option>
                                  <option style={{ fontSize: '12px', fontWeight: 'bold' }} value={false}>Tidak</option>
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
                              {/* <tr key={i}  style={{ fontSize: '12px', fontWeight: 500 }}>  */}
                              <td>
                                {
                                  i != edit ? (
                                    cctv.lokasi)
                                    : (
                                      <input type="text" name="lokasi" onChange={handleFormChange} className="form-control form-control-sm" defaultValue={cctv.lokasi} style={{ maxWidth: 140, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {
                                  i != edit ? (
                                    cctv.latitude)
                                    : (
                                      <input type="text" name="latitude" onChange={handleFormChange} className="form-control form-control-sm" defaultValue={cctv.latitude} style={{ maxWidth: 80, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {
                                  i != edit ? (
                                    cctv.longitude)
                                    : (
                                      <input type="text" name="longitude" onChange={handleFormChange} className="form-control form-control-sm" defaultValue={cctv.longitude} style={{ maxWidth: 80, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {
                                  i != edit ? (
                                    cctv.dinas)
                                    : (
                                      <input type="text" name="dinas" onChange={handleFormChange} className="form-control form-control-sm" defaultValue={cctv.dinas} style={{ maxWidth: 140, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {
                                  i != edit ? (
                                    cctv.link_stream)
                                    : (
                                      <input type="text" name="link_stream" onChange={handleFormChange} className="form-control form-control-sm" defaultValue={cctv.link_stream} style={{ maxWidth: 350, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td className='text-uppercase'>
                                {
                                  i != edit ? (
                                    cctv.vendor
                                  )
                                    : (
                                      <input type="text" name="vendor" onChange={handleFormChange} className="form-control form-control-sm" defaultValue={cctv.vendor} style={{ maxWidth: 100, maxHeight: 25 }} />
                                    )
                                }
                              </td>
                              <td>
                                {/* <label>
                                  <Switch onChange={(checked)=>handleChange(checked,i)} checked={cctv.status=="aktif" ? checked :false} height={15} width={25}/>
                                </label> */}
                                <button className='btn btn-outline-primary btn-sm' data-toggle="tooltip" data-placement="top" title="Ubah Status" onClick={() => ubahStatus(cctv)}>
                                  {
                                    cctv.status == true ? <i className="fa fa-check text-success" aria-hidden="true"></i> : <i className="fa fa-times text-danger" aria-hidden="true"></i>
                                  }
                                </button>
                              </td>
                              <td>
                                {
                                  i != edit ? (
                                    <div class="dropdown no-arrow">
                                      <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-ellipsis-v fa-fw text-gray-800"></i>
                                      </a>
                                      <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <a class="dropdown-item" href="#" onClick={() => setUbahData(i)}>
                                          Ubah
                                        </a>
                                      </div>
                                    </div>) : (
                                    <>
                                      <button className="btn btn-primary btn-sm mr-2" onClick={() => editCctv(cctv)}>Ubah</button>
                                      <button className="btn btn-danger btn-sm" onClick={() => setEdit(null)}>Batal</button>
                                    </>
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
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ height: '80vh', width: '100wh' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cctv.length > 0 && cctv.map(cctv => {
                  return (
                    <Marker position={position.lat != null ? position : { lat: cctv.latitude, lng: cctv.longitude }} icon={cctv.status == true ? cctvIcon : cctvIconNotActive}>
                      <Popup>
                        {position.lokasi != '' ? position.lokasi : cctv.lokasi}<br />
                        {cctv.status}
                      </Popup>
                    </Marker>
                  )
                })}
                <Markers data={cctv} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cctv