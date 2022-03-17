import React, { useEffect, useState } from 'react'

function PeraturanPerundangan() {
    const [data, setData] = useState([
        {
            "id": "22842",
            "dokumen_judul": "KAWASAN TANPA ROKOK",
            "dokumen_tahun": "2018",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Dinas Kesehatan Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/22842/detail"
        },
        {
            "id": "21851",
            "dokumen_judul": "PERUSAHAAN UMUM DAERAH PASAR JUARA KOTA BANDUNG",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Bagian Ekonomi Sekretariat Daerah Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/21851/detail"
        },
        {
            "id": "21850",
            "dokumen_judul": "PERUSAHAAN UMUM DAERAH BANK PERKREDITAN RAKYAT KOTA BANDUNG",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Bagian Ekonomi Sekretariat Daerah Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/21850/detail"
        },
        {
            "id": "21852",
            "dokumen_judul": "PERUSAHAAN UMUM DAERAH TIRTAWENING KOTA BANDUNG",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Bagian Ekonomi Sekretariat Daerah Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/21852/detail"
        },
        {
            "id": "22085",
            "dokumen_judul": "SISTEM KESEHATAN KOTA BANDUNG",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Dinas Kesehatan Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/22085/detail"
        },
        {
            "id": "21920",
            "dokumen_judul": "RENCANA PEMBANGUNAN JANGKA MENENGAH DAERAH (RPJMD) TAHUN 2018-2023",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Badan Perencanaan Pembangunan, Penelitian Dan Pengembangan Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/21920/detail"
        },
        {
            "id": "21932",
            "dokumen_judul": "RANCANGAN PERATURAN DAERAH   KOTA BANDUNG  TENTANG PERTANGGUNGJAWABAN PELAKSANAAN ANGGARAN PENDAPATAN DAN BELANJA DAERAH TAHUN ANGGARAN 2018",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Badan Pengelolaan Keuangan dan Aset    Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/21932/detail"
        },
        {
            "id": "21931",
            "dokumen_judul": "RANCANGAN PERATURAN DAERAH KOTA BANDUNG TENTANG PERUBAHAN PERATURAN DAERAH NOMOR 07 TAHUN 2013 TENTANG PENYEDIAAN, PENYERAHAN DAN PENGELOLAAN PRASARANA, SARANA DAN UTILITAS PERUMAHAN DAN PERMUKIMAN",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Dinas Perumahan dan Kawasan Permukiman, Pertanahan dan Pertamanan Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/21931/detail"
        },
        {
            "id": "22089",
            "dokumen_judul": "PENANGANAN KAWASAN KUMUH",
            "dokumen_tahun": "2019",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Dinas Perumahan dan Kawasan Permukiman, Pertanahan dan Pertamanan Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/22089/detail"
        },
        {
            "id": "22291",
            "dokumen_judul": "RANCANGAN\r\nPERATURAN DAERAH KOTA BANDUNG\r\nNOMOR      TAHUN 2020\r\nTENTANG\r\nBANDUNG KOTA RAMAH LANJUT USIA",
            "dokumen_tahun": "2020",
            "dokumen_status": "<span class=\"badge\"></span>",
            "pemerkasa_nama": "Dinas Pemberdayaan Perempuan Perlindungan Anak dan Pemberdayaan Masyarakat (DP3APM) Kota Bandung",
            "action": "https://jdih.bandung.go.id/home/informasi-hukum/raperda/22291/detail"
        }
    ])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <h6 className="m-0 font-weight-bold ">Daftar Peraturan Perundangan</h6>
                    <table className="table table-striped table-responsive mt-4" style={{ maxHeight: 700 }}>
                        <thead>
                            <tr>
                                <th scope="col">Tahun</th>
                                <th scope="col">Pemerkasa</th>
                                <th scope="col">Perihal</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(data => {
                                    return (
                                        <tr>
                                            <td>{data.dokumen_tahun}</td>
                                            <td>{data.pemerkasa_nama}</td>
                                            <td>{data.dokumen_judul}</td>
                                            <td>
                                                <a href={data.action} class="btn btn-outline-primary btn-sm">Detail</a>
                                            </td>
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

export default PeraturanPerundangan