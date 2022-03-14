import React from 'react'

function CardProggress({title,total,totalProgress,dipantau,dipantauProgress,discarded,discardedProgress}) {
    return (
        <div class="col-xl-6 col-md-6 mb-4">
            <div class="card border-bottom-primary shadow h-100 py-2">
                <div class="card-body">
                    <h5 className="text-center mb-0 font-weight-bold text-gray-800 mb-2">{title}</h5>
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2 text-center">
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{total}</div>
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{totalProgress > 0 ? <i className='fa fa-lg fa-angle-double-up'> </i> : <i className='fa fa-lg fa-angle-double-down'> </i>} {totalProgress}</div>
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">Total</div>
                        </div>
                        <div class="col mr-2 text-center">
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{dipantau}</div>
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{dipantauProgress > 0 ? <i className='fa fa-lg fa-angle-double-up'> </i> : <i className='fa fa-lg fa-angle-double-down'> </i>} {dipantauProgress}</div>
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">Dipantau</div>
                        </div>
                        <div class="col mr-2 text-center">
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{discarded}</div>
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{discardedProgress > 0 ? <i className='fa fa-lg fa-angle-double-up'> </i> : <i className='fa fa-lg fa-angle-double-down'> </i>} {discardedProgress}</div>
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">Discarded</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProggress