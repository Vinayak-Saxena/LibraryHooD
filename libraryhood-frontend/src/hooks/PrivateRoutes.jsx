import React, { useEffect } from "react";
import { useAuthContext } from '..//hooks/useAuthContext';
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.token) {
            console.log(user);
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user || !user.token) {
       
        return null;
    }

    return <Outlet />;
};

export default PrivateRoutes;
