import React from 'react';
// landing page layout
import LandingLayout from '@/components/layouts/LandingLayout';
// landing page section
import AboutSection from '@/components/landing/AboutSection';
import ComponentSection from '@/components/landing/ComponentSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection';
import PricingSection from '@/components/landing/PricingSection';
import DemoSection from '@/components/landing/DemoSection';
import { Preloader } from '@/components/reactdash-ui';

export default function Landing() {
  return (
  <Preloader>
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <DemoSection />
      <ComponentSection />
      <PricingSection />
    </LandingLayout>
  </Preloader>
  );
}