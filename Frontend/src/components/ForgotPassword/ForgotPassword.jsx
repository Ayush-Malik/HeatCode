import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Container, Button, FormControl, TextField } from "@mui/material";
import { apiCall } from "../../utils/api";
import { HashLoader } from "react-spinners";
import logo from "../../images/HeatCode_logo.png";
import forgotImg from "../../images/forgot.png";
import "./ForgotPassword.scss"

export default function ForgotPassword() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        apiCall("/auth/forgot-password", "post", { email })
            .then((res) => {
                setLoading(false);
                setShow(true);
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
                <title>Forgot Password - HeatCode</title>
                <meta name="description" content="Forgot your password? No worries!" />
            </Helmet>

            { loading ? (
                <div className="h-loader">
                    <HashLoader color="#74DBEF" loading={loading} size={200} />
                </div>
            ) : (

            <>  
                {/* forgot */}
                <Container className="forgot">

                    {/* navbar */}
                    <Container className="forgot_nav">
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

                    {/* main form */}
                    <Container className="forgot_form">
                        <div className="form_right">
                            <h2>Forgot Password</h2>
                            <p>Enter your email address to reset your password</p>
                            <form onSubmit={handleSubmit}>
                                <FormControl className="form_control">
                                    <TextField
                                        className="form_input"
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button className="form_btn" type="submit">
                                        Send Reset Link
                                    </Button>
                                </FormControl>
                            </form>
                        </div>
                        <div className="form_left">
                            <img src={forgotImg} alt="Forgot" />
                        </div>
                    </Container>

                    { show && (
                        <Container className="forgot_alert">
                            An email has been sent to you with a link to reset your password. <br />
                            If your email is associated with an account, you will receive an email shortly.
                        </Container>
                    )}

                </Container>
            </>
            )}
            
        </HelmetProvider>
    );
}