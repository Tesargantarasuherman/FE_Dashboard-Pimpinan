import React from 'react'
import { Button, Modal } from 'react-bootstrap';

function ModalEdit({ show, setShow, data, handleFormChange, handleSubmit }) {
    return (
        <Modal show={show} onHide={() => setShow(!show)}>
            <Modal.Header>
                <Modal.Title style={{ fontSize: '12px',fontWeight:'bold',textTransform:'uppercase' }}>Ubah Data CCTV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Lokasi</label>
                        <input type="text" name="lokasi" className="form-control form-control-sm" defaultValue={data.lokasi} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Latitude</label>
                        <input name="latitude" type="text" className="form-control form-control-sm" defaultValue={data.latitude} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Longitude</label>
                        <input name="longitude" type="text" className="form-control form-control-sm" defaultValue={data.longitude} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Dinas</label>
                        <input name="dinas" type="text" className="form-control form-control-sm" defaultValue={data.dinas} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Vendor</label>
                        <input name="vendor" type="text" className="form-control form-control-sm" defaultValue={data.vendor} onChange={handleFormChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn-sm" onClick={() => setShow(!show)}>
                    Tutup
                </Button>
                <Button variant="primary" className="btn-sm" onClick={() => handleSubmit(data)}>
                    Ubah Data
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit