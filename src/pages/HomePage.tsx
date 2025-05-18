import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      category: "フロントエンド",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      items: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" }
      ]
    },
    {
      category: "バックエンド",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      items: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
      ]
    },
    {
      category: "開発ツール",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
      ]
    }
  ];

  return (
    <div className="space-y-16">
      {/* ヒーローセクション */}
      <section 
        className="relative py-20 overflow-hidden"
        ref={el => sectionsRef.current[0] = el}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] animate-fade-in" />
        <div className="text-center relative">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-slide-in">
            NotePress<span className="text-gray-900 dark:text-white">で知識を広げよう</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-in animate-delay-200">
            プログラミングとテクノロジーの最新情報を発信するブログへようこそ。
            実用的な知識と洞察を共有しています。
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-in animate-delay-300"
          >
            記事を読む <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* 技術スキルセクション */}
      <section 
        className="py-12"
        ref={el => sectionsRef.current[1] = el}
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-12">
          技術スキル
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl opacity-0 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl">
                  <img src={category.icon} alt={category.category} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {category.items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 transition-all duration-300"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 mb-3 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 著者紹介セクション */}
      <section 
        className="py-12"
        ref={el => sectionsRef.current[2] = el}
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-12">
          著者紹介
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg opacity-0 animate-scale-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-4/12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl transform rotate-6" />
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="著者の写真"
                  className="relative w-full aspect-square object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="md:w-8/12">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full">
                  <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    フロントエンド開発者
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  山田 太郎
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  フロントエンド開発者として10年以上の経験を持ち、特にReactとTypeScriptを専門としています。
                  大手テック企業でのキャリアを経て、現在はフリーランスとして活動しながら、
                  このブログを通じて知識を共有しています。
                </p>
                <div className="flex flex-wrap gap-3">
                  {['フロントエンド開発', 'UI/UXデザイン', '技術ブログ執筆', 'チームリード経験'].map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section 
        className="relative overflow-hidden"
        ref={el => sectionsRef.current[3] = el}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform -skew-y-6" />
        <div className="relative py-16 px-8 text-center opacity-0 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-6">最新の記事をチェックしよう</h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            プログラミング、デザイン、キャリアに関する実践的な記事が揃っています。
            あなたのスキルアップをサポートします。
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-float"
          >
            記事一覧を見る <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;