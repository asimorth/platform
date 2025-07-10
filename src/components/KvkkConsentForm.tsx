"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, FileText, Shield, Mail, MessageSquare, Phone, Bell } from 'lucide-react';

interface KvkkConsentFormProps {
  onConsentChange: (consent: KvkkConsentData) => void;
  initialConsent?: KvkkConsentData;
}

export interface KvkkConsentData {
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

export function KvkkConsentForm({ onConsentChange, initialConsent }: KvkkConsentFormProps) {
  const [consent, setConsent] = useState<KvkkConsentData>({
    kvkk_consent: false,
    marketing_consent: false,
    data_processing_consent: false,
    marketing_channels: {
      email: false,
      sms: false,
      phone: false,
      push: false
    },
    ...initialConsent
  });

  const [kvkkTextOpen, setKvkkTextOpen] = useState(false);
  const [marketingTextOpen, setMarketingTextOpen] = useState(false);
  const [dataProcessingTextOpen, setDataProcessingTextOpen] = useState(false);

  useEffect(() => {
    onConsentChange(consent);
  }, [consent, onConsentChange]);

  const handleMainConsentChange = (type: keyof KvkkConsentData, value: boolean) => {
    setConsent(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleChannelChange = (channel: keyof KvkkConsentData['marketing_channels'], value: boolean) => {
    setConsent(prev => ({
      ...prev,
      marketing_channels: {
        ...prev.marketing_channels,
        [channel]: value
      }
    }));
  };

  const kvkkText = `
6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, kişisel verilerinizin işlenmesi hakkında aşağıdaki bilgileri paylaşıyoruz:

VERİ SORUMLUSU
Asimorth A.Ş. veri sorumlusu sıfatıyla hareket etmektedir.

İŞLENEN KİŞİSEL VERİLER
• Kimlik Verileri: Ad, soyad, e-posta adresi, kullanıcı adı
• İletişim Verileri: E-posta adresi, telefon numarası
• Dijital İz Verileri: IP adresi, çerez bilgileri, platform kullanım bilgileri
• Hizmet Kullanım Verileri: Oluşturulan karakterler, tercihler, etkileşim verileri

VERİ İŞLEME AMAÇLARI
• Hizmet sunumu ve sözleşme yükümlülüklerinin yerine getirilmesi
• Müşteri memnuniyetinin artırılması ve hizmet kalitesinin geliştirilmesi
• Yasal yükümlülüklerin yerine getirilmesi
• Pazarlama faaliyetlerinin yürütülmesi (izninizle)

HUKUKI DAYANAK
• Sözleşme: Hizmet sunumu için gerekli işlemler
• Meşru Menfaat: Hizmet kalitesinin artırılması
• Açık Rıza: Pazarlama faaliyetleri

HAKLARINIZ
• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenen kişisel verilerinizle ilgili bilgi talep etme
• Kişisel verilerinizin düzeltilmesi veya silinmesini talep etme
• İşlemenin durdurulmasını talep etme

Bu haklarınızı kullanmak için destek@asimorth.com adresine başvurabilirsiniz.
  `;

  const marketingText = `
PAZARLAMA FAALİYETLERİ İÇİN AÇIK RIZA METNİ

Asimorth A.Ş. olarak, sizinle iletişim kurabilmek ve aşağıdaki pazarlama faaliyetlerini gerçekleştirebilmek için açık rızanızı talep ediyoruz:

PAZARLAMA FAALİYETLERİ
• Yeni ürün ve hizmetler hakkında bilgilendirme
• Özel kampanya ve fırsat duyuruları
• Eğitim içerikleri ve webinar davetiyeleri
• Müşteri memnuniyet anketleri
• Sektörel gelişmeler ve trend raporları

İLETİŞİM KANALLARI
Bu pazarlama faaliyetleri için aşağıdaki kanalları kullanabiliriz:
• E-posta
• SMS
• Telefon araması
• Uygulama içi bildirimler

RİZANIZI GERİ ÇEKEBİLİRSİNİZ
Bu rızanızı istediğiniz zaman geri çekebilirsiniz. Bunun için:
• E-postalarımızdaki "abonelik iptali" linkini kullanabilir
• Hesap ayarlarınızdan pazarlama tercihlerinizi değiştirebilir
• destek@asimorth.com adresine başvurabilirsiniz
  `;

  const dataProcessingText = `
VERİ İŞLEME AYDINLATMA METNİ

Platform hizmetlerimizi sunabilmek için kişisel verilerinizi aşağıdaki şekillerde işlemekteyiz:

İŞLEME YÖNTEMLERİ
• Otomatik veri toplama (platform kullanımı)
• Manuel veri girişi (profil oluşturma)
• Analitik ve raporlama (kullanım istatistikleri)
• Güvenlik ve fraud önleme

VERİ SAKLAMA SÜRELERİ
• Hesap verileri: Hesap aktif olduğu sürece
• İşlem kayıtları: 10 yıl (yasal yükümlülük)
• Pazarlama verileri: Rıza süresi boyunca
• Log kayıtları: 2 yıl

GÜVENLİK ÖNLEMLERİ
• Şifreleme teknolojileri
• Erişim kontrolü ve yetkilendirme
• Düzenli güvenlik denetimleri
• Veri yedekleme ve felaket kurtarma
  `;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-800 dark:text-red-200">
            <Shield className="w-5 h-5" />
            <span>Kişisel Verilerin Korunması (KVKK)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* KVKK Temel Rıza */}
          <div className="space-y-3">
            <Collapsible open={kvkkTextOpen} onOpenChange={setKvkkTextOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="text-sm font-medium text-left">
                    📋 KVKK Aydınlatma Metni (Okumanız Önerilir)
                  </span>
                  {kvkkTextOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ScrollArea className="h-32 w-full border rounded-md p-3 text-xs bg-white dark:bg-gray-800">
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed">{kvkkText}</pre>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border-2">
              <Checkbox
                id="kvkk_consent"
                checked={consent.kvkk_consent}
                onCheckedChange={(checked) => handleMainConsentChange('kvkk_consent', checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="kvkk_consent" className="text-sm leading-relaxed cursor-pointer">
                <span className="font-semibold text-red-600 dark:text-red-400">*</span> 
                <strong> KVKK Açık Rızası:</strong> Kişisel verilerimin yukarıdaki amaçlar doğrultusunda işlenmesine açık rızam veriyorum. 
                <span className="text-red-600 dark:text-red-400 font-medium">(Zorunlu)</span>
              </label>
            </div>
          </div>

          {/* Pazarlama Rızası */}
          <div className="space-y-3">
            <Collapsible open={marketingTextOpen} onOpenChange={setMarketingTextOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="text-sm font-medium text-left">
                    📧 Pazarlama Faaliyetleri Metni
                  </span>
                  {marketingTextOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ScrollArea className="h-32 w-full border rounded-md p-3 text-xs bg-white dark:bg-gray-800">
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed">{marketingText}</pre>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border">
              <Checkbox
                id="marketing_consent"
                checked={consent.marketing_consent}
                onCheckedChange={(checked) => handleMainConsentChange('marketing_consent', checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="marketing_consent" className="text-sm leading-relaxed cursor-pointer">
                <strong>Pazarlama İzni:</strong> Pazarlama faaliyetleri kapsamında tarafıma bilgilendirme yapılmasına izin veriyorum. 
                <span className="text-blue-600 dark:text-blue-400 font-medium">(İsteğe Bağlı)</span>
              </label>
            </div>

            {/* Pazarlama Kanalları */}
            {consent.marketing_consent && (
              <div className="ml-6 space-y-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                  📞 Hangi kanallardan iletişim kurabilir?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email_channel"
                      checked={consent.marketing_channels.email}
                      onCheckedChange={(checked) => handleChannelChange('email', checked as boolean)}
                    />
                    <label htmlFor="email_channel" className="text-sm flex items-center space-x-1 cursor-pointer">
                      <Mail className="w-4 h-4" />
                      <span>E-posta</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sms_channel"
                      checked={consent.marketing_channels.sms}
                      onCheckedChange={(checked) => handleChannelChange('sms', checked as boolean)}
                    />
                    <label htmlFor="sms_channel" className="text-sm flex items-center space-x-1 cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      <span>SMS</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="phone_channel"
                      checked={consent.marketing_channels.phone}
                      onCheckedChange={(checked) => handleChannelChange('phone', checked as boolean)}
                    />
                    <label htmlFor="phone_channel" className="text-sm flex items-center space-x-1 cursor-pointer">
                      <Phone className="w-4 h-4" />
                      <span>Telefon</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="push_channel"
                      checked={consent.marketing_channels.push}
                      onCheckedChange={(checked) => handleChannelChange('push', checked as boolean)}
                    />
                    <label htmlFor="push_channel" className="text-sm flex items-center space-x-1 cursor-pointer">
                      <Bell className="w-4 h-4" />
                      <span>Bildirim</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Veri İşleme Rızası */}
          <div className="space-y-3">
            <Collapsible open={dataProcessingTextOpen} onOpenChange={setDataProcessingTextOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="text-sm font-medium text-left">
                    🔒 Veri İşleme Aydınlatma Metni
                  </span>
                  {dataProcessingTextOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ScrollArea className="h-32 w-full border rounded-md p-3 text-xs bg-white dark:bg-gray-800">
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed">{dataProcessingText}</pre>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border">
              <Checkbox
                id="data_processing_consent"
                checked={consent.data_processing_consent}
                onCheckedChange={(checked) => handleMainConsentChange('data_processing_consent', checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="data_processing_consent" className="text-sm leading-relaxed cursor-pointer">
                <strong>Veri İşleme İzni:</strong> Hizmet kalitesinin artırılması için verilerimin analiz edilmesine izin veriyorum. 
                <span className="text-green-600 dark:text-green-400 font-medium">(İsteğe Bağlı)</span>
              </label>
            </div>
          </div>

          {/* Önemli Uyarı */}
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              <strong>📞 Destek:</strong> KVKK haklarınızı kullanmak veya sorularınız için destek@asimorth.com adresine yazabilirsiniz. 
              Rızalarınızı istediğiniz zaman hesap ayarlarınızdan değiştirebilirsiniz.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 