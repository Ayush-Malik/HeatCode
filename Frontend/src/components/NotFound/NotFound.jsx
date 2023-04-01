import { HelmetProvider, Helmet } from "react-helmet-async";
import NotImage from "../../images/not-found.png";
import "./NotFound.scss";

export default function NotFound() {
    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Not Found - HeatCode</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Helmet>

            {/* not found */}
            <div className="notfound">
                <img src={NotImage} alt="Not Found" />
                <h2>
                    The page you are looking for does not exist!
                </h2>
            </div>

        </HelmetProvider>
    );
}