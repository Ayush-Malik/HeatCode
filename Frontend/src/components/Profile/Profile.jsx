import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { apiCall } from "../../utils/api";
import { getStorage } from "../../utils/localStore";
import { setUser } from "../../redux/slices/userSlice";
import { Box, Toolbar } from "@mui/material"
import { HashLoader } from "react-spinners";
import Navbar from "../Navbar/Navbar";
import "./Profile.scss";

export default function Profile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user === null){
            const localUser = getStorage("user");
            if(localUser === null){
                navigate("/login");
            }
            else{
                dispatch(setUser(localUser));
            }
        }
    }, [navigate, dispatch, user]);

    useEffect(() => {
        apiCall("/problem/showAll", "get", null, {}, true)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                navigate("/login");
            });
    }, [navigate]);

    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Profile - HeatCode</title>
                <meta name="description" content="Profile page of HeatCode" />
            </Helmet>

            { loading ? (
                <div className="h-loader">
                    <HashLoader color="#74DBEF" loading={loading} size={200} />
                </div>
            ) : (

            <>
                {/* Navbar */}
                <Navbar setLoading={setLoading} />

                {/* profile */}
                <Box className="profile" sx={{ p: 3 }}>
                    <Toolbar />
                </Box>
            </>
            )}
            
        </HelmetProvider>
    )
}