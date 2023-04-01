import { HelmetProvider, Helmet } from "react-helmet-async";
import "./Dashboard.scss";

export default function Dashboard() {
    return (
        <HelmetProvider>

            {/* Title and Description */}
            <Helmet>
                <title>Dashboard - HeatCode</title>
                <meta name="description" content="Welcome to your dashboard!" />
            </Helmet>

            {/* dashboard */}
            <div className="dashboard">

            </div>
        </HelmetProvider>
    );
}