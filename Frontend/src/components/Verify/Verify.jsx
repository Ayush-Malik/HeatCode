import { HelmetProvider, Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import "./Verify.scss";

export default function Verify() {

    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/login");
    }

    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Verify Account - HeatCode</title>
                <meta name="description" content="Verify your account!" />
            </Helmet>
            <>
                <Container className="verify">
                    <h2>
                        Please check your email for a verification link.
                    </h2>
                    <p>
                        We have sent you an email with a link to verify your account.
                        Please check your email and click on the link to verify your account.
                        If you do not see the email in your inbox, please check your spam folder.
                    </p>
                    <div className="btn">
                        <Button className="v-btn" onClick={handleContinue}>
                            Continue
                        </Button>
                    </div>
                </Container>
            </>

        </HelmetProvider>
    );
}