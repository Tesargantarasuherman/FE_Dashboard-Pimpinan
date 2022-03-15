import React from 'react'

function CardKetercapaian({title,valueKesehatan,valuePetugasPublik,valueLanjutUsia,valueMasyarakatUmum,valueRemaja,valueAnak,valueGotongRoyong}) {
    return (
        <div>
            <div className="row">
                <div class="col-xl-12 col-md-12 mb-4">
                    <div class="card shadow h-100 py-2">
                        <div class="card-body">
                            <h5 className="mb-0 font-weight-bold text-gray-600 mb-2 text-uppercase mb-4">{title}</h5>
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2 text-center">
                                    <div className="row">
                                        <div class="col mr-2 text-center my-2">
                                            <div class={`card shadow h-100 py-2`}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                                                Tenaga Kesehatan</div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{Math.ceil(valueKesehatan)} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col mr-2 text-center my-2">
                                            <div class={`card shadow h-100 py-2`}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                                                Petugas Publik</div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{Math.ceil(valuePetugasPublik)} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col mr-2 text-center my-2">
                                            <div class={`card shadow h-100 py-2`}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                                                Lanjut Usia</div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{Math.ceil(valueLanjutUsia)} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col mr-2 text-center my-2">
                                            <div class={`card shadow h-100 py-2`}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                                                Masyarakat Umum</div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{Math.ceil(valueMasyarakatUmum)} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col mr-2 text-center my-2">
                                            <div class={`card shadow h-100 py-2`}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                                                Remaja</div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{Math.ceil(valueRemaja)} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col mr-2 text-center my-2">
                                            <div class={`card shadow h-100 py-2`}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                                                Anak</div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{Math.ceil(valueAnak)} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col mr-2 text-center my-2">
                                            <div class={`card shadow h-100 py-2`}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                                                Gotong Royong</div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{Math.ceil(valueGotongRoyong)} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardKetercapaian