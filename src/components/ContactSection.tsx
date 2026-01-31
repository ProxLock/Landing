import { URLS } from '../constants';

function ContactSection() {
    return (
        <section id="contact" className="cta" style={{ background: 'transparent', padding: '2rem 0 6rem' }}>
            <div className="container">
                <div className="callout-card">
                    <div className="callout-content">
                        <h2 className="cta-title" style={{
                            fontSize: '2rem',
                            marginBottom: '0.5rem',
                            background: 'var(--text-section-title)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>Still have questions?</h2>
                        <p className="cta-description" style={{ margin: 0, fontSize: '1.1rem' }}>
                            We're here to help. Reach out to us via email or join our community.
                        </p>
                    </div>
                    <div className="hero-actions callout-actions">
                        <a href={URLS.EMAIL_CONTACT} className="btn btn-secondary">Email Us</a>
                        <a href={URLS.DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Join Discord</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
