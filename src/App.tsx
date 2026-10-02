/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DecisionWizard } from './components/DecisionWizard';
import { MethodExplorer } from './components/MethodExplorer';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { PlanGenerator } from './components/PlanGenerator';
import { Footer } from './components/Footer';
import { IntegrationType } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedMethod, setSelectedMethod] = useState<IntegrationType>('code_merge');

  const scrollTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectMethodAndNavigate = (methodId: IntegrationType) => {
    setSelectedMethod(methodId);
    scrollTo('methods');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollTo}
        onOpenPlanner={() => scrollTo('planner')}
      />

      <main className="flex-1">
        <HeroSection
          onSelectMethod={handleSelectMethodAndNavigate}
          onStartWizard={() => scrollTo('wizard')}
        />

        <DecisionWizard
          onSelectMethod={handleSelectMethodAndNavigate}
        />

        <MethodExplorer
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
        />

        <InteractiveSandbox />

        <ComparisonMatrix
          onSelectMethod={handleSelectMethodAndNavigate}
        />

        <PlanGenerator
          initialMethod={selectedMethod}
        />
      </main>

      <Footer />
    </div>
  );
}
