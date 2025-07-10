"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

function GundemPageContent() {
  const { user } = useAuth();
  const [ozet, setOzet] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [character, setCharacter] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [showCharacterDrawer, setShowCharacterDrawer] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [ozetCreatedAt, setOzetCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    
    // Karakterleri yükle
    fetchCharacters();
    
    // Karakter bilgisini localStorage'dan al
    const charStr = localStorage.getItem("activeCharacter");
    if (charStr) {
      setCharacter(JSON.parse(charStr));
    }
  }, [user]);

  const fetchCharacters = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/characters", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCharacters(data);
        
        // Eğer seçili karakter yoksa, ilk karakteri seç (Asimorth)
        if (!character && data.length > 0) {
          setCharacter(data[0]);
          localStorage.setItem("activeCharacter", JSON.stringify(data[0]));
        }
      }
    } catch (error) {
      console.error("Karakterler yüklenirken hata:", error);
    }
  };

  const selectCharacter = (selectedChar: any) => {
    setCharacter(selectedChar);
    localStorage.setItem("activeCharacter", JSON.stringify(selectedChar));
    setShowCharacterDrawer(false);
  };

  const handleOzet = async () => {
    if (!character) {
      setError("Lütfen önce bir karakter seçin.");
      return;
    }
    
    setLoading(true);
    setError("");
    setAudioUrl(null);
    setVideoUrl(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/gundem/ozet", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ character, force_refresh: false }),
      });
      const data = await res.json();
      if (data.ozet) {
        setOzet(data.ozet);
        setIsCached(data.cached || false);
        setOzetCreatedAt(data.created_at || null);
        if (data.message) {
          setError(data.message);
        }
      } else {
        setError(data.error || "Özet alınamadı.");
      }
    } catch (e) {
      setError("Bağlantı hatası");
    }
    setLoading(false);
  };

  const handleRefreshOzet = async () => {
    if (!character) {
      setError("Lütfen önce bir karakter seçin.");
      return;
    }
    
    setLoading(true);
    setError("");
    setAudioUrl(null);
    setVideoUrl(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/gundem/ozet", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ character, force_refresh: true }),
      });
      const data = await res.json();
      if (data.ozet) {
        setOzet(data.ozet);
        setIsCached(false);
        setOzetCreatedAt(data.created_at || null);
        setError(""); // Hata mesajını temizle
      } else {
        setError(data.error || "Özet alınamadı.");
      }
    } catch (e) {
      setError("Bağlantı hatası");
    }
    setLoading(false);
  };

  const handleSesli = async () => {
    if (!character) {
      setError("Lütfen önce bir karakter seçin.");
      return;
    }
    
    if (!ozet) {
      setError("Önce gündem özeti oluşturun.");
      return;
    }
    
    setAudioLoading(true);
    setError("");
    setAudioUrl(null);
    try {
      console.log("Sesli okut isteği gönderiliyor...", { character, ozet: ozet.substring(0, 100) + "..." });
      
      const res = await fetch("http://127.0.0.1:8000/gundem/sesli", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ character, ozet }), // Mevcut özeti gönder
      });
      
      console.log("Sesli okut yanıtı:", res.status, res.statusText);
      console.log("Response headers:", Object.fromEntries(res.headers.entries()));
      
      if (res.ok) {
        const blob = await res.blob();
        console.log("Blob alındı:", blob.size, "bytes");
        console.log("Blob type:", blob.type);
        
        // Eğer blob boşsa veya çok küçükse hata ver
        if (blob.size < 1000) {
          // Blob'u text olarak oku
          const text = await blob.text();
          console.error("Küçük blob alındı, muhtemelen hata mesajı:", text);
          setError("Ses dosyası oluşturulamadı: " + text);
          return;
        }
        
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
        console.log("Audio URL oluşturuldu:", audioUrl);
        
        // Audio element'ini test et
        const audio = new Audio(audioUrl);
        audio.addEventListener('loadedmetadata', () => {
          console.log("Audio yüklendi, süre:", audio.duration);
        });
        audio.addEventListener('error', (e) => {
          console.error("Audio yükleme hatası:", e);
          setError("Ses dosyası yüklenemedi");
        });
      } else {
        const errorData = await res.json();
        console.error("Sesli okut hatası:", errorData);
        setError(errorData.error || "Sesli özet alınamadı.");
      }
    } catch (e) {
      console.error("Sesli okut exception:", e);
      setError("Bağlantı hatası: " + (e instanceof Error ? e.message : String(e)));
    }
    setAudioLoading(false);
  };

  const handleGoruntulu = async () => {
    if (!character) {
      setError("Lütfen önce bir karakter seçin.");
      return;
    }
    
    if (!ozet) {
      setError("Önce gündem özeti oluşturun.");
      return;
    }
    
    setVideoLoading(true);
    setError("");
    setVideoUrl(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/gundem/goruntulu", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ character, ozet }), // Mevcut özeti gönder
      });
      if (res.ok) {
        const blob = await res.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Görüntülü özet alınamadı.");
      }
    } catch (e) {
      setError("Bağlantı hatası");
    }
    setVideoLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl">📰</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Gündem Oluştur
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Merhaba <span className="font-semibold text-green-600 dark:text-green-400">{user?.username}</span>! 
            Karakterinle gündem araştır, özetleri sesli veya görüntülü okut. 
            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-2">
              AI destekli gündem analizi ile güncel olayları karakterinizin perspektifinden dinleyin.
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sol Panel - Kontroller */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span>🎛️</span>
                  <span>Kontroller</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Seçili Karakter
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {character ? (
                      <div className="flex items-center space-x-3">
                        {character.avatar_url && (
                          <img src={character.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">{character.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{character.tone}</div>
                        </div>
                        <Button
                          onClick={() => setShowCharacterDrawer(true)}
                          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Değiştir
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Karakter seçilmemiş
                        </div>
                        <Button
                          onClick={() => setShowCharacterDrawer(true)}
                          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Karakter Seç
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleOzet} 
                  disabled={loading || !character}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Gündem Analiz Ediliyor...</span>
                    </div>
                  ) : (
                    "📊 Gündem Özeti Oluştur"
                  )}
                </Button>

                {ozet && isCached && (
                  <Button 
                    onClick={handleRefreshOzet} 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    🔄 Yenile
                  </Button>
                )}

                {ozet && (
                  <div className="space-y-3">
                    <Button 
                      onClick={handleSesli} 
                      disabled={audioLoading || videoLoading}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      {audioLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sesli Okutuluyor...</span>
                        </div>
                      ) : (
                        "🎧 Sesli Okut"
                      )}
                    </Button>
                    
                    <Button 
                      onClick={handleGoruntulu} 
                      disabled={audioLoading || videoLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      {videoLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Video Oluşturuluyor...</span>
                        </div>
                      ) : (
                        "🎥 Görüntülü Okut"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sağ Panel - İçerik */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gündem Özeti */}
            {ozet && (
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>📝</span>
                      <span>Gündem Özeti</span>
                    </CardTitle>
                    {isCached && (
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
                          💾 Önbellekten
                        </span>
                        {ozetCreatedAt && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(ozetCreatedAt).toLocaleTimeString('tr-TR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <textarea 
                      className="w-full bg-transparent border-0 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-0" 
                      rows={12} 
                      value={ozet} 
                      readOnly 
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sesli Özet */}
            {audioUrl && (
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>🎧</span>
                    <span>Sesli Özet</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6">
                    <audio src={audioUrl} controls className="w-full" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Görüntülü Özet */}
            {videoUrl && (
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>🎥</span>
                    <span>Görüntülü Özet</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6">
                    <video src={videoUrl} controls className="w-full rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hata/Bilgi Mesajı */}
            {error && (
              <Card className={`shadow-xl border-0 border ${
                error.includes("Bugün için zaten") 
                  ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800" 
                  : "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800"
              }`}>
                <CardContent className="p-6">
                  <div className={`flex items-center space-x-3 ${
                    error.includes("Bugün için zaten") 
                      ? "text-blue-800 dark:text-blue-200" 
                      : "text-red-800 dark:text-red-200"
                  }`}>
                    <span className="text-xl">
                      {error.includes("Bugün için zaten") ? "ℹ️" : "⚠️"}
                    </span>
                    <span className="font-medium">{error}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Boş Durum */}
            {!ozet && !loading && (
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">📰</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Gündem Özeti Hazır Değil
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {character ? "Gündem özeti oluşturmak için yukarıdaki butona tıklayın." : "Önce bir karakter seçin, sonra gündem özeti oluşturun."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Karakter Seçim Drawer */}
        {showCharacterDrawer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>🎭</span>
                    <span>Karakter Seç</span>
                  </CardTitle>
                  <Button
                    onClick={() => setShowCharacterDrawer(false)}
                    className="w-8 h-8 p-0 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {characters.map((char) => (
                    <div
                      key={char.id}
                      onClick={() => selectCharacter(char)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        character?.id === char.id
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {char.avatar_url ? (
                          <img src={char.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{char.name.charAt(0)}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white">{char.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{char.tone}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {char.description}
                          </div>
                        </div>
                        {character?.id === char.id && (
                          <div className="text-purple-500">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}

export default function GundemPage() {
  return (
    <ProtectedRoute>
      <GundemPageContent />
    </ProtectedRoute>
  );
} 