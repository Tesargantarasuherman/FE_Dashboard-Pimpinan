import React from 'react'

function Card() {
    return (
        <div className="col-xl-3 col-md-3 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col-auto bg-primary p-2 rounded">
                            <i className="fas fa-calendar fa-2x text-gray-300" />
                        </div>
                        <div className="col ml-4">
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                                Earnings (Monthly)
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                $40,000
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card