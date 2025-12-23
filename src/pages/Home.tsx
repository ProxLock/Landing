import '../App.css';
import DecryptedText from '../components/DecryptedText';
import { SignUp } from '@clerk/clerk-react';
import logo from '../assets/logo.svg';
import { useState, useRef, useEffect } from 'react';

function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showStickyWaitlist, setShowStickyWaitlist] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const waitlistBtnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const isMobile = window.innerWidth <= 768;
            const targetRef = isMobile ? subtitleRef : titleRef;

            if (targetRef.current) {
                const element = targetRef.current;
                const threshold = element.offsetTop + element.offsetHeight - (isMobile ? 0 : 50);

                if (window.scrollY > threshold) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }

            if (waitlistBtnRef.current) {
                const btnElement = waitlistBtnRef.current;
                const rect = btnElement.getBoundingClientRect();

                // Show when the button has scrolled past the top of the viewport
                if (rect.bottom < 0) {
                    setShowStickyWaitlist(true);
                } else {
                    setShowStickyWaitlist(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="landing-page">
            <div className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
                <img src={logo} alt="ProxLock Logo" className="app-logo" />
                <span className="sticky-title">ProxLock</span>
                <div className="header-actions">
                    <div className="nav-pill">
                        <a href="/pricing" className="nav-link">Pricing</a>
                        <a href="https://docs.proxlock.dev" className="nav-link">Docs</a>
                    </div>
                    <a
                        href="https://app.proxlock.dev"
                        className={`btn btn-primary sticky-waitlist-btn ${showStickyWaitlist ? 'visible' : ''}`}
                    >
                        <span>Get Started</span>
                    </a>
                </div>
            </div>
            <header className="hero">
                <img src={logo} alt="ProxLock Logo" className="hero-logo" />
                <div className="container">
                    <h1 className="hero-title" ref={titleRef}>ProxLock</h1>
                    <p className="hero-subtitle" ref={subtitleRef}>
                        <DecryptedText
                            text="Secure API Proxy Management"
                            speed={50}
                            delay={500}
                        />
                    </p>
                    <p className="hero-description">
                        Protect and manage your API keys with ease. ProxLock provides a secure gateway
                        for your applications<sup>1</sup>, ensuring your sensitive credentials stay safe.
                    </p>
                    <div className="hero-actions">
                        <a href="https://app.proxlock.dev" className="btn btn-primary" ref={waitlistBtnRef}><span>Get Started</span></a>
                    </div>
                </div>
            </header>

            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="how-it-works-content">
                        <div className="how-it-works-subsection">
                            <h3 className="subsection-title">Key Storage & Splitting</h3>
                            <p className="how-it-works-description">
                                ProxLock uses an XORed partial key system to ensure your complete API key is never stored in one place.
                                When you upload your API key to ProxLock, we split it into two partial keys, so we don't know your complete key either.
                            </p>
                        </div>
                        <div className="how-it-works-subsection">
                            <h3 className="subsection-title">Dynamic Proxying</h3>
                            <p className="how-it-works-description">
                                When your app makes an API request, ProxLock routes it through our secure proxy infrastructure.
                                We validate the app instance using Apple's Device Check to ensure authenticity and prevent unauthorized access.
                                The bearer token is then dynamically constructed by combining the partial keys, and the request is forwarded
                                to the target service with proper authentication, which is then relayed back to your app.
                                This process ensures your credentials remain secure while
                                maintaining minimal latency and maximum reliability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section id="open-source" className="open-source">
                <div className="container">
                    <h2 className="section-title">Open Source</h2>
                    <p className="open-source-description">
                        ProxLock is built with transparency in mind. Our entire codebase is open source and available on GitHub.
                        We believe in security through openness, not obscurity.
                    </p>

                    <div className="open-source-grid">
                        <a href="https://github.com/ProxLock/Backend" target="_blank" rel="noopener noreferrer" className="repo-card">
                            <h3 className="repo-title">Backend</h3>
                            <p className="repo-description">The core API proxy and key management infrastructure.</p>
                            <div className="repo-link">View Repository →</div>
                        </a>

                        <a href="https://github.com/ProxLock/Frontend" target="_blank" rel="noopener noreferrer" className="repo-card">
                            <h3 className="repo-title">Frontend</h3>
                            <p className="repo-description">The dashboard for managing your API keys and projects.</p>
                            <div className="repo-link">View Repository →</div>
                        </a>

                        <a href="https://github.com/ProxLock/Landing" target="_blank" rel="noopener noreferrer" className="repo-card">
                            <h3 className="repo-title">Landing Page</h3>
                            <p className="repo-description">This website! See how we present ProxLock to the world.</p>
                            <div className="repo-link">View Repository →</div>
                        </a>
                    </div>

                    <div className="open-source-actions">
                        <a href="https://github.com/proxlock" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            View Organization
                        </a>
                    </div>
                </div>
            </section>



            <section id="signup" className="cta">
                <div className="container">
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-description">
                        Join our limited Apple platform beta. <span className="cta-description-break">Don't worry, we plan to support other platforms soon.</span>
                    </p>
                    <div className="waitlist-container">
                        <SignUp />
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p className="footnote-text">
                        <sup>1</sup> ProxLock is currently in a limited beta for Apple platforms only.
                    </p>
                    <p className="footer-text">
                        © {new Date().getFullYear()} ProxLock. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
