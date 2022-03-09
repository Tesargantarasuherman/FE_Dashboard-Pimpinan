import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Data() {
    const [covid, setCovid] = useState([])
    useEffect(() => {
        getCovid()
        console.log(covid)
    },[])
    const getCovid = () => {
        axios.get(`https://covid19.bandung.go.id/api/covid19bdg/v1/covidsummary/get`, {
            headers: {
                Authorization: 'RkplDPdGFxTSjARZkZUYi3FgRdakJy',
            }
        }).then(res => {
            setCovid(res.data.data)
        })
    }
    return (
        <div>Data</div>
    )
}

export default Data