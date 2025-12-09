
import React from 'react';
import PricingTable, { Plan } from './../../../../components/modern-pricing-table';

// Sample pricing data
const samplePlans: Plan[] = [
  {
    title: "Starter",
    price: {
      monthly: 9,
      yearly: 96
    },
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 5 projects",
      "5GB storage",
      "Basic support",
      "Standard analytics",
      "API access"
    ],
    ctaText: "Get Started",
    ctaHref: "#",
    isFeatured: false
  },
  {
    title: "Professional",
    price: {
      monthly: 29,
      yearly: 312
    },
    description: "Ideal for growing teams and businesses",
    features: [
      "Up to 25 projects",
      "50GB storage",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Team collaboration",
      "Custom integrations",
    ],
    ctaText: "Start Free Trial",
    ctaHref: "#",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: {
      monthly: 99,
      yearly: 1068
    },
    description: "For large organizations with complex needs",
    features: [
      "Unlimited projects",
      "500GB storage",
      "24/7 dedicated support",
      "Advanced analytics",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "Advanced security",
      "SSO authentication",
    ],
    ctaText: "Contact Sales",
    ctaHref: "#",
    isFeatured: false
  }
]

const Pricings = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 p-4">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Pricing Table Component */}
        <PricingTable plans={samplePlans} />
      </div>
    </div>
  )
};
export default Pricings;