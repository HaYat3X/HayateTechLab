import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code2, Brain, Rocket, Database } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import author from '../public/img/Hayate.jpg';

export default function Home() {


  // =============================================================================
  // セットアップ
  // =============================================================================
  /**
   * エンジニアとしてのスキルセットをカテゴリごとにまとめたデータ構造。
   *
   * - 各カテゴリ（例：フロントエンド、バックエンド、開発ツール）は
   *   表示用アイコンと、複数のスキルアイテムを持つ。
   * - UI表示やスキル紹介ページでの活用を想定。
   *
   * @type {{
   *   category: string;
   *   icon: string;
   *   items: {
   *     name: string;
   *     icon: string;
   *   }[];
   * }[]}
   */
  const skills = [
    {
      category: "フロントエンド",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      items: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { name: "Nuxt.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-plain.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
      ]
    },
    {
      category: "バックエンド",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      items: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { name: "Ruby on Rails", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
        { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original-wordmark.svg" }
      ]
    },
    {
      category: "開発ツール",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
        { name: "Visual Studio Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Visual Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" }
      ]
    }
  ];



  return (
    <div className="space-y-16">
      <section
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] animate-fade-in" />
        <div className="text-center relative">
          <h1 className="text-6xl font-bold gradient-text animate-slide-in animate-delay-200">
            HayateTechLab<span className="text-gray-900 dark:text-white">で技術を探求する</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto my-8 leading-relaxed animate-slide-in animate-delay-200">
            HayateTechLab は、個人エンジニアによる技術検証と知見の記録を目的とした開発ラボです。<br />
            主にフロントエンド、バックエンド、AI、ビジネスなどの分野を中心に、実践ベースの情報を発信しています。
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-in animate-delay-300"
          >
            記事を読む <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-12 animate-slide-in animate-delay-200">
          私について
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg opacity-0 animate-slide-in animate-delay-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-4/12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl transform rotate-6" />
                <img
                  src={author.src}
                  alt="著者の写真"
                  className="relative w-full aspect-square object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="md:w-8/12">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Hayate Takeda
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  鳥取県出身のエンジニア。<br />
                  専門学校でIT技術を学んだ後、20歳でIT業界へ。<br />
                  現在はデスクトップアプリやWebアプリの開発を中心に、フロントエンド・バックエンドの開発を担当しています。<br />
                </p>
                <div className="flex flex-wrap gap-3">
                  {['フロントエンド開発', 'バックエンド開発', 'UI/UXデザイン'].map((skill, index) => (
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

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-12">
          私のスキル
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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform -skew-y-6" />
        <div className="relative py-16 px-8 text-center opacity-0 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-6">最新の記事をチェックしよう</h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            プログラミング、ビジネスに関する実践的な記事が揃っています。<br />
            一緒に技術を探求しましょう！
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-float"
          >
            記事を読む <ArrowRight size={20} className="ml-2" />
          </Link>

        </div>
      </section>

    </div>
  );
}