import './App.css';
import DecryptedText from './components/DecryptedText';
import { Waitlist } from '@clerk/clerk-react';

function App() {
  return (
    <div className="landing-page">
      <header className="hero">
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
            for your applications, ensuring your sensitive credentials stay safe.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Join the Waitlist</a>
          </div>
        </div>
      </header>

      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure by Default</h3>
              <p className="feature-description">
                Your API keys are encrypted and stored securely. We never expose your credentials 
                to unauthorized parties.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Built for performance. Our proxy infrastructure ensures minimal latency 
                and maximum reliability for your applications.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics & Monitoring</h3>
              <p className="feature-description">
                Track usage, monitor performance, and get insights into how your APIs 
                are being consumed.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Easy Integration</h3>
              <p className="feature-description">
                Simple REST API that works with any application. Get started in minutes 
                with our comprehensive documentation.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Rate Limiting</h3>
              <p className="feature-description">
                Protect your APIs from abuse with configurable rate limits and 
                automatic throttling.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Global CDN</h3>
              <p className="feature-description">
                Deployed across multiple regions for optimal performance and 
                reliability worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of developers who trust ProxLock to secure their API keys.
          </p>
          <div className="waitlist-container">
            <Waitlist />
          </div>
        </div>
      </section>

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

export default App;

