import React from 'react'
import moment from "moment";

function CardBerita({ news }) {
    return (
        <div className="card">
            <img className="card-img-top" src={news.authorImage} alt="Card image cap" height={160} />
            <div className="card-body">
                <span class="badge badge-pill bg-default text-light my-2">Kompas TV</span>
                <h6 className="card-title">{news.title.substr(0, 35)}</h6>
                <p className="card-text">{moment(news.date).format("LL")}</p>
            </div>
        </div>
    )
}

export default CardBerita