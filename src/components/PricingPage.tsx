import Navigation from './Navigation';
import { usePlans } from '@clerk/clerk-react/experimental';
import { ClerkProvider } from '@clerk/clerk-react';
import PricingHeader from './pricing/PricingHeader';
import PricingGrid from './pricing/PricingGrid';
import FeaturesTable from './pricing/FeaturesTable';
import EnterpriseCard from './pricing/EnterpriseCard';
import PricingFooter from './pricing/PricingFooter';
import { FREE_PLAN_ID, PLUS_PLAN_ID, PRO_PLAN_ID } from './pricing/constants';
import type { ClerkPlan } from './pricing/types';

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

    return (
        <div className="pricing-page">
            <Navigation isScrolled={true} showWaitlist={true} />

            <div className="container pricing-container">
                <PricingHeader />

                <PricingGrid
                    isLoading={isLoading}
                    freePlan={freePlan}
                    plusPlan={plusPlan}
                    proPlan={proPlan}
                />

                <FeaturesTable
                    freePlan={freePlan}
                    plusPlan={plusPlan}
                    proPlan={proPlan}
                />

                <EnterpriseCard />
            </div>

            <PricingFooter />
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
