import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { 
    Box,
    Toolbar,
    Grid,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from "@mui/material"
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
    const checkColor = {color: '#74DBEF','&.Mui-checked': {color: '#74DBEF'}};
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [visibleRows, setVisibleRows] = useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setVisibleRows(newPage * rowsPerPage + rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        setVisibleRows(+event.target.value);
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
                <Box className="practice" sx={{ p: 6 }}>
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

                    {/* problems */}
                    <div className="practice_problems">
                        <h2>Practice Problems</h2>

                        <Grid container spacing={2} className="practice_problems_container">
                            <Grid md={3} item className="practice_problems_left">
                                <div className="header">
                                    <h2>Filters</h2>
                                    <Button className="cls-btn">
                                        Clear All
                                    </Button>
                                </div>

                                <div className="filters">
                                    <div className="filter">
                                        <h3>Difficulty</h3>
                                        <FormGroup className="options">
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Label" />
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Disabled" />
                                        </FormGroup>
                                    </div>

                                    <div className="filter">
                                        <h3>Topics</h3>
                                        <FormGroup className="options">
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Label" />
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Disabled" />
                                        </FormGroup>
                                    </div>
                                    <div className="filter">
                                        <h3>Topics</h3>
                                        <FormGroup className="options">
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Label" />
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Disabled" />
                                        </FormGroup>
                                    </div>
                                    <div className="filter">
                                        <h3>Topics</h3>
                                        <FormGroup className="options">
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Label" />
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Disabled" />
                                        </FormGroup>
                                    </div>
                                    <div className="filter">
                                        <h3>Topics</h3>
                                        <FormGroup className="options">
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Label" />
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Disabled" />
                                        </FormGroup>
                                    </div>
                                    <div className="filter">
                                        <h3>Topics</h3>
                                        <FormGroup className="options">
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Label" />
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Disabled" />
                                        </FormGroup>
                                    </div>
                                    <div className="filter">
                                        <h3>Topics</h3>
                                        <FormGroup className="options">
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Label" />
                                            <FormControlLabel control={<Checkbox sx={checkColor} />} label="Disabled" />
                                        </FormGroup>
                                    </div>
                                </div>
                            </Grid>

                            <Grid md={9} item className="practice_problems_right">
                                <div className="practice_search">
                                    <TextField className="search" label="Search Questions" variant="outlined" />
                                </div>

                                <div className="practice_problems_list">
                                    <TableContainer>
                                        <Table className="table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Problem</TableCell>
                                                    <TableCell>Difficulty</TableCell>
                                                    <TableCell>Topics</TableCell>
                                                    <TableCell>Accuracy</TableCell>
                                                    <TableCell>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                { Array(visibleRows).fill().map((_, index) => (
                                                    <TableRow>
                                                        <TableCell>1. Solve Me First</TableCell>
                                                        <TableCell>Easy</TableCell>
                                                        <TableCell>Warmup</TableCell>
                                                        <TableCell>100%</TableCell>
                                                        <TableCell>Not Attempted</TableCell>
                                                    </TableRow>
                                                )) }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        className="table_pagination"
                                        rowsPerPageOptions={[10, 20, 50, 100]}
                                        component="div"
                                        count={100}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                </Box>
            </>
            )}
            
        </HelmetProvider>
    );
}