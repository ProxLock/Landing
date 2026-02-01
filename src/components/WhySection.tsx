
const WhySection = () => {
    return (
        <section className="why-section">
            <div className="container">
                <h2 className="section-title">Why ProxLock?</h2>

                <div className="why-content-wrapper">
                    <div className="why-intro">
                        <p>
                            If you bundle an API key in your app, anyone can extract it and use it for their own apps.
                            Suddenly, you're paying for their users.
                        </p>
                        <p className="highlight-text">
                            ProxLock makes it impossible<sup>1</sup> for others to abuse your API keys and infrastructure.
                        </p>
                    </div>

                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3>Global Rate Limiting</h3>
                            <p>
                                We enable rate limiting for individual keys across all platforms, ensuring no single user can exhaust your quota.
                            </p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                                </svg>
                            </div>
                            <h3>Mobile Attestation</h3>
                            <p>
                                On mobile, we use hardware cryptography based attestation to ensure every request comes from an unmodified copy of your app.
                            </p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <h3>Web Opt-In</h3>
                            <p>
                                Web usage is opt-in on a key-by-key basis. You have full control over which keys have a lower trust level.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhySection;
