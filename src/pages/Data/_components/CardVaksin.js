import React from 'react'

function CardVaksin({title,totalSasaran,totalVaksin1,totalVaksin2,totalVaksin3,color}) {
  return (
    <div className="row">
                <div class="col-xl-6 col-md-6 mb-4">
                    <div class={`card border-left-${color} shadow h-100 py-2`}>
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class={`text-sm font-weight-bold text-${color} text-uppercase mb-1 text-center align-items-center`}>
                                        {title}
                                    </div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{parseInt(totalSasaran).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-2 col-md-6 mb-4">
                    <div class={`card shadow h-100 py-2`}>
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class={`text-xs font-weight-bold text-${color} text-uppercase mb-1 text-center`}>
                                        Total Vaksin 1</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{parseInt(totalVaksin1).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-2 col-md-6 mb-4">
                    <div class={`card shadow h-100 py-2`}>
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class={`text-xs font-weight-bold text-${color} text-uppercase mb-1 text-center`}>
                                        Total Vaksin 2</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{parseInt(totalVaksin2).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-2 col-md-6 mb-4">
                    <div class={`card shadow h-100 py-2`}>
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class={`text-xs font-weight-bold text-${color} text-uppercase mb-1 text-center`}>
                                        Total Vaksin 3</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">{parseInt(totalVaksin3).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default CardVaksin