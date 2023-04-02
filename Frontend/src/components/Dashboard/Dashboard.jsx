import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import {
    Box,
    Toolbar
} from "@mui/material"
import { HashLoader } from "react-spinners";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.scss";

export default function Dashboard() {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Dashboard - HeatCode</title>
                <meta name="description" content="Welcome to your dashboard!" />
            </Helmet>

            { loading ? (
                <div className="h-loader">
                    <HashLoader color="#74DBEF" loading={loading} size={200} />
                </div>
            ) : (

            <>
                {/* Navbar */}
                <Navbar />

                {/* dashboard */}
                <Box className="dashboard" sx={{ p: 3 }}>
                    <Toolbar />
                    heelo
                </Box>
            </>
            )}
            
        </HelmetProvider>
    );
}