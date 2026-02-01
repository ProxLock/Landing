

export default function PricingHeader() {
    return (
        <>
            <h1 className="section-title pricing-title">Simple Pricing</h1>
            <p className="pricing-subtitle">Choose the plan that fits your needs.</p>

            <div className="beta-notice-wrapper">
                <div className="beta-notice">
                    <span className="beta-notice-top">
                        <span className="beta-badge">Beta Pricing</span>
                    </span>
                    <span className="beta-notice-bottom">Subscribe now to lock in these rates forever. Prices may increase after beta.</span>
                </div>
            </div>
        </>
    );
}
