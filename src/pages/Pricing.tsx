import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { URLS } from '../constants';
import { usePlans } from '@clerk/clerk-react/experimental';

// Plan IDs from Clerk
const PLUS_PLAN_ID = '10k_requests';
const PRO_PLAN_ID = '25k_requests';
const FREE_PLAN_ID = 'free_user';

// Fallback values if plans fail to load
const FALLBACK_PLANS = {
    free: {
        name: 'Free',
        price: '0',
        description: 'Great for trying out the platform.',
        freeTrialDays: 0,
    },
    plus: {
        name: 'Plus',
        price: '9.99',
        description: 'Good for scaling applications as you serve a medium size audience.',
        freeTrialDays: 30,
    },
    pro: {
        name: 'Pro',
        price: '19.99',
        description: 'Get the best bang for your buck and serve a large amount of users each month.',
        freeTrialDays: 7,
    },
};

function Pricing() {
    const { data: plans, isLoading } = usePlans({ for: 'user' });

    // Find Plus and Pro plans from Clerk data (check both id and slug)
    const freePlan = plans?.find(plan => plan.id === FREE_PLAN_ID || plan.slug === FREE_PLAN_ID);
    const plusPlan = plans?.find(plan => plan.id === PLUS_PLAN_ID || plan.slug === PLUS_PLAN_ID);
    const proPlan = plans?.find(plan => plan.id === PRO_PLAN_ID || plan.slug === PRO_PLAN_ID);

    // Use Clerk data or fallback values
    const freeDescription = freePlan?.description ?? FALLBACK_PLANS.free.description;

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
                        <p className="plan-description">{freeDescription}</p>
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
                        <a href={`${URLS.APP}/pricing`} className="btn btn-primary plan-btn">Start {plusFreeTrialDays} Day Special Free Trial</a>
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
                        <a href={`${URLS.APP}/pricing`} className="btn btn-secondary plan-btn">Start {proFreeTrialDays} Day Free Trial</a>
                    </div>


                </div>

                {/* Features Comparison Table */}
                {(plusPlan?.features?.length || proPlan?.features?.length) && (
                    <div className="features-table-section">
                        <h2 className="features-table-title">Compare Features</h2>
                        <div className="features-table-wrapper">
                            <table className="features-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Free</th>
                                        <th className="featured-column">Plus</th>
                                        <th>Pro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Collect all unique features from all plans */}
                                    {(() => {
                                        // Helper to parse feature slug into base key and display value
                                        const parseFeature = (slug: string) => {
                                            let base = slug;
                                            let value = null;

                                            // Check for "unlimited"
                                            if (/unlimited/i.test(slug)) {
                                                value = 'Unlimited';
                                                base = slug.replace(/unlimited/i, '');
                                            } else {
                                                // Match numbers (including those with underscores/commas)
                                                // We use a non-capturing group for the boundary check
                                                const numMatch = slug.match(/(?:^|[_\W])(\d+(?:[_,]\d+)*)(?:$|[_\W])/);
                                                if (numMatch) {
                                                    value = numMatch[1].replace(/_/g, ',');
                                                    // Remove just the number part from the slug
                                                    base = slug.replace(numMatch[1], '');
                                                }
                                            }

                                            // Clean up base slug (remove duplicate/trailing underscores)
                                            base = base.replace(/__+/g, '_').replace(/^_+|_+$/g, '');

                                            return { base, value };
                                        };

                                        // 1. Collect all unique features keyed by baseSlug
                                        const featureMap = new Map<string, { label: string }>();

                                        [freePlan, plusPlan, proPlan].forEach(plan => {
                                            plan?.features?.forEach(f => {
                                                const { base } = parseFeature(f.slug);

                                                // Clean up label: remove numbers to make it generic
                                                // e.g. "3,000 Monthly Requests" -> "Monthly Requests"
                                                // e.g. "1 User Access Key" -> "User Access Key"
                                                let label = f.name;
                                                // Remove any sequence of digits (with optional commas)
                                                label = label.replace(/\b[\d,]+\b/g, '').trim();
                                                // Remove extra spaces if any
                                                label = label.replace(/\s+/g, ' ');

                                                featureMap.set(base, { label });
                                            });
                                        });

                                        // 2. Build rows
                                        const rows = Array.from(featureMap.entries()).map(([baseSlug, { label }]) => {
                                            const getDisplayValue = (plan: typeof freePlan) => {
                                                // Find feature in this plan that matches the base slug
                                                const feature = plan?.features?.find(f => parseFeature(f.slug).base === baseSlug);
                                                if (!feature) return '—';

                                                const { value } = parseFeature(feature.slug);
                                                // If no value was extracted (no number/unlimited), treat as boolean
                                                return value ?? '✓';
                                            };

                                            return {
                                                id: baseSlug,
                                                label: label,
                                                freeValue: getDisplayValue(freePlan),
                                                plusValue: getDisplayValue(plusPlan),
                                                proValue: getDisplayValue(proPlan),
                                            };
                                        });

                                        return rows.map((row) => (
                                            <tr key={row.id}>
                                                <td className="feature-name">{row.label}</td>
                                                <td className="feature-check">
                                                    <span className={`${row.freeValue === '✓' ? 'check-icon' : row.freeValue === '—' ? 'check-icon no' : 'feature-value'}`}>
                                                        {row.freeValue}
                                                    </span>
                                                </td>
                                                <td className="feature-check featured-column">
                                                    <span className={`${row.plusValue === '✓' ? 'check-icon' : row.plusValue === '—' ? 'check-icon no' : 'feature-value'}`}>
                                                        {row.plusValue}
                                                    </span>
                                                </td>
                                                <td className="feature-check">
                                                    <span className={`${row.proValue === '✓' ? 'check-icon' : row.proValue === '—' ? 'check-icon no' : 'feature-value'}`}>
                                                        {row.proValue}
                                                    </span>
                                                </td>
                                            </tr>
                                        ));
                                    })()}
                                </tbody>
                                <tfoot>
                                    <tr className="table-actions-row">
                                        <td></td>
                                        <td className="table-action-cell">
                                            <a href={URLS.APP} className="btn btn-secondary table-btn">Get Started</a>
                                        </td>
                                        <td className="table-action-cell featured-column">
                                            <a href={`${URLS.APP}/pricing`} className="btn btn-primary table-btn">Start {plusFreeTrialDays} Day Trial</a>
                                        </td>
                                        <td className="table-action-cell">
                                            <a href={`${URLS.APP}/pricing`} className="btn btn-secondary table-btn">Start {proFreeTrialDays} Day Trial</a>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                )}
                {/* Enterprise Plan */}
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
            </div>

            <Footer />
        </div>
    );
}

export default Pricing;
