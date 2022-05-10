import axios from 'axios'
import Map from 'react-map-gl';
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { wifiIcon, wifiIconNotActive, policeIcon } from '../../../components/VenueLocationIcon';
import data_wifi from '../../../localdata/map.json'
import Switch from "react-switch";
import ReactHlsPlayer from 'react-hls-player';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';
import { ToastContainer, toast } from 'react-toastify';
import BaseURL from '../../../utils/BaseURL';

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
          icon={marker.status == true ? wifiIcon : wifiIconNotActive}        >
          <Popup>
            <p className='font-weight-bold m-0'>{marker.lokasi}</p>
          </Popup>
        </Marker>
      );
    })
  );
}

function Wifi() {
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(null);
  const [dataEdit, setDataEdit] = useState([]);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ lokasi: "", latitude: "", longitude: "", vendor: "", dinas: "", status: true });
  const [wifi, setWifi] = useState([]);
  const [checked, setChecked] = useState(false)
  const [position, setPosition] = useState([{ lat: null, lng: null, lokasi: '', status: null }]);
  const [center, setCenter] = useState({ lat: -6.914744, lng: 107.609810 });

  useEffect(() => {
    getAllWifi()
  }, [])
  const getAllWifi = () => {
    axios.get(`${BaseURL}get-master-data-wifi`).then(res => {
      console.log(res, 'data')
      setWifi(res.data.data)
    })
  }
  const setActiveWifi = (val) => {
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
  const addWifi = () => {
    axios.post(`${BaseURL}add-master-data-wifi`, form).then(res => {
      setForm(
        { lokasi: "", latitude: "", longitude: "", vendor: "", dinas: "", status: true }
      )
      getAllWifi();
      toast.success("Berhasil tambah data", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(err => {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }
  const editWifi = (data) => {
    let ubah_data = {
      lokasi: form.lokasi == "" ? data.lokasi : form.lokasi,
      latitude: form.latitude == "" ? data.latitude : form.latitude,
      longitude: form.longitude == "" ? data.longitude : form.longitude,
      vendor: form.vendor == "" ? data.vendor : form.vendor,
      dinas: form.dinas == "" ? data.dinas : form.dinas,
      status: form.status == "" ? data.status : form.status
    }
    axios.put(`${BaseURL}update-master-data-wifi/${data.id}`, ubah_data).then(res => {
      setEdit(null);
      getAllWifi();
      setShowEdit(false);
      toast.success("Berhasil diubah", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      status: !data.status
    }
    axios.put(`${BaseURL}update-master-data-wifi/${data.id}`, ubah_data).then(res => {
      getAllWifi()
    }).catch(err => {
      console.log(err)
    })
  }
  const cariWifi = (val) => {
    axios.get(`${BaseURL}master-data-wifi/?cari=${val}`).then(res => {
      setWifi(res.data.data)
    }).catch(err=>{
      setWifi(
        [{ lokasi: "Tidak Ada", latitude: "Tidak Ada", longitude: "Tidak Ada", vendor: "Tidak Ada", dinas: "Tidak Ada", link_stream: "Tidak Ada", status: true }]
      )
    })
  }
  const setEditWifi = (data) => {
    console.table(data)
    setShowEdit(!showEdit)
    setDataEdit(data)
  }

  return (
    <div className="container-fluid">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalAdd show={show} setShow={setShow} handleFormChange={handleFormChange} form={form} handleSubmit={addWifi} />
      <ModalEdit show={showEdit} setShow={setShowEdit} data={dataEdit} handleFormChange={handleFormChange} handleSubmit={editWifi} />
      <h6 className="m-0 font-weight-bold text-gray-800">Data Wifi</h6>
      <div className="row my-4">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6 className="m-0 font-weight-bold text-gray-800">Tabel Wifi di Kota Bandung ({wifi.length})</h6>
                <button className="btn btn-sm btn-primary" onClick={() => setShow(!show)}>Tambah Data Wifi</button>
              </div>
              <div className="d-flex justify-content-between">
                <div className="row">
                  <div className="col-md-12">
                    {/* <div className="input-group input-group-sm mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></span>
                      </div>
                      <input type="text" className="form-control" aria-label="Small" placeholder="Cari Data" onChange={(e) => cariWifi(e.target.value)} />
                    </div> */}
                  </div>
                </div>
              </div>
              <table className="table table-striped table-responsive mt-4" style={{ maxHeight: '74.5vh' }}>
                <thead>
                  <tr style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    <th scope="col" style={{ minWidth: 20, maxHeight: 25, zIndex: 1 }}>No</th>
                    <th scope="col" style={{ minWidth: 150, maxHeight: 25, position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>Lokasi</th>
                    <th scope="col" style={{ minWidth: 150, maxHeight: 25, zIndex: 1 }}>Dinas</th>
                    <th scope="col" style={{ minWidth: 150, maxHeight: 25, zIndex: 1 }}>Vendor</th>
                    <th scope="col" style={{ minWidth: 60, maxHeight: 25, zIndex: 1 }}>Status</th>
                    <th scope="col" style={{ minWidth: 60, maxHeight: 25, zIndex: 1 }}>Aksi</th>
                  </tr>
                </thead>
                {
                  wifi.length > 0 ? (
                    <tbody>
                      {
                        wifi?.map((wifi, i) => {
                          return (
                            <tr key={i} onClick={() => setActiveWifi(wifi)} style={{ fontSize: '12px', fontWeight: 'bold', maxHeight: 25 }}>
                              <td>
                                {
                                  i + 1
                                }
                              </td>
                              <td style={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
                                {
                                  wifi.lokasi
                                }
                              </td>
                              <td>
                                {
                                  wifi.dinas
                                }
                              </td>
                              <td>
                                {
                                  wifi.vendor
                                }
                              </td>
                              <td className="text-center">
                                <button className='btn btn-outline-primary btn-sm' data-toggle="tooltip" data-placement="top" title="Ubah Status" onClick={() => ubahStatus(wifi)}>
                                  {
                                    wifi.status == true ? <i className="fa fa-check text-success" aria-hidden="true"></i> : <i className="fa fa-times text-danger" aria-hidden="true"></i>
                                  }
                                </button>
                              </td>
                              <td>
                                <div class="dropdown no-arrow">
                                  <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-fw text-gray-800"></i>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <a class="dropdown-item" href="#" onClick={() => setEditWifi(wifi)}>
                                      Ubah
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  )

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
              <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ height: '80vh', width: '100wh' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {wifi.length > 0 && wifi.map(wifi => {
                  return (
                    <Marker position={position.lat != null ? position : { lat: wifi.latitude, lng: wifi.longitude }} icon={wifi.status == true ? wifiIcon : wifiIconNotActive}>
                      <Popup>
                        {position.lokasi != '' ? position.lokasi : wifi.lokasi}<br />
                        {wifi.status}
                      </Popup>
                    </Marker>
                  )
                })}
                <Markers data={wifi} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wifi