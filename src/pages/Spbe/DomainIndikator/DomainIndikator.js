import React, { useState } from 'react'
import index_spbe from '../../../localdata/indexSbpe.json'

function DomainIndikator() {
    const [indexSpbe, setIndexSpbe] = useState(index_spbe.data);

    return (
        <div className="container-fluid">
            <div className="card my-4">
                <div className="card-body">
                    <h6 className="m-0 font-weight-bold ">Daftar Indikator SPBE</h6>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nama Indikator</th>
                                <th scope="col">Bobot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                indexSpbe.map((spbe, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{spbe.nama_indikator}</td>
                                            <td>{spbe.bobot}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DomainIndikator