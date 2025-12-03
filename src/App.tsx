import './App.css';
import DecryptedText from './components/DecryptedText';
import { Waitlist } from '@clerk/clerk-react';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className="landing-page">
      <header className="hero">
        <img src={logo} alt="ProxLock Logo" className="app-logo" />
        <div className="container">
          <h1 className="hero-title">ProxLock</h1>
          <p className="hero-subtitle">
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
            <a href="#contact" className="btn btn-primary">Join the Waitlist</a>
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



      <section id="contact" className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join the waitlist for our limited Apple platform beta. <span className="cta-description-break">Don't worry, we plan to support other platforms soon.</span>
          </p>
          <div className="waitlist-container">
            <Waitlist />
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

export default App;

