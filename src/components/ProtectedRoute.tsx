"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && isClient) {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo, isClient]);

  // Server-side rendering sırasında hiçbir şey render etme
  if (!isClient) {
    return null;
  }

  // Auth loading durumunda loading göster
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Giriş kontrol ediliyor...
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Lütfen bekleyiniz
          </p>
        </div>
      </div>
    );
  }

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendirilecek
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Giriş Gerekli
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Bu sayfaya erişebilmek için önce giriş yapmanız gerekiyor. 
            Hesabınız yoksa ücretsiz kayıt olabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/auth/login')}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => router.push('/auth/register')}
              className="flex-1 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Kullanıcı giriş yapmışsa içeriği göster
  return <>{children}</>;
} 