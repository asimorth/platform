"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CharacterPage() {
  const [character, setCharacter] = useState({
    name: "",
    description: "",
    tone: "",
    humor_level: 0.5,
    formal_level: 0.5,
    persona_notes: "",
    avatar_url: "",
    voice_id: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState<{voice_id: string, name: string}[]>([]);
  
  // Avatar oluşturma state'leri
  const [avatarForm, setAvatarForm] = useState({
    seed: "",
    category: "person",
    style: "adventurer",
    backgroundColor: "b6e3f4",
    mood: "happy",
    personality: "friendly"
  });
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/voices")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && data.voices) {
          setVoices(data.voices.map((v: any) => ({ voice_id: v.voice_id, name: v.name })));
        }
      })
      .catch(error => {
        console.error("Voices yüklenirken hata:", error);
        setStatus("⚠️ Sesler yüklenirken hata oluştu.");
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setStatus("");
    const res = await fetch("http://127.0.0.1:8000/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(character),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      if (data.auto_created && data.auto_created > 0) {
        setStatus(`✅ Karakter başarıyla eklendi. ${data.auto_created} ek karakter otomatik olarak oluşturuldu!`);
      } else {
        setStatus("✅ Karakter başarıyla eklendi.");
      }
      setCharacter({
        name: "",
        description: "",
        tone: "",
        humor_level: 0.5,
        formal_level: 0.5,
        persona_notes: "",
        avatar_url: "",
        voice_id: ""
      });
    } else {
      setStatus("⚠️ Hata oluştu.");
    }
  };

  const handlePreview = () => {
    const audioEl = document.getElementById("previewPlayer") as HTMLAudioElement;
    audioEl.src = "http://127.0.0.1:8000/character/preview-voice";
    audioEl.load();
    try {
      audioEl.play();
    } catch (err) {
      console.log("Oynatma engellendi", err);
    }
  };

  const generateAvatar = async () => {
    setAvatarLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/avatar/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avatarForm),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedAvatarUrl(data.avatar_url);
        setCharacter({ ...character, avatar_url: data.avatar_url });
        setStatus("✅ Avatar başarıyla oluşturuldu!");
      } else {
        setStatus("⚠️ Avatar oluşturulurken hata oluştu.");
      }
    } catch (error) {
      setStatus("⚠️ Avatar oluşturulurken hata oluştu.");
    } finally {
      setAvatarLoading(false);
    }
  };

  if (!character) return <div className="p-4 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl">🎭</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Karakter Oluştur
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hayalindeki AI karakterini oluştur ve kişiselleştir. Benzersiz kişilik, ses ve avatar seçenekleriyle karakterini hayata geçir.
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Karakter Bilgileri
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Temel Bilgiler */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  🏷️ Karakter Adı
                </label>
                <input
                  value={character.name}
                  onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                  placeholder="Karakterinizin adını girin..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  🎭 Konuşma Tonu
                </label>
                <input
                  value={character.tone}
                  onChange={(e) => setCharacter({ ...character, tone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                  placeholder="Örn: Samimi, Resmi, Eğlenceli..."
                />
              </div>
            </div>

            {/* Açıklama */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                📝 Karakter Açıklaması
              </label>
              <textarea
                value={character.description}
                onChange={(e) => setCharacter({ ...character, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300 resize-none"
                placeholder="Karakterinizin kişiliğini, özelliklerini ve davranışlarını detaylı bir şekilde açıklayın..."
              />
            </div>

            {/* Slider'lar */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  😄 Mizah Seviyesi
                </label>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                  <Slider
                    defaultValue={[character.humor_level]}
                    max={1}
                    step={0.1}
                    onValueChange={(val) => setCharacter({ ...character, humor_level: val[0] })}
                    className="accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>Ciddi</span>
                    <span>Eğlenceli</span>
                  </div>
                  <div className="text-center mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                    {Math.round(character.humor_level * 100)}%
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  🎩 Resmiyet Seviyesi
                </label>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                  <Slider
                    defaultValue={[character.formal_level]}
                    max={1}
                    step={0.1}
                    onValueChange={(val) => setCharacter({ ...character, formal_level: val[0] })}
                    className="accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>Samimi</span>
                    <span>Resmi</span>
                  </div>
                  <div className="text-center mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {Math.round(character.formal_level * 100)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Diğer Notlar */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                📋 Ek Notlar
              </label>
              <textarea
                value={character.persona_notes}
                onChange={(e) => setCharacter({ ...character, persona_notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300 resize-none"
                placeholder="Karakterinizle ilgili ek notlar, özel tercihler veya davranış kalıpları..."
              />
            </div>

            {/* Avatar Oluşturma */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Avatar Oluştur</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Avatar Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seed" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🌱 Avatar Adı/Anahtar Kelime
                    </Label>
                    <Input
                      id="seed"
                      value={avatarForm.seed}
                      onChange={(e) => setAvatarForm({ ...avatarForm, seed: e.target.value })}
                      placeholder="Örn: Ahmet, Sarah, Robot, Kedi..."
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      📂 Kategori
                    </Label>
                    <Select value={avatarForm.category} onValueChange={(value: string) => setAvatarForm({ ...avatarForm, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="person">👤 İnsan</SelectItem>
                        <SelectItem value="bottts">🤖 Robot</SelectItem>
                        <SelectItem value="avataaars">🎭 Avatar</SelectItem>
                        <SelectItem value="identicon">🔢 Geometrik</SelectItem>
                        <SelectItem value="initials">💬 Baş Harfler</SelectItem>
                        <SelectItem value="jdenticon">🎨 Modern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="style" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🎨 Stil
                    </Label>
                    <Select value={avatarForm.style} onValueChange={(value: string) => setAvatarForm({ ...avatarForm, style: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Stil seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventurer">🏃 Maceracı</SelectItem>
                        <SelectItem value="adventurer-neutral">😐 Nötr</SelectItem>
                        <SelectItem value="avataaars">😊 Gülümseyen</SelectItem>
                        <SelectItem value="big-ears">👂 Büyük Kulaklar</SelectItem>
                        <SelectItem value="big-smile">😄 Büyük Gülümseme</SelectItem>
                        <SelectItem value="croodles">🤔 Düşünceli</SelectItem>
                        <SelectItem value="fun-emoji">😎 Havalı</SelectItem>
                        <SelectItem value="micah">🎭 Mikah</SelectItem>
                        <SelectItem value="miniavs">👶 Mini</SelectItem>
                        <SelectItem value="pixel-art">🎮 Pixel Art</SelectItem>
                        <SelectItem value="personas">👤 Kişilik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🎨 Arka Plan Rengi
                    </Label>
                    <Select value={avatarForm.backgroundColor} onValueChange={(value: string) => setAvatarForm({ ...avatarForm, backgroundColor: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Renk seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="b6e3f4">🔵 Açık Mavi</SelectItem>
                        <SelectItem value="c0aede">🟣 Lavanta</SelectItem>
                        <SelectItem value="ffdfbf">🟠 Şeftali</SelectItem>
                        <SelectItem value="ffd5dc">🩷 Pembe</SelectItem>
                        <SelectItem value="d1d4f9">💙 Mavi</SelectItem>
                        <SelectItem value="ffd93d">🟡 Sarı</SelectItem>
                        <SelectItem value="6fffe9">🟢 Turkuaz</SelectItem>
                        <SelectItem value="ffffff">⚪ Beyaz</SelectItem>
                        <SelectItem value="000000">⚫ Siyah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generateAvatar}
                    disabled={avatarLoading || !avatarForm.seed}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    {avatarLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Avatar Oluşturuluyor...</span>
                      </div>
                    ) : (
                      "🎨 Avatar Oluştur"
                    )}
                  </Button>
                </div>

                {/* Avatar Önizleme */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    👀 Avatar Önizleme
                  </Label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                    {generatedAvatarUrl ? (
                      <div className="text-center space-y-4">
                        <img 
                          src={generatedAvatarUrl} 
                          alt="Oluşturulan Avatar" 
                          className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 dark:border-purple-800 shadow-lg" 
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Avatar başarıyla oluşturuldu!
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-4xl text-gray-400 dark:text-gray-500">🎨</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Avatar oluşturmak için yukarıdaki formu doldurun
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Ses Seçimi */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                🎵 Ses ID
              </label>
              <div className="relative">
                <input
                  value={character.voice_id}
                  onChange={e => setCharacter({ ...character, voice_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                  placeholder="ElevenLabs Voice ID girin..."
                  title="Lütfen kullanmak istediğiniz sesin ElevenLabs Voice ID'sini yapıştırın."
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="group relative">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                      title="Lütfen kullanmak istediğiniz sesin ElevenLabs Voice ID'sini yapıştırın."
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <p className="mb-2">🎵 ElevenLabs Voice ID</p>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Lütfen kullanmak istediğiniz sesin ElevenLabs Voice ID'sini yapıştırın. 
                        Bu ID, ElevenLabs platformundan alınan benzersiz ses tanımlayıcısıdır.
                      </p>
                      <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                💡 ElevenLabs platformundan aldığınız Voice ID'yi buraya yapıştırın
              </p>
            </div>

            {/* Ses Önizleme */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🎧 Ses Önizleme</h3>
                <Button
                  onClick={handlePreview}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  ▶️ Sesi Dinle
                </Button>
              </div>
              <audio id="previewPlayer" controls className="w-full" />
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Kaydediliyor...</span>
                  </div>
                ) : (
                  "💾 Karakteri Kaydet"
                )}
              </Button>
              
              <Button
                variant="outline"
                className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                🔄 Sıfırla
              </Button>
            </div>

            {/* Status */}
            {status && (
              <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
                status.includes("✅") 
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800" 
                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
              }`}>
                {status}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
