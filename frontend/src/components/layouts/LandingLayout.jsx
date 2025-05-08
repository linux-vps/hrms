import React from 'react';
import NavbarLanding from '@/components/navbar/NavbarLanding';
import FooterLanding from '@/components/footer/FooterLanding';

export default function LandingLayout(props) {
  return (
    <>
      <header>
        <NavbarLanding />
      </header>
      <main>
        {props.children}
      </main>
      <FooterLanding />
    </>
  );
}