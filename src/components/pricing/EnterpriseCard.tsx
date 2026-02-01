
import { URLS } from '../../constants';

export default function EnterpriseCard() {
    return (
        <div className="pricing-card full-width" style={{ marginTop: '3rem' }}>
            <div className="plan-header-group">
                <h3 className="plan-name">Enterprise</h3>
                <div className="plan-price">
                    Custom
                </div>
            </div>
            <p className="plan-billing">Contact us for details</p>
            <p className="plan-description">Need higher limits? Get in touch for a custom plan.</p>
            <a href={URLS.EMAIL_CONTACT} className="btn btn-secondary plan-btn">Contact Us</a>
        </div>
    );
}
