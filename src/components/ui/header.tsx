"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Logo from "@/components/ui/logo";

export function Header() {
  const { user, logout, loading } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Profil menü dışına tıklandığında kapatma
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="w-full shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="group hover:scale-105 transition-transform duration-300">
          <Logo 
            size="lg" 
            className="group-hover:opacity-90 transition-opacity duration-300" 
            showText={true}
            textClassName="group-hover:underline"
          />
        </Link>
        
        {/* Navigation Menu */}
        <ul className="hidden md:flex gap-8 text-base font-medium">
          {user ? (
            // Authenticated user navigation
            <>
              <li>
                <Link href="/character" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                  🎭 Karakter Yarat
                </Link>
              </li>
              <li>
                <Link href="/manage" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                  ⚙️ Karakter Yönet
                </Link>
              </li>
              <li>
                <Link href="/gundem" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                  📰 Gündem Oluştur
                </Link>
              </li>
            </>
          ) : (
            // Non-authenticated user navigation
            <>
              <li>
                <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                  ℹ️ Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                  💰 Pricing
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {loading ? (
            // Loading state
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <ThemeToggle />
            </div>
          ) : user ? (
            // Authenticated user actions
            <div className="flex items-center space-x-3">
              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {(user.name || user.email)?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || user.email}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name || user.email}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                      <div className="flex space-x-2 mt-1">
                        {user.isVerified ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            ✅ Doğrulanmış
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            ⏳ Doğrulanmamış
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        href="/character"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        🎭 Karakter Yarat
                      </Link>
                      <Link
                        href="/manage"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        ⚙️ Karakter Yönet
                      </Link>
                      <Link
                        href="/gundem"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        📰 Gündem Oluştur
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        ℹ️ Hakkımızda
                      </Link>
                      <Link
                        href="/pricing"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        💰 Pricing
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        🚪 Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <ThemeToggle />
            </div>
          ) : (
            // Non-authenticated user actions
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <Link 
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                  Kayıt Ol
                </Link>
              </div>
              <ThemeToggle />
            </div>
          )}
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
} 