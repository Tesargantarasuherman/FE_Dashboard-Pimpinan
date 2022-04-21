import React from 'react'
import { Button, Modal } from 'react-bootstrap';

function ModalAdd({ form, show, setShow,handleFormChange,handleSubmit }) {
    return (
        <Modal show={show} onHide={() => setShow(!show)}>
            <Modal.Header>
            <Modal.Title style={{ fontSize: '12px',fontWeight:'bold',textTransform:'uppercase' }}>Tambah Data CCTV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Lokasi</label>
                        <input type="text" name="lokasi" className="form-control form-control-sm" value={form.lokasi} onChange={handleFormChange} placeholder="Masukkan Nama Lokasi"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Latitude</label>
                        <input name="latitude" type="text" className="form-control form-control-sm" value={form.latitude} onChange={handleFormChange} placeholder="Masukkan Nama Latitude"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Longitude</label>
                        <input name="longitude" type="text" className="form-control form-control-sm" value={form.longitude} onChange={handleFormChange} placeholder="Masukkan Nama Longitude"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Dinas</label>
                        <input name="dinas" type="text" className="form-control form-control-sm" value={form.dinas} onChange={handleFormChange} placeholder="Masukkan Nama Dinas"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Vendor</label>
                        <input name="vendor" type="text" className="form-control form-control-sm" value={form.vendor} onChange={handleFormChange} placeholder="Masukkan Nama Vendor"/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn-sm" onClick={() => setShow(!show)}>
                    Tutup
                </Button>
                <Button variant="primary" className="btn-sm" onClick={handleSubmit}>
                    Tambah Data
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAdd