import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { apiCall } from "../../utils/api";
import { getStorage } from "../../utils/localStore";
import { setUser } from "../../redux/slices/userSlice";
import { Box, Toolbar, Grid, FormControl, Select, MenuItem } from "@mui/material"
import { HashLoader } from "react-spinners";
import { FaUserAlt, FaRegEdit } from "react-icons/fa";
import { BsGithub, BsLinkedin, BsGlobe} from "react-icons/bs";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2"
import Navbar from "../Navbar/Navbar";
import "./Profile.scss";

export default function Profile() {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        RadialLinearScale,
        ArcElement,
        Title,
        Tooltip,
        Legend
    );    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getTooltipDataAttrs = (value) => {
        // Temporary hack around null value.date issue
        if (!value.date) {
          return null;
        }
        // Configuration for react-tooltip
        return {
          'data-tip': `Submissions on ${value.date}: ${value.count || 0}`,
        };
    };

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
                <Box className="profile_s" sx={{ p: 6 }}>
                    <Toolbar />

                    {/* profile */}
                    <Grid container spacing={2} className="profile">
                        <Grid md={2.7} item className="profile_info">
                            <FaRegEdit className="edit_icon" />
                            <FaUserAlt className="user_image" />
                            <h2>Aaditya</h2>
                            <span className="user_email">
                                aaditya@gmail.com
                            </span>
                            <span className="user_bio">
                                -
                            </span>
                            <div className="user_links">
                                <a href="google.com" target="_blank" rel="noreferrer">
                                    <BsGithub className="user_link" />
                                </a>
                                <a href="google.com" target="_blank" rel="noreferrer">
                                    <BsLinkedin className="user_link" />
                                </a>
                                <a href="google.com" target="_blank" rel="noreferrer">
                                    <BsGlobe className="user_link" />
                                </a>
                            </div>
                            <hr />
                            <div className="user_about">
                                <h3>About</h3>
                                <p className="user_about_item">
                                    JMIT
                                </p>
                                <p className="user_about_item">
                                    JMIT
                                </p>
                            </div>
                        </Grid>
                        <Grid md={9.3} item className="profile_stats">
                            <div className="profile_heatmap">
                                <h2>
                                    Submission Heatmap
                                </h2>
                                <CalendarHeatmap
                                    startDate={new Date('2022-01-01')}
                                    endDate={new Date('2023-04-01')}
                                    values={[
                                        { date: '2022-11-01', count: 121 },
                                        { date: '2022-01-22', count: 323 },
                                        { date: '2022-01-30', count: 3 },
                                    ]}
                                    classForValue={(value) => {
                                        if (!value) {
                                        return 'color-empty';
                                        }
                                        else if (value.count > 0 && value.count <= 100) {
                                            return 'color-scale-1';
                                        }
                                        else if (value.count > 100 && value.count <= 200) {
                                            return 'color-scale-2';
                                        }
                                        else if (value.count > 200 && value.count <= 300) {
                                            return 'color-scale-3';
                                        }
                                        else if (value.count > 300 && value.count <= 400) {
                                            return 'color-scale-4';
                                        }
                                    }}
                                    tooltipDataAttrs={(value) => getTooltipDataAttrs(value)}
                                />
                                <ReactTooltip />
                            </div>
                            <div className="stats">
                                <div className="submissions">
                                    <h2>
                                        Submissions
                                    </h2>
                                    <Doughnut
                                        data={{
                                            labels: ["Easy", "Medium", "Hard"],
                                            datasets: [
                                                {
                                                    data: [10, 20, 40],
                                                    backgroundColor: [
                                                        "#28e461",
                                                        "#c8e428",
                                                        "#e43428",
                                                    ],
                                                    hoverOffset: 4,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div className="monthly">
                                    <h2>
                                        Monthly Submissions
                                    </h2>
                                    <FormControl className="select">
                                        <Select
                                            value={10}
                                        >
                                            <MenuItem value={10}>October</MenuItem>
                                            <MenuItem value={20}>November</MenuItem>
                                            <MenuItem value={30}>December</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Line
                                        data={{
                                            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                                            datasets: [
                                                {
                                                    label: "Monthly Submissions",
                                                    data: [10, 20, 40, 30, 20, 10, 20, 30, 40, 50, 60, 70, 80, 90, 0, 10, 20, 30, 40, 50, 60, 74, 18, 19, 20, 10, 20, 0, 20, 20],
                                                    fill: false,
                                                    backgroundColor: "#74DBEF",
                                                    borderColor: "#74DBEF",
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="contest">
                                <h2>
                                    Contests Activity
                                </h2>
                                <div className="contest_list">
                                    <div className="contest_item">
                                        <div className="contest_item_info">
                                            Starter 73
                                        </div>
                                        <div className="contest_item_info">
                                            10/10/2021 - 10/10/2021
                                        </div>
                                        <div className="contest_item_info">
                                            100 / 200
                                        </div>
                                    </div>
                                    <div className="contest_item">
                                        <div className="contest_item_info">
                                            Starter 73
                                        </div>
                                        <div className="contest_item_info">
                                            10/10/2021 - 10/10/2021
                                        </div>
                                        <div className="contest_item_info">
                                            100 / 200
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </Box>
            </>
            )}
            
        </HelmetProvider>
    )
}