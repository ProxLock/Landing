export interface ClerkPlan {
    id: string;
    slug: string;
    name: string;
    description?: string;
    fee?: { amountFormatted: string };
    freeTrialDays?: number;
    features?: Array<{ slug: string; name: string }>;
}
