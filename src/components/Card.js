import React from 'react'

function Card({ icon, title, value, color, col, type,bgItem }) {
    return (
        <div className={`col-xl-${col} col-md-${col} mb-4`}>
            <div className={`card ${type}-${color} shadow h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className={`col-auto ${bgItem}-${color}  p-2 rounded text-light`}>
                            {icon}
                        </div>
                        <div className="col ml-4">
                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                                {title}
                            </div>
                            <div className="text-sm font-weight-bold text-gray-800 text-uppercase">
                                {value}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card