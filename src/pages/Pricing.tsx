import '../App.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Pricing() {
    return (
        <div className="pricing-page">
            <Navigation isScrolled={true} showWaitlist={true} />

            <div className="container pricing-container">
                <h1 className="section-title pricing-title">Simple Pricing</h1>
                <p className="pricing-subtitle">Choose the plan that fits your needs.</p>

                <div className="beta-notice-wrapper">
                    <div className="beta-notice">
                        <span className="beta-badge">Special Pricing</span>
                        <span>for the <strong>ESI x Korea Investments AI Agent, MCP & Sales Hackathon</strong>. Get a 90-day free trial for new Plus subscribers</span>
                    </div>
                </div>

                <div className="pricing-grid">
                    {/* Free Plan */}
                    <div className="pricing-card">
                        <h3 className="plan-name">Free</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>0
                        </div>
                        <p className="plan-billing">Always free</p>
                        <p className="plan-description">Get up to 3,000 proxy requests each month.</p>
                        <a href="https://app.proxlock.dev" className="btn btn-secondary plan-btn">Get Started</a>
                    </div>

                    {/* Plus Plan */}
                    <div className="pricing-card featured">
                        <h3 className="plan-name">Plus</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>9.99
                            <span className="period">/month</span>
                        </div>
                        <p className="plan-billing">Only billed monthly</p>
                        <p className="plan-description">Get up to 10,000 proxy requests each month.</p>
                        <a href="https://app.proxlock.dev" className="btn btn-primary plan-btn">Get Started</a>
                    </div>

                    {/* Pro Plan */}
                    <div className="pricing-card">
                        <h3 className="plan-name">Pro</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>19.99
                            <span className="period">/month</span>
                        </div>
                        <p className="plan-billing">Only billed monthly</p>
                        <p className="plan-description">Get up to 25,000 proxy requests each month.</p>
                        <a href="https://app.proxlock.dev" className="btn btn-secondary plan-btn">Get Started</a>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="pricing-card full-width">
                        <div className="plan-header-group">
                            <h3 className="plan-name">Enterprise</h3>
                            <div className="plan-price">
                                Custom
                            </div>
                        </div>
                        <p className="plan-billing">Contact us for details</p>
                        <p className="plan-description">Need higher limits? Get in touch for a custom plan.</p>
                        <a href="mailto:morris@proxlock.dev" className="btn btn-secondary plan-btn">Contact Us</a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Pricing;
