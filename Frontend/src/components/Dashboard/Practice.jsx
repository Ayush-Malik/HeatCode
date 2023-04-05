import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Box, Toolbar } from "@mui/material"
import { apiCall } from "../../utils/api";
import { HashLoader } from "react-spinners";
import Navbar from "../Navbar/Navbar";
import "./Practice.scss";

export default function Practice() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setLoading(true);
        apiCall("/problem/showAll", "get", null, {}, true)
            .then((res) => {
                setLoading(false);
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                setTimeout(() => {
                    if(typeof err === "object")
                        alert(err[0].msg);
                    else
                        alert(err);
                }, 1000);
                navigate("/login");
            });
    }, [navigate]);

    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Practice - HeatCode</title>
                <meta name="description" content="Get ready for the interview" />
            </Helmet>

            { loading ? (
                <div className="h-loader">
                    <HashLoader color="#74DBEF" loading={loading} size={200} />
                </div>
            ) : (

            <>
                {/* Navbar */}
                <Navbar />

                {/* practice */}
                <Box className="practice" sx={{ p: 3 }}>
                    <Toolbar />
                    {user.name}
                </Box>
            </>
            )}
            
        </HelmetProvider>
    );
}