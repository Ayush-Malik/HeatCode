import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { Box, Toolbar } from "@mui/material"
import { apiCall } from "../../utils/api";
import { getStorage } from "../../utils/localStore";
import { setUser } from "../../redux/slices/userSlice";
import { HashLoader } from "react-spinners";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Navbar from "../Navbar/Navbar";
import practiceImg1 from "../../images/practice1.png";
import practiceImg2 from "../../images/practice2.png";
import practiceImg3 from "../../images/practice3.png";
import "./Practice.scss";

export default function Practice() {

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
                <Navbar setLoading={setLoading} />

                {/* practice */}
                <Box className="practice" sx={{ p: 3 }}>
                    <Toolbar />
                    
                    {/* Crousel */}
                    <div className="practice_crousel">
                        <Carousel
                            className="p_crousel"
                            showArrows={false}
                            showStatus={false}
                            showThumbs={false}
                            infiniteLoop={true}
                            autoPlay={true}
                            stopOnHover={true}
                            swipeable={true}
                            emulateTouch={true}
                        >
                            <div className="practice_carousel_item">
                                <div className="practice_carousel_item_left">
                                    <h2>
                                        Hello {user.name}
                                    </h2>
                                    <p>
                                        Welcome to HeatCode's Practice Section. <br />
                                        Here you can practice your coding skills. <br />
                                    </p>
                                </div>
                                <div className="practice_carousel_item_right">
                                    <img src={practiceImg1} alt="practice 1" />
                                </div>
                            </div>
                            <div className="practice_carousel_item">
                                <div className="practice_carousel_item_left">
                                    <h2>
                                        Participate in contests
                                    </h2>
                                    <p>
                                        You can participate in contests and win exciting prizes. <br />
                                        You can also see your rank in the leaderboard. <br />
                                    </p>
                                </div>
                                <div className="practice_carousel_item_right">
                                    <img src={practiceImg2} alt="practice 2" />
                                </div>
                            </div>
                            <div className="practice_carousel_item">
                                <div className="practice_carousel_item_left">
                                    <h2>
                                        Get your Institute at HeatCode
                                    </h2>
                                    <p>
                                        You can get your institute at HeatCode. <br />
                                        And Institutes can Create Contests and manage their students. <br />
                                    </p>
                                </div>
                                <div className="practice_carousel_item_right">
                                    <img src={practiceImg3} alt="practice 2" />
                                </div>
                            </div>
                        </Carousel>
                    </div>

                </Box>
            </>
            )}
            
        </HelmetProvider>
    );
}