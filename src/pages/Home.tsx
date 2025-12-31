import '../App.css';
import DecryptedText from '../components/DecryptedText';
import { SignUp } from '@clerk/clerk-react';
import logo from '../assets/logo.svg';
import { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';

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
            <Navigation isScrolled={isScrolled} showWaitlist={showStickyWaitlist} />
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
                        <a href="https://docs.proxlock.dev" className="btn btn-secondary"><span>Docs</span></a>
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
                    <div className="footer-social">
                        <a href="https://discord.gg/BZ4Uax5nnU" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Discord">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </a>
                        <a href="https://github.com/proxlock" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                    <p className="footer-text">
                        © {new Date().getFullYear()} ProxLock. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
