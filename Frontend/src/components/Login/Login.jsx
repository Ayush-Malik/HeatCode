import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { Container, Button, FormControl, TextField } from "@mui/material";
import { apiCall } from "../../utils/api";
import { HashLoader } from "react-spinners";
import logo from "../../images/HeatCode_logo.png";
import LoginImg from "../../images/login1.png";
import "./Login.scss";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        apiCall("/auth/login", "post", loginData, {}, true)
            .then((res) => {
                setLoading(false);
                dispatch(setUser(res.data.user));
                navigate("/dashboard");
            })
            .catch((err) => {
                setLoading(false);
                setTimeout(() => {
                    if(typeof err === "object")
                        alert(err[0].msg);
                    else
                        alert(err);
                }, 1000);
            });

    };

    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Login - HeatCode</title>
                <meta name="description" content="Login to HeatCode and get your heat on!" />
            </Helmet>

            { loading ? (
                <div className="h-loader">
                    <HashLoader color="#74DBEF" loading={loading} size={200} />
                </div>
            ) : (
            <div className="login">
                
                {/* navbar */}
                <Container className="login_nav">
                    <div className="nav_logo">
                        <img src={logo} alt="HeatCode Logo" />
                        <h1>HeatCode</h1>
                    </div>
                    <div className="button-div">
                        <Button className="nav_btn" onClick={() => navigate("/")}>
                            Home
                        </Button>
                        <Button className="nav_btn" onClick={() => navigate("/signup")}>
                            Sign Up
                        </Button>
                    </div>
                </Container>

                {/* main form */}
                <Container className="login_form">
                    <div className="form_left">
                        <img src={LoginImg} alt="Login" />
                    </div>
                    <div className="form_right">
                        <h2>Login</h2>
                        <p>Welcome back! Login to your account.</p>
                        <form onSubmit={handleSubmit}>
                            <FormControl className="form_control">
                                <TextField
                                    className="form_input"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    className="form_input"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button className="form_btn" type="submit">
                                    Login
                                </Button>
                            </FormControl>
                        </form>
                    </div>
                </Container>

            </div>
            )}

        </HelmetProvider>
    );
}