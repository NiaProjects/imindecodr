'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.projects': 'Projects',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.back': 'Back',
    
    // Hero Section
    'hero.title': 'Transform Your Space Into a Masterpiece',
    'hero.subtitle': 'Discover the art of sophisticated interior design with IMIC Decor - where elegance meets functionality in every detail.',
    'hero.cta': 'Explore Our Services',
    'hero.contact': 'Get Consultation',
    
    // Services
    'services.title': 'Our Premium Services',
    'services.subtitle': 'Crafting exceptional spaces that reflect your unique style and elevate your lifestyle',
    'services.kitchen.title': 'Kitchen Design',
    'services.kitchen.desc': 'Modern culinary spaces that blend functionality with elegance',
    'services.bedroom.title': 'Bedroom Design', 
    'services.bedroom.desc': 'Luxurious retreats designed for comfort and tranquility',
    'services.office.title': 'Office Design',
    'services.office.desc': 'Professional environments that inspire productivity and success',
    'services.learnMore': 'Learn More',
    'services.viewAll': 'View All Services',
    
    // Why Choose Us
    'whyChoose.title': 'Why Choose IMIC Decor',
    'whyChoose.subtitle': 'Discover what sets us apart in the world of interior design',
    'whyChoose.experience.title': 'Expert Team',
    'whyChoose.experience.desc': 'Our certified designers bring years of experience and creativity to every project',
    'whyChoose.quality.title': 'Premium Quality',
    'whyChoose.quality.desc': 'We use only the finest materials and work with trusted suppliers worldwide',
    'whyChoose.service.title': 'Personalized Service',
    'whyChoose.service.desc': 'Every project is tailored to your unique style, needs, and budget',
    'whyChoose.delivery.title': 'Timely Delivery',
    'whyChoose.delivery.desc': 'We pride ourselves on completing projects on time without compromising quality',
    
    // Our Clients
    'clients.title': 'Our Valued Clients',
    'clients.subtitle': 'Trusted by leading companies and discerning homeowners',
    
    // Our Projects
    'projects.title': 'Our Featured Projects',
    'projects.subtitle': 'Explore our portfolio of stunning interior transformations',
    'projects.all': 'All Projects',
    'projects.residential': 'Residential',
    'projects.commercial': 'Commercial',
    'projects.hospitality': 'Hospitality',
    'projects.viewMore': 'View More Projects',
    
    // News
    'news.title': 'Latest News & Insights',
    'news.subtitle': 'Stay updated with the latest trends in interior design',
    'news.readMore': 'Read More',
    'news.viewAll': 'View All News',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Real feedback from our satisfied customers',
    
    // About
    'about.title': 'About IMIC Decor',
    'about.subtitle': 'Excellence in Interior Design',
    'about.description': 'With years of expertise in creating exceptional interior spaces, IMIC Decor has established itself as a leading name in luxury interior design. We believe that every space tells a story, and our mission is to help you tell yours through thoughtful design, premium materials, and meticulous attention to detail.',
    'about.experience': 'Years of Excellence',
    'about.projects': 'Completed Projects',
    'about.clients': 'Happy Clients',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to transform your space? Let\'s create something extraordinary together.',
    'contact.name': 'Full Name',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email Address',
    'contact.message': 'Message',
    'contact.unitType': 'Unit Type',
    'contact.unitLocation': 'Unit Location',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully! We\'ll get back to you soon.',
    'contact.apartment': 'Apartment',
    'contact.villa': 'Villa',
    'contact.office': 'Office',
    
    // Footer
    'footer.company': 'IMIC Decor',
    'footer.description': 'Creating exceptional interior spaces that reflect your unique style and elevate your lifestyle.',
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.about': 'من نحن',
    'nav.projects': 'مشاريعنا',
    'nav.news': 'الأخبار',
    'nav.contact': 'اتصل بنا',
    'nav.back': 'رجوع',
    
    // Hero Section
    'hero.title': 'حوّل مساحتك إلى تحفة فنية',
    'hero.subtitle': 'اكتشف فن التصميم الداخلي المتطور مع إيميك ديكور - حيث تلتقي الأناقة بالوظائف في كل تفصيلة.',
    'hero.cta': 'استكشف خدماتنا',
    'hero.contact': 'احصل على استشارة',
    
    // Services
    'services.title': 'خدماتنا المميزة',
    'services.subtitle': 'صياغة مساحات استثنائية تعكس أسلوبك الفريد وترفع من مستوى معيشتك',
    'services.kitchen.title': 'تصميم المطابخ',
    'services.kitchen.desc': 'مساحات طهي عصرية تمزج بين الوظائف والأناقة',
    'services.bedroom.title': 'تصميم غرف النوم',
    'services.bedroom.desc': 'ملاذات فاخرة مصممة للراحة والهدوء',
    'services.office.title': 'تصميم المكاتب',
    'services.office.desc': 'بيئات مهنية تلهم الإنتاجية والنجاح',
    'services.learnMore': 'اعرف المزيد',
    'services.viewAll': 'عرض جميع الخدمات',
    
    // Why Choose Us
    'whyChoose.title': 'لماذا تختار إيميك ديكور',
    'whyChoose.subtitle': 'اكتشف ما يميزنا في عالم التصميم الداخلي',
    'whyChoose.experience.title': 'فريق خبير',
    'whyChoose.experience.desc': 'مصممونا المعتمدون يجلبون سنوات من الخبرة والإبداع لكل مشروع',
    'whyChoose.quality.title': 'جودة مميزة',
    'whyChoose.quality.desc': 'نستخدم أجود المواد ونعمل مع موردين موثوقين حول العالم',
    'whyChoose.service.title': 'خدمة شخصية',
    'whyChoose.service.desc': 'كل مشروع مُصمم خصيصاً لأسلوبك واحتياجاتك وميزانيتك الفريدة',
    'whyChoose.delivery.title': 'التسليم في الوقت المحدد',
    'whyChoose.delivery.desc': 'نفتخر بإنجاز المشاريع في الوقت المحدد دون المساومة على الجودة',
    
    // Our Clients
    'clients.title': 'عملاؤنا الكرام',
    'clients.subtitle': 'موثوقون من قبل الشركات الرائدة وأصحاب المنازل المميزين',
    
    // Our Projects
    'projects.title': 'مشاريعنا المميزة',
    'projects.subtitle': 'استكشف معرض أعمالنا من التحولات الداخلية المذهلة',
    'projects.all': 'جميع المشاريع',
    'projects.residential': 'سكني',
    'projects.commercial': 'تجاري',
    'projects.hospitality': 'ضيافة',
    'projects.viewMore': 'عرض المزيد من المشاريع',
    
    // News
    'news.title': 'آخر الأخبار والرؤى',
    'news.subtitle': 'ابق على اطلاع بأحدث اتجاهات التصميم الداخلي',
    'news.readMore': 'اقرأ المزيد',
    'news.viewAll': 'عرض جميع الأخبار',
    
    // Testimonials
    'testimonials.title': 'ما يقوله عملاؤنا',
    'testimonials.subtitle': 'تقييمات حقيقية من عملائنا الراضين',
    
    // About
    'about.title': 'حول إيميك ديكور',
    'about.subtitle': 'التميز في التصميم الداخلي',
    'about.description': 'بسنوات من الخبرة في إنشاء مساحات داخلية استثنائية، أثبتت إيميك ديكور نفسها كاسم رائد في التصميم الداخلي الفاخر. نؤمن أن كل مساحة تحكي قصة، ومهمتنا هي مساعدتك في حكاية قصتك من خلال التصميم المدروس والمواد الفاخرة والاهتمام الدقيق بالتفاصيل.',
    'about.experience': 'سنوات من التميز',
    'about.projects': 'مشروع مكتمل',
    'about.clients': 'عميل سعيد',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'مستعد لتحويل مساحتك؟ دعنا نصنع شيئاً استثنائياً معاً.',
    'contact.name': 'الاسم الكامل',
    'contact.phone': 'رقم الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.unitType': 'نوع الوحدة',
    'contact.unitLocation': 'موقع الوحدة',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جاري الإرسال...',
    'contact.success': 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
    'contact.apartment': 'شقة',
    'contact.villa': 'فيلا',
    'contact.office': 'مكتب',
    
    // Footer
    'footer.company': 'إيميك ديكور',
    'footer.description': 'إنشاء مساحات داخلية استثنائية تعكس أسلوبك الفريد وترفع من مستوى معيشتك.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};