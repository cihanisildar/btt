'use client';

import { Youtube, Instagram, Facebook, ExternalLink } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@yourchannel',
      color: 'hover:text-red-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/fatih.batuta?igsh=NW1xbTd6d2E3bGtj',
      color: 'hover:text-pink-600'
    },
    {
      name: 'TikTok',
      icon: ExternalLink,
      url: 'https://tiktok.com/@yourusername',
      color: 'hover:text-black'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/yourpage',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Kan Grubu Yönetim</h3>
                <p className="text-sm text-gray-400">Güvenli ve Modern</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kişilerin kan grubu verilerini güvenli bir şekilde yönetin, 
              QR kod oluşturun ve modern teknolojilerle veri takibi yapın.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kişi Ekle
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  QR Kod Oluştur
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Yardım
                </a>
              </li>
            </ul>
          </div>

          {/* Bize Ulaşın */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Bize Ulaşın</h4>
            <p className="text-gray-400 text-sm">
              Sosyal medya hesaplarımızdan bizi takip edin ve güncel gelişmelerden haberdar olun.
            </p>
            
            {/* Sosyal Medya Linkleri */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 transition-all duration-200 ${social.color} hover:bg-gray-700 group`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                );
              })}
            </div>

            {/* İletişim Bilgileri */}
            <div className="pt-4 border-t border-gray-800">
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 info@kan-grubu.com</p>
                <p>📞 +90 (555) 123 45 67</p>
                <p>📍 İstanbul, Türkiye</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Kan Grubu Yönetim Sistemi. Tüm hakları saklıdır.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Kullanım Şartları
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
