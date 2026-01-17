import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { URLS } from '../constants';
import { usePlans } from '@clerk/clerk-react/experimental';

// Plan IDs from Clerk
const PLUS_PLAN_ID = '10k_requests';
const PRO_PLAN_ID = '25k_requests';

// Fallback values if plans fail to load
const FALLBACK_PLANS = {
    plus: {
        name: 'Plus',
        price: '9.99',
        description: 'Get up to 10,000 proxy requests each month and 1 user access key.',
        freeTrialDays: 30,
    },
    pro: {
        name: 'Pro',
        price: '19.99',
        description: 'Get up to 25,000 proxy requests each month and unlimited user access keys.',
        freeTrialDays: 7,
    },
};

function Pricing() {
    const { data: plans, isLoading } = usePlans({ for: 'user' });

    // Find Plus and Pro plans from Clerk data
    const plusPlan = plans?.find(plan => plan.id === PLUS_PLAN_ID);
    const proPlan = plans?.find(plan => plan.id === PRO_PLAN_ID);

    // Use Clerk data or fallback values
    const plusPrice = plusPlan?.fee?.amountFormatted ?? FALLBACK_PLANS.plus.price;
    const plusDescription = plusPlan?.description ?? FALLBACK_PLANS.plus.description;
    const plusFreeTrialDays = plusPlan?.freeTrialDays ?? FALLBACK_PLANS.plus.freeTrialDays;

    const proPrice = proPlan?.fee?.amountFormatted ?? FALLBACK_PLANS.pro.price;
    const proDescription = proPlan?.description ?? FALLBACK_PLANS.pro.description;
    const proFreeTrialDays = proPlan?.freeTrialDays ?? FALLBACK_PLANS.pro.freeTrialDays;

    return (
        <div className="pricing-page">
            <Navigation isScrolled={true} showWaitlist={true} />

            <div className="container pricing-container">
                <h1 className="section-title pricing-title">Simple Pricing</h1>
                <p className="pricing-subtitle">Choose the plan that fits your needs.</p>

                <div className="beta-notice-wrapper">
                    <div className="beta-notice">
                        <span className="beta-notice-top">
                            <span className="beta-badge">Special Pricing</span>
                            <span>for <strong>CruzHacks</strong>.</span>
                        </span>
                        <span className="beta-notice-bottom">Get a {plusFreeTrialDays}-day free trial for new Plus subscribers</span>
                    </div>
                </div>

                <div className="pricing-grid">
                    {/* Free Plan */}
                    <div className="pricing-card">
                        <h3 className="plan-name">Free</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>0
                        </div>
                        <p className="plan-billing">Always free</p>
                        <p className="plan-description">Get up to 3,000 proxy requests each month.</p>
                        <a href={URLS.APP} className="btn btn-secondary plan-btn">Get Started</a>
                    </div>

                    {/* Plus Plan */}
                    <div className={`pricing-card featured ${isLoading ? 'loading' : ''}`}>
                        <h3 className="plan-name">{plusPlan?.name ?? FALLBACK_PLANS.plus.name}</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>{plusPrice}
                            <span className="period">/month</span>
                        </div>
                        <p className="plan-billing">Only billed monthly</p>
                        <p className="plan-description">{plusDescription}</p>
                        <a href={URLS.APP} className="btn btn-primary plan-btn">Start {plusFreeTrialDays} Day Special Free Trial</a>
                    </div>

                    {/* Pro Plan */}
                    <div className={`pricing-card ${isLoading ? 'loading' : ''}`}>
                        <h3 className="plan-name">{proPlan?.name ?? FALLBACK_PLANS.pro.name}</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>{proPrice}
                            <span className="period">/month</span>
                        </div>
                        <p className="plan-billing">Only billed monthly</p>
                        <p className="plan-description">{proDescription}</p>
                        <a href={URLS.APP} className="btn btn-secondary plan-btn">Start {proFreeTrialDays} Day Free Trial</a>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="pricing-card full-width">
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
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Pricing;
