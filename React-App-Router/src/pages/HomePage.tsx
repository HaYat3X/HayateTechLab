// =============================================================================
// インポート（ライブラリ）
// =============================================================================
import React from 'react';

// =============================================================================
// インポート（自作ライブラリ）
// =============================================================================
import HelloSection from '../components/feature/Home/HelloSection';
import AuthorSection from '../components/feature/Home/AuthorSection';
import SkillSection from '../components/feature/Home/SkillSection';
import CTASection from '../components/feature/Home/CTASection';

const HomePage: React.FC = () => {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <div className="space-y-16">
      <HelloSection />
      <AuthorSection />
      <SkillSection />
      <CTASection />
    </div>
  );
};

export default HomePage;