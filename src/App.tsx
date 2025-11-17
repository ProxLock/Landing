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

      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="how-it-works-content">
            <div className="how-it-works-subsection">
              <h3 className="subsection-title">Key Storage & Splitting</h3>
              <p className="how-it-works-description">
                ProxLock uses an XORed partial key system to ensure your complete API key is never stored in one place. 
                We keep one partial key on our secure infrastructure, and you keep the other partial key. When a bearer token 
                needs to be constructed, both partial keys are combined using XOR encryption. This means no one, including ProxLock, 
                ever has access to your complete API key—providing an additional layer of security beyond traditional key storage.
              </p>
            </div>
            <div className="how-it-works-subsection">
              <h3 className="subsection-title">Dynamic Proxying</h3>
              <p className="how-it-works-description">
                When your app makes an API request, ProxLock intercepts it through our secure proxy infrastructure. 
                We validate the app instance using Apple's Device Check to ensure authenticity and prevent unauthorized access. 
                The bearer token is then dynamically constructed using the combined partial keys, and the request is forwarded 
                to the target service with proper authentication. This process ensures your credentials remain secure while 
                maintaining minimal latency and maximum reliability.
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

