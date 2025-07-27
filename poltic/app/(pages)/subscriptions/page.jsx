'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { subscriptionPlans, billingCycles } from '@/app/config/subscriptions';

function SubscriptionsPage() {
  const [selectedCycle, setSelectedCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId);
    // Add subscription logic here
    console.log(`Subscribing to ${planId} plan with ${selectedCycle} billing`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Crown className="w-4 h-4" />
              Premium Features
            </motion.div>
            
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Unlock Premium{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                News Experience
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get exclusive access to premium content, advanced features, and priority support
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Subscription Plans */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-8 md:py-12">
        {/* Billing Cycle Toggle */}
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-lg border border-gray-200">
            <div className="flex items-center gap-1 md:gap-2">
              {billingCycles.map((cycle) => (
                <button
                  key={cycle.id}
                  onClick={() => setSelectedCycle(cycle.id)}
                  className={`
                    relative px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-sm md:text-base
                    ${selectedCycle === cycle.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  <span>{cycle.label}</span>
                  {cycle.discount && (
                    <span className="ml-1 md:ml-2 text-xs bg-green-100 text-green-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                      {cycle.discount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`
                relative bg-white rounded-2xl md:rounded-3xl shadow-lg border-2 overflow-hidden
                ${plan.popular ? 'border-purple-500 ring-2 md:ring-4 ring-purple-100' : 'border-gray-200'}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${plan.color} p-6 md:p-8 text-white`}>
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-xl md:text-2xl font-bold">{plan.name}</h3>
                  {plan.id === 'basic' ? (
                    <Shield className="w-6 h-6 md:w-8 md:h-8" />
                  ) : (
                    <Crown className="w-6 h-6 md:w-8 md:h-8" />
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold">
                    ₹{(plan.price[selectedCycle]*10).toFixed(2)}
                  </span>
                  <span className="text-base md:text-lg opacity-80">
                    {billingCycles.find(c => c.id === selectedCycle)?.suffix}
                  </span>
                </div>
                {selectedCycle === 'yearly' && (
                  <div className="mt-2 text-sm opacity-90">
                    ${(plan.price.yearly / 12).toFixed(2)} per month
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="p-6 md:p-8">
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600" />
                      </div>
                      <span className="text-sm md:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Subscribe Button */}
                <motion.button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`
                    w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300
                    ${plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={selectedPlan === plan.id}
                >
                  <div className="flex items-center justify-center gap-2">
                    {selectedPlan === plan.id ? (
                      <>
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Why Go Premium?</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Join thousands of users who trust Poltic for their daily news consumption. 
              Get access to exclusive content, advanced features, and priority support.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                Cancel anytime
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                30-day money back guarantee
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                24/7 customer support
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SubscriptionsPage;