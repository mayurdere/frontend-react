import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import TaskList from './TaskList';
import axios from 'axios';
import UserContext from '../context/user-context'

const HomePage = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        // Update the document title using the browser API
        fetchUser()   
    }, []);

    const fetchUser = async () => {
        const userFetched = await axios.post('api/auth/me')
        .then(res => {
            setUser(res.data)
            console.log(res.data)
        }).catch(function (error) {
            console.log(error)
            setUser()
        })
    }

        
    
    
    return (
        <UserContext.Provider value={user}>
            <Header />
            <TaskList/>
            <Footer />
        </UserContext.Provider>
    );
}


export default HomePage;