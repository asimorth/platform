"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        logger.info('Login successful, redirecting...');
        router.push('/character');
      } else {
        setError('Email veya şifre hatalı');
      }
    } catch (error: any) {
      setError('Giriş yapılırken bir hata oluştu');
      logger.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Giriş Yap
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Asimorth hesabınıza giriş yapın
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Hoş Geldiniz</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  E-posta
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Şifre
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Giriş yapılıyor...</span>
                  </div>
                ) : (
                  'Giriş Yap'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hesabınız yok mu?{' '}
                <Link 
                  href="/auth/register" 
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Kayıt olun
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link 
                href="/" 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                ← Ana sayfaya dön
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 