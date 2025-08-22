// =============================================================================
// 自作モジュール
// =============================================================================
import HelloSection from '@/components/feature/top/HelloSection';
import AboutMeSection from '@/components/feature/top/AboutMeSection';
import MySkillSection from '@/components/feature/top/MySkillSection';
import NavigationSection from '@/components/feature/top/NavigationSection';

export default function Home() {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <div className="space-y-16">
      <HelloSection />
      <AboutMeSection />
      <MySkillSection />
      <NavigationSection />
    </div>
  );
}