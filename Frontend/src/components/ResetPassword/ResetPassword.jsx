import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Container, Button, FormControl, TextField } from "@mui/material";
import { apiCall } from "../../utils/api";
import { HashLoader } from "react-spinners";
import logo from "../../images/HeatCode_logo.png";
import resetImg from "../../images/reset.png";
import "./ResetPassword.scss";

export default function ResetPassword() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false);

    const passwordResetToken = searchParams.get("passwordResetToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true);
        apiCall("/auth/reset-password", "post", { newPassword: newPassword, passwordResetToken: passwordResetToken })
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
                <title>Reset Password - HeatCode</title>
                <meta name="description" content="Reset Password - HeatCode" />
            </Helmet>

            { loading ? (
                <div className="h-loader">
                    <HashLoader color="#74DBEF" loading={loading} size={200} />
                </div>
            ) : (

            <>  
                {/* reset */}
                <Container className="reset">

                    {/* navbar */}
                    <Container className="reset_nav">
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
                    <Container className="reset_form">
                        <div className="form_right">
                            <h2>Reset Password</h2>
                            <p>Enter your new password below.</p>
                            <form onSubmit={handleSubmit}>
                                <FormControl className="form_control">
                                    <TextField
                                        className="form_input"
                                        label="New Password"
                                        variant="outlined"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        className="form_input"
                                        label="Confirm Password"
                                        variant="outlined"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <Button className="form_btn" type="submit">
                                        Reset Password
                                    </Button>
                                </FormControl>
                            </form>
                        </div>
                        <div className="form_left">
                            <img src={resetImg} alt="Reset" />
                        </div>
                    </Container>

                    { show && (
                        <Container className="reset_alert">
                            Your Password has been reset. <br />
                            You can now go to the login page and login with your new password.
                        </Container>
                    )}

                </Container>
            </>
            )}
            
        </HelmetProvider>
    );
}