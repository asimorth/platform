"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Character = {
  id: string;
  name: string;
  description: string;
  tone: string;
  humor_level: number;
  formal_level: number;
  persona_notes: string;
  avatar_url?: string;
  voice_id?: string;
};

export default function ManagePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Character | null>(null);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (id === "asimorth-default") {
      alert("Asimorth karakteri silinemez. Bu varsayılan karakterdir.");
      return;
    }
    if (confirm("Bu karakteri silmek istediğinizden emin misiniz?")) {
      const res = await fetch(`http://127.0.0.1:8000/characters/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCharacters();
      } else {
        const error = await res.json();
        alert(error.detail || "Karakter silinirken hata oluştu.");
      }
    }
  };

  const handleEditSave = async () => {
    if (!editing) return;
    setEditStatus("");
    const res = await fetch(`http://127.0.0.1:8000/characters/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      setEditStatus("✅ Kaydedildi");
      setEditing(null);
      fetchCharacters();
    } else {
      setEditStatus("⚠️ Hata oluştu");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 dark:from-gray-900 dark:via-red-900 dark:to-pink-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl">⚙️</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Karakter Yönet
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Oluşturduğun karakterleri burada görüntüleyebilir, düzenleyebilir ve yönetebilirsin.
            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-2">
              Karakterlerini düzenle, sil veya yeni özellikler ekle.
            </span>
          </p>
        </div>

        {/* Karakterler Listesi */}
        <div className="space-y-6">
          {loading ? (
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Karakterler yükleniyor...</p>
              </CardContent>
            </Card>
          ) : characters.length === 0 ? (
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎭</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Henüz Karakter Yok
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  İlk karakterinizi oluşturmak için karakter yarat sayfasına gidin.
                </p>
                <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  <a href="/character">🎭 Karakter Yarat</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {characters.map((char) => (
                 <Card key={char.id} className={`shadow-xl border-0 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                   char.id === "asimorth-default" 
                     ? "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-2 border-purple-200 dark:border-purple-800" 
                     : "bg-white/80 dark:bg-gray-800/80"
                 }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      {char.avatar_url ? (
                        <img src={char.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-orange-200 dark:border-orange-800" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{char.name.charAt(0)}</span>
                        </div>
                      )}
                                             <div className="flex-1">
                         <div className="flex items-center space-x-2">
                           <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                             {char.name}
                           </CardTitle>
                           {char.id === "asimorth-default" && (
                             <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-medium">
                               Varsayılan
                             </span>
                           )}
                         </div>
                         <p className="text-sm text-gray-500 dark:text-gray-400">
                           {char.tone}
                         </p>
                       </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {char.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Mizah: {Math.round(char.humor_level * 100)}%</span>
                        <span>Resmiyet: {Math.round(char.formal_level * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: `${(char.humor_level + char.formal_level) / 2 * 100}%` }}></div>
                      </div>
                    </div>
                    
                                         <div className="flex gap-2 pt-2">
                       <Button
                         onClick={() => setEditing(char)}
                         className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                       >
                         ✏️ Düzenle
                       </Button>
                       {char.id === "asimorth-default" ? (
                         <Button
                           disabled
                           className="flex-1 bg-gray-400 text-white py-2 text-sm font-medium rounded-lg cursor-not-allowed"
                         >
                           🔒 Varsayılan
                         </Button>
                       ) : (
                         <Button
                           onClick={() => handleDelete(char.id)}
                           className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                         >
                           🗑️ Sil
                         </Button>
                       )}
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Düzenleme Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>✏️</span>
                    <span>Karakteri Düzenle</span>
                  </CardTitle>
                  <Button
                    onClick={() => setEditing(null)}
                    className="w-8 h-8 p-0 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🏷️ Karakter Adı
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-300"
                      value={editing.name}
                      onChange={e => setEditing({ ...editing, name: e.target.value })}
                      placeholder="Karakter adı"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🎭 Konuşma Tonu
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-300"
                      value={editing.tone}
                      onChange={e => setEditing({ ...editing, tone: e.target.value })}
                      placeholder="Konuşma tonu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    📝 Açıklama
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-300 resize-none"
                    rows={3}
                    value={editing.description}
                    onChange={e => setEditing({ ...editing, description: e.target.value })}
                    placeholder="Karakter açıklaması"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      😄 Mizah Seviyesi: {Math.round(editing.humor_level * 100)}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={editing.humor_level}
                      onChange={e => setEditing({ ...editing, humor_level: parseFloat(e.target.value) })}
                      className="w-full accent-orange-500"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🎩 Resmiyet Seviyesi: {Math.round(editing.formal_level * 100)}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={editing.formal_level}
                      onChange={e => setEditing({ ...editing, formal_level: parseFloat(e.target.value) })}
                      className="w-full accent-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    📋 Ek Notlar
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-300 resize-none"
                    rows={3}
                    value={editing.persona_notes}
                    onChange={e => setEditing({ ...editing, persona_notes: e.target.value })}
                    placeholder="Ek notlar"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🖼️ Avatar URL
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-300"
                      value={editing.avatar_url || ""}
                      onChange={e => setEditing({ ...editing, avatar_url: e.target.value })}
                      placeholder="Avatar URL"
                    />
                    {editing.avatar_url && (
                      <img src={editing.avatar_url} alt="Avatar" className="mt-2 w-16 h-16 rounded-full object-cover border-2 border-orange-200 dark:border-orange-800" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🎵 Ses ID
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-300"
                      value={editing.voice_id || ""}
                      onChange={e => setEditing({ ...editing, voice_id: e.target.value })}
                      placeholder="Ses ID"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleEditSave}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    💾 Kaydet
                  </Button>
                  <Button
                    onClick={() => setEditing(null)}
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 py-3 font-semibold rounded-xl transition-all duration-300"
                  >
                    ❌ İptal
                  </Button>
                </div>
                
                {editStatus && (
                  <div className={`p-4 rounded-xl text-center font-medium ${
                    editStatus.includes("✅") 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800" 
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
                  }`}>
                    {editStatus}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
} 