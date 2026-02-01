import Navigation from './Navigation';
import { URLS } from '../constants';
import { usePlans } from '@clerk/clerk-react/experimental';
import { ClerkProvider } from '@clerk/clerk-react';

// Type for Clerk plans
interface ClerkPlan {
    id: string;
    slug: string;
    name: string;
    description?: string;
    fee?: { amountFormatted: string };
    freeTrialDays?: number;
    features?: Array<{ slug: string; name: string }>;
}

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

const PUBLISHABLE_KEY = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

function PricingContent() {
    const { data: plans, isLoading } = usePlans({ for: 'user' }) as { data: ClerkPlan[] | undefined; isLoading: boolean };

    // Find Plus and Pro plans from Clerk data (check both id and slug)
    const freePlan = plans?.find((plan: ClerkPlan) => plan.id === FREE_PLAN_ID || plan.slug === FREE_PLAN_ID);
    const plusPlan = plans?.find((plan: ClerkPlan) => plan.id === PLUS_PLAN_ID || plan.slug === PLUS_PLAN_ID);
    const proPlan = plans?.find((plan: ClerkPlan) => plan.id === PRO_PLAN_ID || plan.slug === PRO_PLAN_ID);

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
                            <span className="beta-badge">Beta Pricing</span>
                        </span>
                        <span className="beta-notice-bottom">Subscribe now to lock in these rates forever. Prices may increase after beta.</span>
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
                        <a href={`${URLS.APP}/pricing`} className="btn btn-primary plan-btn">Start {plusFreeTrialDays} Day Free Trial</a>
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

            <footer className="footer">
                <div className="container">
                    <div className="footer-social">
                        <a href={URLS.DISCORD} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Discord">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </a>
                        <a href={URLS.GITHUB} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
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

export default function PricingPage() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <PricingContent />
        </ClerkProvider>
    );
}
