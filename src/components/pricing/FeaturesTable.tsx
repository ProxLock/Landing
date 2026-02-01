
import { URLS } from '../../constants';
import type { ClerkPlan } from './types';
import { FALLBACK_PLANS } from './constants';

interface FeaturesTableProps {
    plusPlan?: ClerkPlan;
    proPlan?: ClerkPlan;
    freePlan?: ClerkPlan;
}

export default function FeaturesTable({ plusPlan, proPlan, freePlan }: FeaturesTableProps) {

    // We only use the table if there are features to compare
    if (!plusPlan?.features?.length && !proPlan?.features?.length) {
        return null;
    }

    const plusFreeTrialDays = plusPlan?.freeTrialDays ?? FALLBACK_PLANS.plus.freeTrialDays;
    const proFreeTrialDays = proPlan?.freeTrialDays ?? FALLBACK_PLANS.pro.freeTrialDays;

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

    return (
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
                        {rows.map((row) => (
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
                        ))}
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
    );
}
