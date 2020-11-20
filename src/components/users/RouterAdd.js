import axios from 'axios';
import { useHistory, Link } from 'react-router-dom'
import UserContext from '../../context/user-context'
import React, { useEffect, useState, useContext } from 'react';


const RouterAdd = () => {
    let history = useHistory()
    const [router, setRouter] = useState({
        sap_id: "",
        hostname: "",
        loopback: "",
        mac_address: "",
        type: "",
        user_id: ""
    })
    const user = useContext(UserContext);

    const { sap_id, hostname, loopback, mac_address, type } = router;

    const onInputChange = (e) => {
        setRouter({
            ...router,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("api/routers", router)
        history.push("/")
    }
    useEffect(() => {
        axios.post('api/auth/me')
            .then(res => {
                // setUser(res.data)
                console.log(res.data.id)
                setRouter({
                    ...router,
                    user_id: res.data.id
                })
            }).catch(function (error) {
                console.log(error)
            })
    }, [])
    return (
        <div>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow">
                    <Link className="my-0 mr-md-auto font-weight-normal text-white" to="/">Back</Link>
                </div>
            </header>
            <div className="container border shadow">
                <div className="form-row router-heading">
                    <h1 className="display-4 col-md-6">Add Router</h1>
                </div>
                <form className="mt-3" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="sap_id" className="font-weight-bold ml-1">SAP ID</label>
                        <input type="text" onChange={e => onInputChange(e)} value={sap_id} className="form-control" id="sap_id" name="sap_id" placeholder="SAP ID" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hostname" className="font-weight-bold ml-1">Hostname</label>
                        <input type="text" onChange={e => onInputChange(e)} value={hostname} className="form-control" id="hostname" name="hostname" placeholder="Hostname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loopback" className="font-weight-bold ml-1">Loopback</label>
                        <input type="text" onChange={e => onInputChange(e)} value={loopback} className="form-control" id="loopback" name="loopback" placeholder="Loopback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mac_address" className="font-weight-bold ml-1">MAC Address</label>
                        <input type="text" onChange={e => onInputChange(e)} value={mac_address} className="form-control" id="mac_address" name="mac_address" placeholder="MAC Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type" className="font-weight-bold ml-1">Type</label>
                        <input type="text" onChange={e => onInputChange(e)} value={type} className="form-control" id="type" name="type" placeholder="Type" />
                    </div>
                    <button type="submit" className="btn btn-outline-primary mb-4">Submit</button>
                </form>

            </div>
        </div>


    );
}

export default RouterAdd;