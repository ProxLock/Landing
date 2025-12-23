import '../App.css';
import Navigation from '../components/Navigation';

function Pricing() {
    return (
        <div className="pricing-page">
            <Navigation isScrolled={true} showWaitlist={true} />

            <div className="container pricing-container">
                <h1 className="section-title pricing-title">Simple Pricing</h1>
                <p className="pricing-subtitle">Choose the plan that fits your needs.</p>

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

                    {/* 10k Requests Plan */}
                    <div className="pricing-card featured">
                        <h3 className="plan-name">Plus</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>10
                            <span className="period">/month</span>
                        </div>
                        <p className="plan-billing">Only billed monthly</p>
                        <p className="plan-description">Get up to 10,000 proxy requests each month.</p>
                        <a href="https://app.proxlock.dev" className="btn btn-primary plan-btn">Get Started</a>
                    </div>

                    {/* 25k Requests Plan */}
                    <div className="pricing-card">
                        <h3 className="plan-name">Pro</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>20
                            <span className="period">/month</span>
                        </div>
                        <p className="plan-billing">Only billed monthly</p>
                        <p className="plan-description">Get up to 25,000 proxy requests each month.</p>
                        <a href="https://app.proxlock.dev" className="btn btn-secondary plan-btn">Get Started</a>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    <p className="footer-text">
                        © {new Date().getFullYear()} ProxLock. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Pricing;
