import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const features = [
    {
      icon: "🎭",
      title: "AI Karakter Yaratma",
      description: "Benzersiz kişilik, ses ve avatar ile hayalindeki AI karakterini oluştur. Mizah seviyesi, resmiyet derecesi ve daha fazlasını ayarla.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "🧠",
      title: "Akıllı Eğitim",
      description: "OpenAI ile karakterini eğit, sürekli öğrenen ve gelişen bir AI karakteri yarat. Özelliklerini dilediğin gibi değiştir.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "📰",
      title: "Gündem Analizi",
      description: "Karakterinle gündem araştır, özetleri sesli veya görüntülü okut. Kişiselleştirilmiş içerik üretimi yap.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "🎵",
      title: "Çoklu Ses Seçenekleri",
      description: "50+ farklı ses seçeneği ile karakterine mükemmel ses bul. Türkçe ve İngilizce dil desteği.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: "🖼️",
      title: "Özel Avatar Sistemi",
      description: "Kendi avatarını yükle veya AI destekli avatar oluştur. Karakterine görsel kimlik kazandır.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "📊",
      title: "Detaylı Analitik",
      description: "Karakterinin performansını takip et, kullanım istatistiklerini gör ve sürekli iyileştir.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "İçerik Üreticisi",
      avatar: "AY",
      content: "Asimorth ile podcast'lerim için mükemmel AI sunucular yarattım. Dinleyicilerim karakterlerin gerçek olduğunu düşünüyor!",
      rating: 5
    },
    {
      name: "Zeynep Kaya",
      role: "Eğitimci",
      avatar: "ZK",
      content: "Öğrencilerim için eğlenceli AI karakterler oluşturdum. Dersler artık çok daha etkileşimli ve ilgi çekici.",
      rating: 5
    },
    {
      name: "Mehmet Demir",
      role: "Pazarlama Uzmanı",
      avatar: "MD",
      content: "Müşteri hizmetleri için AI karakterlerimiz sayesinde 7/24 destek sağlıyoruz. Müşteri memnuniyeti %40 arttı.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Oluşturulan Karakter" },
    { number: "50+", label: "Farklı Ses Seçeneği" },
    { number: "99.9%", label: "Uptime Garantisi" },
    { number: "24/7", label: "Teknik Destek" }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                AI Destekli Karakter Yaratma Platformu
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Asimorth
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Kendi AI karakterini yarat, kişiselleştir ve eğit! 
              <span className="block text-lg text-gray-600 dark:text-gray-400 mt-2">
                Benzersiz kişilik, ses ve avatar ile hayalindeki karakteri hayata geçir. 
                İçerik üretiminden eğitime, müşteri hizmetlerinden eğlenceye kadar her alanda kullan.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <a href="/character">🚀 Ücretsiz Başla</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                <a href="#demo">🎬 Demo İzle</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Neden Asimorth?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI karakter yaratma konusunda en gelişmiş platform. 
              İçerik üreticileri, eğitimciler, işletmeler ve bireysel kullanıcılar için tasarlandı.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gray-50 dark:bg-gray-800">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              3 basit adımda kendi AI karakterinizi oluşturun
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Karakter Oluştur</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Karakterinizin adını, kişiliğini, sesini ve avatarını belirleyin. 
                Mizah ve resmiyet seviyelerini ayarlayın.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AI ile Eğit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                OpenAI teknolojisi ile karakterinizi eğitin. 
                Özelliklerini ve davranışlarını sürekli geliştirin.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Kullan ve Paylaş</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Karakterinizi gündem analizi, içerik üretimi veya 
                eğitim amaçlı kullanın. Sonuçları paylaşın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kullanım Alanları
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Asimorth'u farklı sektörlerde nasıl kullanabilirsiniz?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🎙️</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Podcast & Yayın</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  AI sunucular ile podcast'lerinizi zenginleştirin
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">📚</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Eğitim</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Etkileşimli AI öğretmenler ile dersleri canlandırın
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">💼</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">İş Dünyası</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Müşteri hizmetleri ve eğitim için AI asistanlar
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🎮</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Eğlence</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Oyun ve eğlence içerikleri için AI karakterler
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Asimorth'u kullanan profesyonellerin deneyimleri
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Başlamak İçin Ücretsiz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              14 gün ücretsiz deneme ile tüm özellikleri keşfedin. Kredi kartı gerekmez.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Ücretsiz</CardTitle>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">0₺</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <li>✓ 3 AI Karakter</li>
                  <li>✓ Temel Ses Seçenekleri</li>
                  <li>✓ Günlük 1 Gündem Özeti</li>
                </ul>
                <Button asChild className="w-full bg-gray-600 hover:bg-gray-700">
                  <a href="/character">Ücretsiz Başla</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-purple-500 bg-white dark:bg-gray-800 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">En Popüler</span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">29₺<span className="text-lg text-gray-500">/ay</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <li>✓ Sınırsız Karakter</li>
                  <li>✓ Premium Ses Seçenekleri</li>
                  <li>✓ Günlük 10 Gündem Özeti</li>
                  <li>✓ Özel Avatar Yükleme</li>
                </ul>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <a href="/pricing">Pro'ya Geç</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">99₺<span className="text-lg text-gray-500">/ay</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <li>✓ Tüm Pro Özellikleri</li>
                  <li>✓ API Erişimi</li>
                  <li>✓ 7/24 Destek</li>
                  <li>✓ Özel Entegrasyonlar</li>
                </ul>
                <Button asChild className="w-full bg-gray-600 hover:bg-gray-700">
                  <a href="/pricing">İletişime Geç</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            AI Karakterinizi Oluşturmaya Hazır mısınız?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Binlerce kullanıcı gibi siz de Asimorth'un gücünü keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <a href="/character">🚀 Hemen Başla</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
              <a href="/pricing">💰 Fiyatları Gör</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
