import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


const TaskList = () => {
    const [routers, setRouter] = useState();
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get('api/routers')
        .then(res => {
            setRouter(res.data)
            console.log(res.data)
        }).catch(function (error) {
            console.log(error)
        })
    }

    const deleteUser = async (id) => {
        await axios.get(`/api/routerDelete/${id}`)
        loadUsers()
    }

    return (
        <div className="container">
            <div className="form-row router-heading">
                <h1 className="display-4 col-md-6">Router List</h1>
                <Link className="mt-4 mb-4 btn btn-addRouter  btn-outline-primary" to="/router/add">Add Router</Link>
            </div>
            { routers ? <table className="table border shadow">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">SAP ID</th>
                        <th scope="col">Hostname</th>
                        <th scope="col">Loopback</th>
                        <th scope="col">MAC Address</th>
                        <th scope="col">Type</th>
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
                                <td>
                                    <Link to={`/router/${router.loopback}`} className="btn btn btn-outline-primary mr-2">View</Link>
                                    <Link to={`/router/edit/${router.loopback}`} className="btn btn btn-outline-dark mr-2">Edit</Link>
                                    <button  onClick={() => deleteUser(router.loopback)} className="btn btn-outline-danger">Delete</button> 
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                :
                <div>Loading...</div>
            }
        </div>
    );
}

export default TaskList;