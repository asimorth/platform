"use client";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const team = [
  {
    name: "Mehmet Furkan Şengöz",
    role: "Kurucu & CEO",
    image: "/profile-furkan.jpg",
    bio: "Yapay zeka ve full-stack geliştirme konularında uzman. Asimorth platformunun mimarı ve vizyoneri.",
    linkedin: "https://www.linkedin.com/in/sngzfurkan/",
    skills: ["AI/ML", "Full Stack", "Product Strategy"]
  },
  {
    name: "Claude AI",
    role: "AI Assistant & Developer",
    image: "/profile-gpt.jpg", 
    bio: "Asimorth projesinin geliştirilmesinde aktif rol alan, modern web teknolojileri ve AI entegrasyonu konularında uzman yapay zeka asistanı.",
    linkedin: "https://claude.ai/",
    skills: ["AI Development", "Code Architecture", "Problem Solving"]
  },
];

const features = [
  {
    icon: "🚀",
    title: "Yenilikçi Teknologi",
    description: "En son AI ve web teknolojilerini kullanarak gelecekçi çözümler üretiyoruz."
  },
  {
    icon: "🎯",
    title: "Kullanıcı Odaklı",
    description: "Her özellik kullanıcı deneyimini iyileştirmek ve ihtiyaçları karşılamak için tasarlanır."
  },
  {
    icon: "⚡",
    title: "Hızlı Geliştirme",
    description: "Agile metodoloji ile hızlı iterasyonlar yaparak sürekli gelişim sağlıyoruz."
  },
  {
    icon: "🔒",
    title: "Güvenlik",
    description: "En yüksek güvenlik standartlarıyla kullanıcı verilerini koruyoruz."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl">ℹ️</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hakkımızda
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Asimorth, yapay zeka destekli karakter oluşturma ve yönetim platformudur. 
            Yaratıcılığınızı serbest bırakarak, benzersiz AI karakterler oluşturmanızı ve bunlarla etkileşim kurmanızı sağlar.
          </p>
        </div>

        {/* Team Section - moved before Mission */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center space-x-2">
              <span>👥</span>
              <span>Ekibimiz</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 justify-items-center">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">
                    {member.name}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-3 text-center">
                    {member.role}
                  </p>
                  <p className="text-center text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm font-medium"
                  >
                    <span>🔗</span>
                    <span>Profil</span>
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Section - moved after Team */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center space-x-2">
              <span>🎯</span>
              <span>Misyonumuz</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Yapay zeka teknolojisini herkesin erişebileceği, kullanabileceği ve yaratıcılıklarını ifade edebileceği 
                bir platform haline getirmek. Karakter oluşturma sürecini basitleştirerek, kullanıcıların hayal güçlerini 
                gerçeğe dönüştürmelerine yardımcı olmak.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Her kullanıcının kendine özgü AI deneyimi yaşamasını sağlayarak, teknoloji ile insan yaratıcılığını buluşturuyoruz.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <Card key={idx} className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="text-center p-6">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 mt-16">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              İletişime Geçin
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@asimorth.com"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <span>📧</span>
                <span>E-posta Gönder</span>
              </a>
              <a
                href="https://www.linkedin.com/company/asimorth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <span>🔗</span>
                <span>LinkedIn</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 