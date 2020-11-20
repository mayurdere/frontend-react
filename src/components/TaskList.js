import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user-context'
import { Link } from 'react-router-dom'
import axios from 'axios';


const TaskList = () => {
    const user = useContext(UserContext);

    const [routers, setRouter] = useState();
    useEffect(() => {
        loadRouters();
    }, []);

    const loadRouters = async () => {
        const result = await axios.get('api/routers')
        .then(res => {
            setRouter(res.data)
            console.log(res.data)
        }).catch(function (error) {
            console.log(error)
        })
    }

    const deleteRouter = async (id) => {
        await axios.get(`/api/routerDelete/${id}`)
        loadRouters()
    }

    return (
        <div className="container" style={{marginBottom: "8%"}}>
            <div className="form-row router-heading">
                <h1 className="display-4 col-md-6">Router List</h1>
                {user ?
                <Link className="mt-4 mb-4 btn btn-addRouter  btn-outline-primary" to="/router/add">Add Router</Link> 
                :
                <span></span>
                }
            </div>
            <div>
            { routers ? <table className="table border shadow">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">SAP ID</th>
                        <th scope="col">Hostname</th>
                        <th scope="col">Loopback</th>
                        <th scope="col">MAC Address</th>
                        <th scope="col">Type</th>
                        {user ?
                        <th scope="col">Action</th> : <span></span>}
                    </tr>
                </thead>
                <tbody>
                    {
                        routers.map((router, index) => (
                            <tr key={router.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{router.sap_id}</td>
                                <td>{router.hostname}</td>
                                <td>{router.loopback}</td>
                                <td>{router.mac_address}</td>
                                <td>{router.type}</td>
                                {user ?
                                <td>
                                    <Link to={`/router/${router.loopback}`} className="btn btn btn-outline-primary mr-2">View</Link>
                                    <Link to={`/router/edit/${router.loopback}`} className="btn btn btn-outline-dark mr-2">Edit</Link>
                                    <button  onClick={() => deleteRouter(router.loopback)} className="btn btn-outline-danger">Delete</button> 
                                </td> : <span></span>}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                :
                <div>Loading...</div>
            }
            </div>
        </div>
    );
}

export default TaskList;