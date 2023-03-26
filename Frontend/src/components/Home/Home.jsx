import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Container, Button, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { BsCheck } from "react-icons/bs";
import { MdExpandMore } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PreLoader from "../PreLoader/PreLoader";
import logo from "../../images/HeatCode_logo.png";
import HeaderImg from "../../images/header.png";
import crousel1 from "../../images/crousel-1.jpg";
import crousel2 from "../../images/crousel-2.jpg";
import crousel3 from "../../images/crousel-3.jpg";
import crousel4 from "../../images/crousel-4.jpg";
import crousel5 from "../../images/crousel-5.jpg";
import mailIcon from "../../images/mail-icon.png";
import githubIcon from "../../images/github-icon.png";
import linkedinIcon from "../../images/linkedin-icon.png";
import "./Home.scss";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Home - HeatCode</title>
                <meta name="description" content="HeatCode - Heating up the competition, one code at a time" />
            </Helmet>

            {/* Preloader */}
            { loading ? 
                <PreLoader /> 
                :
                <div className="home">

                    {/* navbar */}
                    <Container className="home_nav">
                        <div className="nav_logo">
                            <img src={logo} alt="HeatCode Logo" />
                            <h1>HeatCode</h1>
                        </div>
                        <Button className="nav_btn">
                            Get Started
                        </Button>
                    </Container>

                    {/* header */}
                    <Container className="home_header">
                        <div className="header_body">
                            <h1>#Welcome to HeatCode!</h1>
                            <p>Heating up the competition, one code at a time</p>
                            <Button className="header_btn">
                                Create account
                            </Button>
                        </div>
                        <div className="header_banner">
                            <img src={HeaderImg} alt="HeatCode Logo" />
                        </div>
                    </Container>

                    {/* feature */}
                    <Container className="home_feature">
                        <div className="feature_left">
                            <h6>FEATURE RICH</h6>
                            <h1>
                                HeatCode : Empowering students and educators through a platform that
                                provides a competitive environment for coding.
                            </h1>
                        </div>
                        <div className="feature_right">
                            <h2>Quick and Easy</h2>
                            <div className="feature_right_body">
                                <p>
                                    <span> <BsCheck /> Easy Contest Creation</span> - Create a contest in minutes with our
                                    intuitive contest creation tool.
                                </p>
                                <p>
                                    <span> <BsCheck /> Data Driven</span> - HeatCode provides you with the data you need to
                                    improve your students' performance.
                                </p>
                                <p>
                                    <span> <BsCheck /> Easy to Use</span> - HeatCode is easy to use and provides a seamless
                                    experience for both students and educators.
                                </p>
                            </div>
                        </div>
                    </Container>

                    {/* crousel section */}
                    <Container className="home_crousel">
                        <div className="heading">
                            Platform where coding meets competition and collaboration
                            meets Technology
                        </div>
                        <Carousel
                            className="crousel"
                            showArrows={false}
                            showStatus={false}
                            showThumbs={false}
                            infiniteLoop={true}
                            autoPlay={true}
                            stopOnHover={true}
                            swipeable={true}
                            emulateTouch={true}
                        >
                            <div>
                                <img src={crousel4} alt="Crousel 4" />
                            </div>
                            <div>
                                <img src={crousel1} alt="Crousel 1" />
                            </div>
                            <div>
                                <img src={crousel5} alt="Crousel 5" />
                            </div>
                            <div>
                                <img src={crousel2} alt="Crousel 2" />
                            </div>
                            <div>
                                <img src={crousel3} alt="Crousel 3" />
                            </div>
                        </Carousel>
                    </Container>

                    {/* faq section */}
                    <Container className="home_faq">
                        <div className="faq_sub">
                            FREQUENTLY ASKED QUESTIONS
                        </div>
                        <div className="faq_main">
                            General <span>FAQs</span>
                        </div>
                        <div className="faq_body">
                            <Accordion className="faq_accord" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary expandIcon={<MdExpandMore className="accord_icon" />} >
                                    <Typography className="accord_head">
                                        Q: What is HeatCode?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className="accord_body">
                                        HeatCode is a platform that provides a competitive environment for coding.
                                        Students can compete against each other in a variety of coding challenges.
                                        HeatCode also provides educators to organize DSA contests and track their
                                        students' progress.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="faq_accord" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary expandIcon={<MdExpandMore className="accord_icon" />} >
                                    <Typography className="accord_head">
                                        Q: How do I create a contest?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className="accord_body">
                                        To create a contest, you must first need to create an account on behalf of your
                                        institution. Once you have created an account, you can create a contest by
                                        clicking on the "Create Contest" button.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="faq_accord" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary expandIcon={<MdExpandMore className="accord_icon" />} >
                                    <Typography className="accord_head">
                                        Q: As a student, how do I participate in a contest?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className="accord_body">
                                        To participate in a contest, you must first need to create an account. Once you
                                        have created an account, you can participate in a contest by clicking on the
                                        contest link shared by your educator.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Container>

                    {/* contact */}
                    <Container className="home_contact">
                        <div className="contact_sub">
                            CONTACT US
                        </div>
                        <div className="contact_main">
                            <span>24/7</span> Online Support
                        </div>
                        <div className="contact_body">
                            <div className="contact_card">
                                <div className="c-bg"></div>
                                <div className="c-body">
                                    <img src={mailIcon} alt="Mail Icon" />
                                    <a href="mailto:heatcode@gmail.com">Mail Us</a>
                                </div>
                            </div>
                            <div className="contact_card">
                                <div className="c-bg"></div>
                                <div className="c-body">
                                    <img src={githubIcon} alt="Github Icon" />
                                    <a href="https://github.com/Ayush-Malik/HeatCode" target="_blank" rel="noreferrer">Reach Us</a>
                                </div>
                            </div>
                            <div className="contact_card">
                                <div className="c-bg"></div>
                                <div className="c-body">
                                    <img src={linkedinIcon} alt="Linkedin Icon" />
                                    <a href="https://www.linkedin.com/company/heatcode" target="_blank" rel="noreferrer">Connect Us</a>
                                </div>
                            </div>
                        </div>
                    </Container>

                </div>
            }

        </HelmetProvider>
    );
}