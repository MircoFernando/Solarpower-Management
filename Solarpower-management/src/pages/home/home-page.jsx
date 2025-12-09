import React from 'react'
import HeroSection from "./components/Hero-section/Hero"
import SolarEnergyProduction from "./components/SolarEnergyProduction"
import Intro from './components/Introduction/intro-section'
import BrandsPage from './components/Brands-section/brand-section';
import Services from './components/Services-section/services-section';
import Stats from './components/Stats-section/stats-section';
import Steps from './components/Steps-section/steps-section';
import DashboardSection from './components/Dashboard-section/dashboard-section';
import CalltoActionSection from './components/Call to Action/calltoaction-section';
import PricingSection from './components/Pricing-Section/pricing-section';
import Testimonials from './components/Testamonial-section/testamonials-section';
import FooterSection from './components/Footer-Section/footer';

function App() {
 
  return (
    
      <main>
        <HeroSection />
        {/* <SolarEnergyProduction /> */}
        <Intro />
        <BrandsPage />
        <Services />
        <Stats />
        <Steps />
        <DashboardSection />
        <CalltoActionSection />
        <PricingSection />
        <Testimonials />
        <FooterSection />
        {/* Call to Action */}
        {/* Testamonial from 21stdev */}
        {/* footer */}
      </main>
    
  )
}

export default App
