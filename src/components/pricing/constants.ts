// Plan IDs from Clerk
export const PLUS_PLAN_ID = '10k_requests';
export const PRO_PLAN_ID = '25k_requests';
export const FREE_PLAN_ID = 'free_user';

// Fallback values if plans fail to load
export const FALLBACK_PLANS = {
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
