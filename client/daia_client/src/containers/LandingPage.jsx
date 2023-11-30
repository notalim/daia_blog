import React from "react";
import Feature from "../components/Feature";
import "../containers/styles/LandingPage.css";

import medicineIcon from "../assets/icons/medicine-wellness-icon.svg";
import intelligenceIcon from "../assets/icons/intelligence.svg";
import bloodTestIcon from "../assets/icons/blood-test-icon.svg";
import daiaIcon from "../assets/icons/daia-logo.svg";

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-page__header">
            <img src={daiaIcon} alt={`Daia Icon`} width="256px"/>
                <p>Your Personal Diabetes Companion</p>
            </div>
            <div className="landing-page__features">
                <Feature
                    title="Real-time Blood Sugar Monitoring"
                    description="Daia constantly monitors your blood sugar levels in real-time, providing you with up-to-the-minute data to help you manage your diabetes effectively."
                    icon={medicineIcon}
                />
                <Feature
                    title="Emergency Alerts to Loved Ones"
                    description="In case of critical blood sugar readings, Daia automatically sends alerts to your designated loved ones, ensuring that help is on the way when you need it most."
                    icon={bloodTestIcon}
                />
                <Feature
                    title="Intelligent Insights and Trends"
                    description="Get comprehensive insights into your blood sugar trends over time. Daia analyzes your data to provide personalized recommendations for a healthier lifestyle."
                    icon={intelligenceIcon}
                />
                {/* Add more features here as needed */}
            </div>
            <div className="landing-page__cta">
                <h2>Register for Daia Now!</h2>
                <p>Take control of your diabetes management with Daia. Download the app today and experience a new level of convenience and peace of mind.</p>
                <button>Register Now</button>
            </div>
            <div className="landing-page__footer">
                <p>© 2023 Daia. All rights reserved. Privacy Policy | Terms of Service</p>
            </div>
        </div>
    );
}

export default LandingPage;
