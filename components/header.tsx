
'use client';
import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';
import { useTheme } from 'next-themes';


import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Header() {
  const { theme, setTheme } = useTheme();


  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">HayateTechLab</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              トップ
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              記事
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              お問い合わせ
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-all text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 transition-all text-blue-600" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header >
  );
};

