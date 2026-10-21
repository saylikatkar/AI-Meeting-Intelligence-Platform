import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import AboutUsPage from './pages/AboutUsPage'
import PricingPage from './pages/PricingPage'

/**
 * Root App — only responsible for routing.
 * All page logic lives in src/pages/.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<HomePage />} />
      <Route path="/features"      element={<FeaturesPage />} />
      <Route path="/how-it-works"  element={<HowItWorksPage />} />
      <Route path="/about"         element={<AboutUsPage />} />
      <Route path="/pricing"       element={<PricingPage />} />

      {/* Catch-all → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
