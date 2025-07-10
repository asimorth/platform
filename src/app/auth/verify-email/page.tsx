"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setMessage('Doğrulama token\'i bulunamadı');
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'E-posta adresiniz başarıyla doğrulandı!');
        
        // 3 saniye sonra giriş sayfasına yönlendir
        setTimeout(() => {
          router.push('/auth/login?verified=true');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.detail || 'Doğrulama işlemi başarısız oldu');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const resendVerification = async () => {
    // Bu işlevsellik daha sonra eklenebilir
    setMessage('Yeniden gönderme işlevi henüz aktif değil');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'error':
      case 'invalid':
        return <XCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
      case 'invalid':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'E-posta Doğrulanıyor...';
      case 'success':
        return '✅ E-posta Doğrulandı!';
      case 'error':
        return '❌ Doğrulama Başarısız';
      case 'invalid':
        return '⚠️ Geçersiz Link';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className={`shadow-2xl ${getStatusColor()}`}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4">
              {getStatusIcon()}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {getTitle()}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Alert className={`border-0 ${getStatusColor()}`}>
              <Mail className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {message}
              </AlertDescription>
            </Alert>

            {status === 'success' && (
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    🎉 Hoş geldiniz! Hesabınız artık aktif.
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300 mt-2">
                    3 saniye sonra giriş sayfasına yönlendirileceksiniz...
                  </p>
                </div>
                
                <Button asChild className="w-full">
                  <Link href="/auth/login">
                    Hemen Giriş Yap
                  </Link>
                </Button>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center space-y-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Link geçersiz olabilir veya süresi dolmuş olabilir.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={resendVerification}
                    className="w-full"
                    disabled
                  >
                    Yeniden Gönder
                  </Button>
                  
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/auth/register">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kayıt Sayfasına Dön
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {status === 'invalid' && (
              <div className="text-center">
                <Button asChild className="w-full">
                  <Link href="/auth/register">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kayıt Sayfasına Dön
                  </Link>
                </Button>
              </div>
            )}

            {status === 'loading' && (
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lütfen bekleyin, e-posta adresiniz doğrulanıyor...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm">
            Sorun mu yaşıyorsunuz?{' '}
            <a href="mailto:destek@asimorth.com" className="text-white font-medium hover:underline">
              Destek ekibimizle iletişime geçin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Sayfa Yükleniyor...
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
} 