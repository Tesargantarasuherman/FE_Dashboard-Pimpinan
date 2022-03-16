import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import CardVaksin from '../_components/CardVaksin'
import CardKetercapaian from '../_components/CardKetercapaian';
function Vaksin() {
    const [vaksin, setVaksin] = useState([]);
    const [vaksin1, setVaksin1] = useState([]);
    const [vaksin2, setVaksin2] = useState([]);
    const [vaksin3, setVaksin3] = useState([]);
    useEffect(() => {
        axios.get(`http://data.bandung.go.id/service/index.php/vaksinasi/terkini`).then(res => {
            console.log(res)
            setVaksin(res.data)
            setVaksin1(res.data.data[0])
            setVaksin2(res.data.data[1])
            setVaksin3(res.data.data[2])
        })
    }, [])
    return (
        <div>
            <h6 className="m-0 font-weight-bold ">Data Vaksin Covid-19</h6>
            <label htmlFor=""><i>Update Terakhir, {moment(vaksin.date).format("LL")}</i></label>
            <CardKetercapaian title={'Ketercapaian Vaksin 1'} valueKesehatan={(vaksin1.vaksin_nakes / vaksin.sasaran_nakes) * 100} valuePetugasPublik={(vaksin1.vaksin_petugas_publik / vaksin.sasaran_petugas_publik) * 100} valueLanjutUsia={(vaksin1.vaksin_lansia / vaksin.sasaran_lansia) * 100} valueMasyarakatUmum={(vaksin1.vaksin_masyarakat / vaksin.sasaran_masyarakat) * 100} valueRemaja={(vaksin1.vaksin_remaja / vaksin.sasaran_remaja) * 100} valueAnak={(vaksin1.vaksin_anak / vaksin.sasaran_anak) * 100} valueGotongRoyong={(vaksin1.vaksin_gotong_royong / vaksin.sasaran_gotong_royong) * 100} />
            <CardKetercapaian title={'Ketercapaian Vaksin 2'} valueKesehatan={(vaksin2.vaksin_nakes / vaksin.sasaran_nakes) * 100} valuePetugasPublik={(vaksin2.vaksin_petugas_publik / vaksin.sasaran_petugas_publik) * 100} valueLanjutUsia={(vaksin2.vaksin_lansia / vaksin.sasaran_lansia) * 100} valueMasyarakatUmum={(vaksin2.vaksin_masyarakat / vaksin.sasaran_masyarakat) * 100} valueRemaja={(vaksin2.vaksin_remaja / vaksin.sasaran_remaja) * 100} valueAnak={(vaksin2.vaksin_anak / vaksin.sasaran_anak) * 100} valueGotongRoyong={(vaksin2.vaksin_gotong_royong / vaksin.sasaran_gotong_royong) * 100} />
            <CardKetercapaian title={'Ketercapaian Vaksin 3'} valueKesehatan={(vaksin3.vaksin_nakes / vaksin.sasaran_nakes) * 100} valuePetugasPublik={(vaksin3.vaksin_petugas_publik / vaksin.sasaran_petugas_publik) * 100} valueLanjutUsia={(vaksin3.vaksin_lansia / vaksin.sasaran_lansia) * 100} valueMasyarakatUmum={(vaksin3.vaksin_masyarakat / vaksin.sasaran_masyarakat) * 100} valueRemaja={(vaksin3.vaksin_remaja / vaksin.sasaran_remaja) * 100} valueAnak={(vaksin3.vaksin_anak / vaksin.sasaran_anak) * 100} valueGotongRoyong={(vaksin3.vaksin_gotong_royong / vaksin.sasaran_gotong_royong) * 100} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div class={`text-sm font-weight-bold text-gray-600  text-uppercase mb-1 my-2`}>
                                Sasaran Vaksinasi
                            </div>
                            <CardVaksin
                                title={'Total Sasaran'}
                                color={'danger'}
                                totalSasaran={vaksin.total_vaksinasi1 + vaksin.total_vaksinasi2 + vaksin.total_vaksinasi3}
                                totalVaksin1={vaksin.total_vaksinasi1}
                                totalVaksin2={vaksin.total_vaksinasi2}
                                totalVaksin3={vaksin.total_vaksinasi3}
                            />
                            <CardVaksin
                                title={'Tenaga Kesehatan'}
                                color={'primary'}
                                totalSasaran={vaksin.sasaran_nakes}
                                totalVaksin1={vaksin1.vaksin_nakes}
                                totalVaksin2={vaksin2.vaksin_nakes}
                                totalVaksin3={vaksin3.vaksin_nakes}
                            />
                            <CardVaksin
                                title={'Petugas Publik'}
                                color={'primary'}
                                totalSasaran={vaksin.sasaran_petugas_publik}
                                totalVaksin1={vaksin1.vaksin_petugas_publik}
                                totalVaksin2={vaksin2.vaksin_petugas_publik}
                                totalVaksin3={vaksin3.vaksin_petugas_publik}
                            />
                            <CardVaksin
                                title={'Lanjut Usia'}
                                color={'primary'}
                                totalSasaran={vaksin.sasaran_lansia}
                                totalVaksin1={vaksin1.vaksin_lansia}
                                totalVaksin2={vaksin2.vaksin_lansia}
                                totalVaksin3={vaksin3.vaksin_lansia}
                            />
                            <CardVaksin
                                title={'Masyarakat Umum'}
                                color={'primary'}
                                totalSasaran={vaksin.sasaran_masyarakat}
                                totalVaksin1={vaksin1.vaksin_masyarakat}
                                totalVaksin2={vaksin2.vaksin_masyarakat}
                                totalVaksin3={vaksin3.vaksin_masyarakat}
                            />
                            <CardVaksin
                                title={'Remaja'}
                                color={'primary'}
                                totalSasaran={vaksin.sasaran_remaja}
                                totalVaksin1={vaksin1.vaksin_remaja}
                                totalVaksin2={vaksin2.vaksin_remaja}
                                totalVaksin3={vaksin3.vaksin_remaja}
                            />
                            <CardVaksin
                                title={'Anak'}
                                color={'primary'}
                                totalSasaran={vaksin.sasaran_anak}
                                totalVaksin1={vaksin1.vaksin_anak}
                                totalVaksin2={vaksin2.vaksin_anak}
                                totalVaksin3={vaksin3.vaksin_anak}
                            />
                            <CardVaksin
                                title={'Gotong Royong'}
                                color={'primary'}
                                totalSasaran={vaksin.sasaran_gotong_royong}
                                totalVaksin1={vaksin1.vaksin_gotong_royong}
                                totalVaksin2={vaksin2.vaksin_gotong_royong}
                                totalVaksin3={vaksin3.vaksin_anak}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vaksin