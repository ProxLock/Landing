import { useState } from 'react';
import logo from '../assets/logo.svg';
import { URLS } from '../constants';

interface NavigationProps {
    isScrolled?: boolean;
    showWaitlist?: boolean;
}

export default function Navigation({ isScrolled = false, showWaitlist = true }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
                <a href="/" className="logo-link">
                    <img src={logo} alt="ProxLock Logo" className="app-logo" />
                </a>
                <a href="/" className="logo-link">
                    <span className="sticky-title">ProxLock</span>
                </a>
                <div className="header-actions">
                    <div className="nav-pill">
                        <a href="/pricing" className="nav-link">Pricing</a>
                        <a href={URLS.DOCS} className="nav-link">Docs</a>
                        <a href={URLS.DISCORD} className="nav-link" target="_blank" rel="noopener noreferrer">Discord</a>
                    </div>
                    <a
                        href={URLS.APP}
                        className={`btn btn-primary sticky-waitlist-btn ${showWaitlist ? 'visible' : ''}`}
                    >
                        <span>Get Started</span>
                    </a>

                    <button
                        className="nav-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        {isMenuOpen ? (
                            <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        ) : (
                            <svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
                        )}
                    </button>

                </div>
            </div>
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <a href="/pricing" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Pricing</a>
                <a href={URLS.DOCS} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Docs</a>
                <a href={URLS.DISCORD} className="mobile-nav-link" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Discord</a>
                <a href={URLS.APP} className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Get Started</a>
            </div>
        </>
    );
}
