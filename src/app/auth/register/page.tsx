"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Mail, ArrowLeft, ArrowRight, User, Target, Sparkles, FileText, Shield, Users, Briefcase, GraduationCap, Heart, Zap, MessageSquare } from 'lucide-react';

interface KvkkConsentData {
  kvkk_consent: boolean;
  marketing_consent: boolean;
  data_processing_consent: boolean;
  marketing_channels: {
    email: boolean;
    sms: boolean;
    phone: boolean;
    push: boolean;
  };
}

interface UsagePurpose {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    full_name: '',
  });
  
  const [kvkkConsent, setKvkkConsent] = useState<KvkkConsentData>({
    kvkk_consent: false,
    marketing_consent: false,
    data_processing_consent: false,
    marketing_channels: {
      email: false,
      sms: false,
      phone: false,
      push: false
    }
  });

  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  
  const [currentStep, setCurrentStep] = useState<'form' | 'purpose' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const usagePurposes: UsagePurpose[] = [
    {
      id: 'content-creation',
      title: 'İçerik Üretimi',
      description: 'Blog yazıları, sosyal medya içerikleri ve kreatif metinler oluşturmak',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      features: ['Blog yazıları', 'Sosyal medya içerikleri', 'Kreatif yazım', 'SEO optimizasyonu']
    },
    {
      id: 'education',
      title: 'Eğitim & Öğrenme',
      description: 'Kişisel gelişim, dil öğrenimi ve akademik çalışmalar',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-500',
      features: ['Dil pratiği', 'Konu anlatımı', 'Soru-cevap', 'Akademik destek']
    },
    {
      id: 'business',
      title: 'İş & Profesyonel',
      description: 'Müşteri hizmetleri, iş süreçleri ve profesyonel iletişim',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      features: ['Müşteri desteği', 'E-posta yazımı', 'Sunum hazırlama', 'İş analizi']
    },
    {
      id: 'entertainment',
      title: 'Eğlence & Sosyal',
      description: 'Oyun arkadaşı, hikaye anlatımı ve keyifli sohbetler',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      features: ['Interaktif oyunlar', 'Hikaye yazımı', 'Sohbet partneri', 'Yaratıcı aktiviteler']
    },
    {
      id: 'analysis',
      title: 'Analiz & Araştırma',
      description: 'Veri analizi, araştırma ve trend takibi',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      features: ['Gündem analizi', 'Trend raporları', 'Veri yorumlama', 'Pazar araştırması']
    },
    {
      id: 'communication',
      title: 'İletişim & Danışmanlık',
      description: 'Kişisel asistan, tavsiye ve rehberlik hizmetleri',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      features: ['Kişisel asistan', 'Karar desteği', 'Planlama yardımı', 'Motivasyon']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.username || !formData.password) {
      setError('Lütfen zorunlu alanları doldurun');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    if (formData.username.length < 3) {
      setError('Kullanıcı adı en az 3 karakter olmalıdır');
      return;
    }

    if (!kvkkConsent.kvkk_consent) {
      setError('KVKK açık rızası zorunludur');
      return;
    }

    // Move to purpose selection step
    setError('');
    setCurrentStep('purpose');
  };

  const handlePurposeSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Production'da doğrudan success'e yönlendir (mock)
      const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
      
      if (isProduction) {
        console.log('📝 Mock registration in production');
        setCurrentStep('success');
        return;
      }

      // Development'da gerçek API kullan
      const registrationData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        full_name: formData.full_name || undefined,
        kvkk_consent: kvkkConsent,
        usage_purposes: selectedPurposes
      };

      console.log('📝 Registration data:', registrationData);
      
      const apiUrl = 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Registration successful:', data);
        setCurrentStep('success');
      } else {
        setError(data.detail || 'Kayıt olurken bir hata oluştu');
      }
    } catch (error: any) {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
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

  const togglePurpose = (purposeId: string) => {
    setSelectedPurposes(prev => 
      prev.includes(purposeId) 
        ? prev.filter(id => id !== purposeId)
        : [...prev, purposeId]
    );
  };

  const handleKvkkConsentChange = (type: keyof KvkkConsentData, value: boolean) => {
    setKvkkConsent(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-purple-600' : 'text-green-600'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'form' ? 'bg-purple-600 text-white' : 'bg-green-600 text-white'
          }`}>
            {currentStep === 'form' ? '1' : <CheckCircle className="w-5 h-5" />}
          </div>
          <span className="text-sm font-medium">Hesap Bilgileri</span>
        </div>
        
        <div className={`w-16 h-0.5 ${currentStep === 'purpose' || currentStep === 'success' ? 'bg-purple-600' : 'bg-gray-300'}`} />
        
        <div className={`flex items-center space-x-2 ${
          currentStep === 'purpose' ? 'text-purple-600' : 
          currentStep === 'success' ? 'text-green-600' : 'text-gray-400'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'purpose' ? 'bg-purple-600 text-white' : 
            currentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {currentStep === 'success' ? <CheckCircle className="w-5 h-5" /> : '2'}
          </div>
          <span className="text-sm font-medium">Kullanım Amacı</span>
        </div>
        
        <div className={`w-16 h-0.5 ${currentStep === 'success' ? 'bg-purple-600' : 'bg-gray-300'}`} />
        
        <div className={`flex items-center space-x-2 ${currentStep === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {currentStep === 'success' ? <CheckCircle className="w-5 h-5" /> : '3'}
          </div>
          <span className="text-sm font-medium">Tamamlandı</span>
        </div>
      </div>
    </div>
  );

  if (currentStep === 'success') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-green-900 dark:to-purple-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full">
          {renderStepIndicator()}
          
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
                🎉 Kayıt Başarılı!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 text-center">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                  E-posta doğrulama linki gönderildi!
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  <strong>{formData.email}</strong> adresine gönderilen e-postadaki linke tıklayarak hesabınızı aktifleştirin.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  📧 E-posta gelmediyse spam klasörünüzü kontrol edin. 
                  Link 24 saat geçerlidir.
                </p>
              </div>
              
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/auth/login">
                    Giriş Sayfasına Git
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Ana Sayfaya Dön
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl">✨</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Asimorth'a Katılın
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            AI karakterinizi oluşturun ve geleceğin teknolojisiyle tanışın
          </p>
        </div>

        {renderStepIndicator()}

        {currentStep === 'form' && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
                  <User className="w-6 h-6" />
                  <span>Hesap Bilgileri</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        E-posta <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                        Kullanıcı Adı <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="kullaniciadi"
                        value={formData.username}
                        onChange={handleChange}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-gray-700 dark:text-gray-300">
                      Ad Soyad
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Ad Soyad (isteğe bağlı)"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                        Şifre <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="h-12"
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        En az 6 karakter olmalıdır
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                        Şifre Tekrarı <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Compact KVKK Section */}
                  <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="flex items-center space-x-2 text-lg font-semibold text-purple-800 dark:text-purple-200">
                      <Shield className="w-5 h-5" />
                      <span>Veri Koruma ve İzinler</span>
                    </h3>
                    
                    <div className="space-y-3">
                      {/* KVKK Zorunlu */}
                      <div className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-red-200 dark:border-red-800">
                        <Checkbox
                          id="kvkk_consent"
                          checked={kvkkConsent.kvkk_consent}
                          onCheckedChange={(checked) => handleKvkkConsentChange('kvkk_consent', checked as boolean)}
                          className="mt-1"
                        />
                        <label htmlFor="kvkk_consent" className="text-sm leading-relaxed cursor-pointer">
                          <span className="font-semibold text-red-600 dark:text-red-400">*</span> 
                          <strong> KVKK Açık Rızası:</strong> Kişisel verilerimin işlenmesine onay veriyorum.
                          <span className="text-red-600 dark:text-red-400 font-medium"> (Zorunlu)</span>
                        </label>
                      </div>

                      {/* Pazarlama İsteğe Bağlı */}
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Checkbox
                          id="marketing_consent"
                          checked={kvkkConsent.marketing_consent}
                          onCheckedChange={(checked) => handleKvkkConsentChange('marketing_consent', checked as boolean)}
                          className="mt-1"
                        />
                        <label htmlFor="marketing_consent" className="text-sm leading-relaxed cursor-pointer">
                          <strong>Pazarlama İzni:</strong> Yeni özellikler ve fırsatlar hakkında bilgi almak istiyorum.
                          <span className="text-blue-600 dark:text-blue-400 font-medium"> (İsteğe Bağlı)</span>
                        </label>
                      </div>

                      {/* Veri İşleme İsteğe Bağlı */}
                      <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <Checkbox
                          id="data_processing_consent"
                          checked={kvkkConsent.data_processing_consent}
                          onCheckedChange={(checked) => handleKvkkConsentChange('data_processing_consent', checked as boolean)}
                          className="mt-1"
                        />
                        <label htmlFor="data_processing_consent" className="text-sm leading-relaxed cursor-pointer">
                          <strong>Veri Analizi:</strong> Hizmet kalitesinin artırılması için verilerimin analiz edilmesine izin veriyorum.
                          <span className="text-green-600 dark:text-green-400 font-medium"> (İsteğe Bağlı)</span>
                        </label>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 dark:text-gray-400 p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                      <strong>💡 Not:</strong> Detaylı KVKK metni ve haklarınız için destek@asimorth.com adresine başvurabilirsiniz.
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Devam Et
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Zaten hesabınız var mı?{' '}
                    <Link 
                      href="/auth/login" 
                      className="font-medium text-purple-600 hover:text-purple-500"
                    >
                      Giriş yapın
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'purpose' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Asimorth'u Nasıl Kullanacaksınız?
                  </CardTitle>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Size en uygun deneyimi sunabilmek için AI karakterinizi hangi amaçlarla kullanacağınızı seçin. 
                  Birden fazla seçenek işaretleyebilirsiniz.
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {usagePurposes.map((purpose) => (
                    <div
                      key={purpose.id}
                      onClick={() => togglePurpose(purpose.id)}
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedPurposes.includes(purpose.id)
                          ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'hover:shadow-lg'
                      }`}
                    >
                      <Card className="h-full border-2 hover:border-purple-300 dark:hover:border-purple-700">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Icon and Title */}
                            <div className="flex items-start space-x-3">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${purpose.color} flex items-center justify-center text-white flex-shrink-0`}>
                                {purpose.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                                  {purpose.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                  {purpose.description}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  selectedPurposes.includes(purpose.id)
                                    ? 'bg-purple-600 border-purple-600'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                  {selectedPurposes.includes(purpose.id) && (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Features */}
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Özellikler:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {purpose.features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm text-center mb-6">
                    {error}
                  </div>
                )}

                {/* Info Box */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                  <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    <strong>İpucu:</strong> Seçimlerinizi istediğiniz zaman hesap ayarlarınızdan değiştirebilirsiniz. 
                    Bu seçimler size özel öneriler sunmamıza yardımcı olacak.
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('form')}
                    className="flex-1 h-12"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Geri
                  </Button>
                  
                  <Button
                    onClick={handlePurposeSubmit}
                    disabled={loading}
                    className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Hesap oluşturuluyor...</span>
                      </div>
                    ) : (
                      <>
                        Hesabı Oluştur
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            ← Ana sayfaya dön
          </Link>
        </div>
      </div>
    </main>
  );
} 