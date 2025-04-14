import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from './Loader';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children}) => {
    const { data: currentUser, loading } = useSelector((state) => state.auth);
    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayed(true);
        }, 100)
        return () => clearTimeout(timer);
    }, [])

    if (!delayed) {
       return   <Loader />
    }

    if (loading) {
       return  <Loader />
    }

    if (currentUser) {
       return  <Navigate to={'/home'} replace />
    }
    return children ; 
}