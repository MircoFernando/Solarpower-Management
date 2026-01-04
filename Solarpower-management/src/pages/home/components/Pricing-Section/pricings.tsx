import React from 'react';
import PricingTable, { Plan } from './../../../../components/modern-pricing-table';

// Sample pricing data tailored for Solar Industry
const samplePlans: Plan[] = [
  {
    title: "Residential Monitoring",
    price: {
      monthly: 0, // Free tier often common for basic monitoring
      yearly: 0
    },
    description: "Essential tracking for homeowners with single-inverter systems.",
    features: [
      "Real-time Production Monitoring",
      "Historical Data (7 Days)",
      "Basic System Health Alerts",
      "Mobile App Access",
      "Single User Account"
    ],
    ctaText: "Start Free",
    ctaHref: "#",
    isFeatured: false
  },
  {
    title: "Commercial PPA",
    price: {
      monthly: 0.50, // The requested 0.5 per unit
      yearly: 5.50   // Example yearly discount rate
    },
    description: "Pay only for what you generate. Full maintenance included.",
    features: [
      "Charged per kWh Generated ($0.50)",
      "Zero Upfront Hardware Cost",
      "Includes Maintenance & Repairs",
      "Performance Guarantee",
      "Advanced Analytics Dashboard",
      "Weather Impact Analysis",
      "Priority 24/7 Support"
    ],
    ctaText: "Calculate Savings",
    ctaHref: "#",
    isFeatured: true // Highlight this as the main business model
  },
  {
    title: "Industrial Grid",
    price: {
      monthly: 299,
      yearly: 3200
    },
    description: "For utility-scale solar farms requiring massive data throughput.",
    features: [
      "Unlimited MW Capacity",
      "Sub-second Data Granularity",
      "API Access & Webhooks",
      "Custom SCADA Integration",
      "Dedicated Account Manager",
      "White-label Reports",
      "Drone Thermal Inspections"
    ],
    ctaText: "Contact Sales",
    ctaHref: "#",
    isFeatured: false
  }
]

const Pricings = () => {
  return (
    <div className="w-full">
      {/* Note: If your PricingTable component supports a 'currency' or 'suffix' prop, 
         you should pass it here to clarify the Commercial price is "/kWh" not "/mo".
         Since I cannot see the inner code, I have clarified it in the Features list.
      */}
      <PricingTable plans={samplePlans} />
      
      {/* Fine print for clarity */}
      <p className="text-center text-gray-400 text-sm mt-8">
        *Commercial PPA rates subject to site assessment and local solar irradiance levels.
      </p>
    </div>
  )
};
export default Pricings;