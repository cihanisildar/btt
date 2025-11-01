'use client';

import { Youtube, Instagram, Facebook, ExternalLink } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/channel/UC-DXg79o_oeLbkXUlFJmYxw',
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
      url: 'https://www.tiktok.com/@fatih.batuta',
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
    <footer id="footer" className="bg-gray-900 text-white">
      <div id="footer-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="footer-content" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo ve Açıklama */}
          <div id="footer-about" className="space-y-4">
            <div id="footer-logo" className="flex items-center space-x-3">
              <div id="footer-logo-icon" className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg id="footer-logo-svg" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div id="footer-logo-text">
                <h3 id="footer-logo-title" className="text-xl font-bold">Kan Grubu Yönetim</h3>
                <p id="footer-logo-subtitle" className="text-sm text-gray-400">Güvenli ve Modern</p>
              </div>
            </div>
            <p id="footer-description" className="text-gray-400 text-sm leading-relaxed">
              Kişilerin kan grubu verilerini güvenli bir şekilde yönetin, 
              QR kod oluşturun ve modern teknolojilerle veri takibi yapın.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div id="footer-links" className="space-y-4">
            <h4 id="footer-links-title" className="text-lg font-semibold">Hızlı Linkler</h4>
            <ul id="footer-links-list" className="space-y-2">
              <li id="footer-link-home">
                <a id="footer-link-home-anchor" href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ana Sayfa
                </a>
              </li>
              <li id="footer-link-add">
                <a id="footer-link-add-anchor" href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kişi Ekle
                </a>
              </li>
              <li id="footer-link-qr">
                <a id="footer-link-qr-anchor" href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  QR Kod Oluştur
                </a>
              </li>
              <li id="footer-link-help">
                <a id="footer-link-help-anchor" href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Yardım
                </a>
              </li>
            </ul>
          </div>

          {/* Bize Ulaşın */}
          <div id="footer-contact" className="space-y-4">
            <h4 id="footer-contact-title" className="text-lg font-semibold">Bize Ulaşın</h4>
            <p id="footer-contact-description" className="text-gray-400 text-sm">
              Sosyal medya hesaplarımızdan bizi takip edin ve güncel gelişmelerden haberdar olun.
            </p>
            
            {/* Sosyal Medya Linkleri */}
            <div id="footer-social-links" className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    id={`footer-social-link-${social.name.toLowerCase()}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 transition-all duration-200 ${social.color} hover:bg-gray-700 group`}
                  >
                    <IconComponent id={`footer-social-icon-${social.name.toLowerCase()}`} className="w-5 h-5" />
                    <span id={`footer-social-text-${social.name.toLowerCase()}`} className="text-sm font-medium">{social.name}</span>
                  </a>
                );
              })}
            </div>

            {/* İletişim Bilgileri */}
            <div id="footer-contact-info" className="pt-4 border-t border-gray-800">
              <div id="footer-contact-info-list" className="space-y-2 text-sm text-gray-400">
                <p id="footer-contact-email">📧 info@kan-grubu.com</p>
                <p id="footer-contact-phone">📞 +90 (555) 123 45 67</p>
                <p id="footer-contact-address">📍 İstanbul, Türkiye</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div id="footer-bottom" className="mt-8 pt-8 border-t border-gray-800">
          <div id="footer-bottom-content" className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div id="footer-copyright" className="text-sm text-gray-400">
              © 2024 Kan Grubu Yönetim Sistemi. Tüm hakları saklıdır.
            </div>
            <div id="footer-bottom-links" className="flex space-x-6 text-sm">
              <a id="footer-bottom-link-privacy" href="#" className="text-gray-400 hover:text-white transition-colors">
                Gizlilik Politikası
              </a>
              <a id="footer-bottom-link-terms" href="#" className="text-gray-400 hover:text-white transition-colors">
                Kullanım Şartları
              </a>
              <a id="footer-bottom-link-cookies" href="#" className="text-gray-400 hover:text-white transition-colors">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
