import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const Router = () => {
    const [router, setRouter] = useState({
        sap_id: "",
        hostname: "",
        loopback: "",
        mac_address: "",
        type: "",
        user_id: ""
    })

    useEffect(() => {
        loadUser()
    }, [])

    const { id } = useParams()
    const loadUser = async () => {
        const result = await axios.get(`/api/routers/${id}`)
        setRouter(result.data)
    }
    return (
        <div>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow">
                    <Link className="my-0 mr-md-auto font-weight-normal text-white" to="/">Back</Link>
                </div>
            </header>
            <div className="card ml-5 ">
                <div className="display-4  py-4 card-header w-600">
                    Router Details
                </div>
                <ul className="list-group w-100">
                    <li className="list-group-item">Sap ID: {router.sap_id}</li>
                    <li className="list-group-item">Hostname: {router.hostname}</li>
                    <li className="list-group-item">Loopback: {router.loopback}</li>
                    <li className="list-group-item">MAC Address: {router.mac_address}</li>
                    <li className="list-group-item">Type: {router.loopback}</li>
                </ul>
            </div>
        </div>

    );
}

export default Router;