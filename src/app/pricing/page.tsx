import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  const plans = [
    {
      name: "Ücretsiz",
      price: "0₺",
      period: "ay",
      description: "Bireysel kullanıcılar için ideal başlangıç planı",
      features: [
        "3 AI Karakter oluşturma",
        "Temel ses seçenekleri",
        "Gündem özeti (günlük 1 adet)",
        "Temel avatar seçenekleri",
        "E-posta desteği"
      ],
      popular: false,
      color: "from-gray-500 to-gray-600"
    },
    {
      name: "Pro",
      price: "29₺",
      period: "ay",
      description: "İçerik üreticileri ve küçük ekipler için",
      features: [
        "Sınırsız AI Karakter oluşturma",
        "Premium ses seçenekleri",
        "Gündem özeti (günlük 10 adet)",
        "Özel avatar yükleme",
        "Öncelikli e-posta desteği",
        "Karakter şablonları",
        "Gelişmiş analitik"
      ],
      popular: true,
      color: "from-purple-600 to-indigo-600"
    },
    {
      name: "Enterprise",
      price: "99₺",
      period: "ay",
      description: "Büyük ekipler ve kurumlar için",
      features: [
        "Tüm Pro özellikleri",
        "Sınırsız gündem özeti",
        "Özel AI model eğitimi",
        "API erişimi",
        "7/24 öncelikli destek",
        "Özel entegrasyonlar",
        "Dedicated hesap yöneticisi",
        "SSO entegrasyonu"
      ],
      popular: false,
      color: "from-orange-600 to-red-600"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Fiyatlandırma
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            İhtiyaçlarınıza uygun planı seçin ve AI karakterlerinizi oluşturmaya başlayın.
            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-2">
              Tüm planlar 14 gün ücretsiz deneme ile gelir.
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    En Popüler
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                  }`}
                >
                  {plan.name === "Ücretsiz" ? "Ücretsiz Başla" : "Planı Seç"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Fiyatlandırma hakkında merak ettikleriniz
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Ücretsiz deneme süresi var mı?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Evet, tüm planlarımızda 14 gün ücretsiz deneme süresi bulunmaktadır. Kredi kartı bilgisi gerektirmez.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Plan değişikliği yapabilir miyim?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklikler anında geçerli olur.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  İptal edebilir miyim?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal sonrası dönem sonuna kadar hizmet almaya devam edersiniz.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Hangi ödeme yöntemleri kabul ediliyor?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Kredi kartı, banka kartı ve PayPal ile ödeme yapabilirsiniz. Tüm ödemeler güvenli SSL şifreleme ile korunur.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Hemen Başlayın!
              </h2>
              <p className="text-purple-100 mb-6">
                14 gün ücretsiz deneme ile AI karakterlerinizi oluşturmaya başlayın. Kredi kartı gerekmez.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                  <a href="/character">Ücretsiz Başla</a>
                </Button>
                <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                  <a href="/manage">Karakterlerimi Gör</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 