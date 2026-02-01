
import { URLS } from '../../constants';
import { FALLBACK_PLANS } from './constants';
import type { ClerkPlan } from './types';

interface PricingGridProps {
    isLoading: boolean;
    freePlan?: ClerkPlan;
    plusPlan?: ClerkPlan;
    proPlan?: ClerkPlan;
}

export default function PricingGrid({ isLoading, freePlan, plusPlan, proPlan }: PricingGridProps) {
    const freeDescription = freePlan?.description ?? FALLBACK_PLANS.free.description;

    const plusPrice = plusPlan?.fee?.amountFormatted ?? FALLBACK_PLANS.plus.price;
    const plusDescription = plusPlan?.description ?? FALLBACK_PLANS.plus.description;
    const plusFreeTrialDays = plusPlan?.freeTrialDays ?? FALLBACK_PLANS.plus.freeTrialDays;

    const proPrice = proPlan?.fee?.amountFormatted ?? FALLBACK_PLANS.pro.price;
    const proDescription = proPlan?.description ?? FALLBACK_PLANS.pro.description;
    const proFreeTrialDays = proPlan?.freeTrialDays ?? FALLBACK_PLANS.pro.freeTrialDays;

    return (
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
    );
}
