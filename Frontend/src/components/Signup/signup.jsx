import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Container, Button, FormControl, TextField } from "@mui/material";
import { apiCall } from "../../utils/api";
import HashLoader from "react-spinners/HashLoader";
import logo from "../../images/HeatCode_logo.png";
import SignupImg1 from "../../images/signup1.png";
import SignupImg2 from "../../images/signup2.png";
import "./Signup.scss";

export default function Signup() {

    const navigate = useNavigate();
    const [form , setForm] = useState(0);
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });
    const [instituteData, setInstituteData] = useState({
        name: "",
        instituteName: "",
        email: "",
        contact: "",
        address: "",
        password: "",
        role: "institute"
    });
    const [loading, setLoading] = useState(false);

    const handleFormChange = () => {
        setForm(!form);
    }

    const handleStudentData = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value,
        });
    }

    const handleInstituteData = (e) => {
        setInstituteData({
            ...instituteData,
            [e.target.name]: e.target.value,
        });
    }

    const handleStudentSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        apiCall("/auth/register/student", "post", studentData)
        .then((res) => {
            setLoading(false);
            navigate("/verify");
        })
        .catch((err) => {
            setLoading(false);
            setTimeout(() => {
                alert(err);
            }, 1000);
        });
    }

    const handleInstituteSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        apiCall("/auth/register/institute", "post", instituteData)
        .then((res) => {
            setLoading(false);
            navigate("/verify");
        })
        .catch((err) => {
            setLoading(false);
            alert(err);
        });
    }

    return(

        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Signup - HeatCode</title>
                <meta name="description" content="Signup to HeatCode and get your heat on!" />
            </Helmet>

            { loading ? (
                <div className="h-loader">
                    <HashLoader color="#74DBEF" loading={loading} size={200} />
                </div>
            ) : (
            <div className="signup">
                
                {/* navbar */}
                <Container className="signup_nav">
                    <div className="nav_logo">
                        <img src={logo} alt="HeatCode Logo" />
                        <h1>HeatCode</h1>
                    </div>
                    <div className="button-div">
                        <Button className="nav_btn" onClick={() => navigate("/")}>
                            Home
                        </Button>
                        <Button className="nav_btn" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </div>
                </Container>

                {/* Main Form */}
                { !form ? (
                    <Container className="signup_form s_form_student">
                        <div className="form_left">
                            <img src={SignupImg1} alt="Signup" />
                            <h2>Like to create an account as an Instructor / Institution ?</h2>
                            <Button className="form_l_btn" onClick={handleFormChange}>
                                Get Started
                            </Button>
                        </div>
                        <div className="form_right">
                            <h2>Create Account as Student</h2>
                            <p>We provide you with the best learning experience.</p>
                            <form onSubmit={handleStudentSignup}>
                                <FormControl className="form_control">
                                    <TextField
                                        className="form_input"
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        name="name"
                                        value={studentData.name}
                                        onChange={handleStudentData}
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Email Id"
                                        variant="outlined"
                                        name="email"
                                        value={studentData.email}
                                        onChange={handleStudentData}
                                        type="email"
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Password"
                                        variant="outlined"
                                        name="password"
                                        value={studentData.password}
                                        onChange={handleStudentData}
                                        type="password"
                                        required
                                    />
                                    <Button className="form_btn" type="submit">
                                        Signup
                                    </Button>
                                </FormControl>
                            </form>
                        </div>
                    </Container>
                ) : (
                    <Container className="signup_form s_form_inst">
                        <div className="form_right">
                        <h2>Create Account as Instructor / Institution</h2>
                            <p>We provide you best platform to create and manage contests.</p>
                            <form onSubmit={handleInstituteSignup}>
                                <FormControl className="form_control">
                                    <TextField
                                        className="form_input"
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        name="name"
                                        value={instituteData.name}
                                        onChange={handleInstituteData}
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Institute Name"
                                        type="text"
                                        variant="outlined"
                                        name="instituteName"
                                        value={instituteData.instituteName}
                                        onChange={handleInstituteData}
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Institute Email Id"
                                        variant="outlined"
                                        name="email"
                                        value={instituteData.email}
                                        onChange={handleInstituteData}
                                        type="email"
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Institute Contact Number"
                                        variant="outlined"
                                        name="contact"
                                        value={instituteData.contact}
                                        onChange={handleInstituteData}
                                        type="number"
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Institute Address"
                                        variant="outlined"
                                        name="address"
                                        value={instituteData.address}
                                        onChange={handleInstituteData}
                                        type="text"
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Password"
                                        variant="outlined"
                                        name="password"
                                        value={instituteData.password}
                                        onChange={handleInstituteData}
                                        type="password"
                                        required
                                    />
                                    <Button className="form_btn" type="submit">
                                        Signup
                                    </Button>
                                </FormControl>
                            </form>
                        </div>
                        <div className="form_left">
                            <img src={SignupImg2} alt="Signup" />
                            <h2>Like to create an account as an Student ?</h2>
                            <Button className="form_l_btn" onClick={handleFormChange}>
                                Get Started
                            </Button>
                        </div>
                    </Container>
                )
                }

            </div>
            )}

        </HelmetProvider>
    );
}