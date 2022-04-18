import React from 'react'

function Tte() {
  return (
<div className="card">
      <div className="card-body">
        <h6 className="m-0 font-weight-bold mb-4">Daftar Pegawai Yang Sudah Mempunyai Tanda Tangan Elektronik</h6>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Pegawai</th>
              <th scope="col">Status</th>
              <th scope="col">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Ahman</td>
              <td>Sudah</td>
              <td>20 September 2021</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Hilmi</td>
              <td>Sudah</td>
              <td>22 September 2021</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ihsan</td>
              <td>Sudah</td>
              <td>23 September 2021</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>  )
}

export default Tte