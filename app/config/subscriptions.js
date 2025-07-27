export const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: {
      monthly: 9.99,
      yearly: 99.99
    },
    features: [
      'Access to all breaking news',
      'Real-time updates',
      'Basic community features',
      'Mobile app access',
      'Email notifications'
    ],
    color: 'from-blue-600 to-indigo-600',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: {
      monthly: 19.99,
      yearly: 199.99
    },
    features: [
      'Everything in Basic Plan',
      'Priority news alerts',
      'Advanced analytics',
      'Ad-free experience',
      'Premium content access',
      'Custom news feeds',
      'Export to multiple formats',
      'Priority customer support'
    ],
    color: 'from-purple-600 to-pink-600',
    popular: true
  }
];

export const billingCycles = [
  { id: 'monthly', label: 'Monthly', suffix: '/month' },
  { id: 'yearly', label: 'Yearly', suffix: '/year', discount: 'Save 17%' }
];