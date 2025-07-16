'use client';

import {  useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../components/Header';

export default function ServicesPage() {
  const params = useParams();
  const router = useRouter();
  const serviceName = params.services as string;

  // Services data
  const services = {
    'botox': {
      title: 'بوتاکس',
      subtitle: 'جوانسازی طبیعی با بوتاکس',
      description: 'بوتاکس یکی از محبوب‌ترین و مؤثرترین روش‌های غیر جراحی برای کاهش چین و چروک‌های صورت و جوانسازی پوست است.',
      icon: '💉',
      color: 'purple',
      features: [
        'کاهش چین و چروک‌های دور چشم',
        'صاف کردن خطوط اخم',
        'درمان چین و چروک‌های پیشانی',
        'کاهش خطوط خنده',
        'بالا بردن ابرو',
        'درمان تعریق بیش از حد'
      ],
      benefits: [
        'نتایج سریع و قابل مشاهده',
        'روش غیر جراحی و کم‌تهاجمی',
        'بدون نیاز به دوران نقاهت',
        'ایمن و تأیید شده',
        'نتایج طبیعی',
        'قابل برگشت'
      ],
      process: [
        'مشاوره اولیه و بررسی پوست',
        'طراحی برنامه درمانی شخصی',
        'تزریق دقیق بوتاکس',
        'پیگیری و مراقبت پس از درمان'
      ]
    },
    'filler': {
      title: 'فیلر',
      subtitle: 'حجم‌دهی و شکل‌دهی زیبا',
      description: 'فیلرها برای پرکردن چین و چروک‌ها، حجم‌دهی به لب‌ها و گونه‌ها و بهبود کلی ظاهر صورت استفاده می‌شوند.',
      icon: '🎯',
      color: 'rose',
      features: [
        'پرکردن چین و چروک‌های عمیق',
        'حجم‌دهی به لب‌ها',
        'برجسته کردن گونه‌ها',
        'اصلاح فرم بینی',
        'پرکردن گودی‌های زیر چشم',
        'شکل‌دهی خط فک'
      ],
      benefits: [
        'نتایج فوری و قابل مشاهده',
        'طبیعی و هماهنگ با صورت',
        'دوام زیاد (۶ تا ۱۸ ماه)',
        'قابل تنظیم و اصلاح',
        'ایمن و بدون عوارض جانبی',
        'بهبود اعتماد به نفس'
      ],
      process: [
        'مشاوره و تحلیل ساختار صورت',
        'انتخاب نوع فیلر مناسب',
        'تزریق دقیق و هنرمندانه',
        'پیگیری و ارزیابی نتایج'
      ]
    },
    'hifu': {
      title: 'هایفوتراپی',
      subtitle: 'لیفت غیر جراحی با فناوری HIFU',
      description: 'هایفوتراپی با استفاده از امواج فراصوتی متمرکز، لیفت طبیعی و جوانسازی عمیق پوست را بدون جراحی ممکن می‌سازد.',
      icon: '⚡',
      color: 'blue',
      features: [
        'لیفت و سفت کردن پوست صورت',
        'کاهش چین و چروک‌ها',
        'بهبود خط فک و گردن',
        'تحریک تولید کلاژن',
        'کاهش افتادگی پلک',
        'بهبود بافت پوست'
      ],
      benefits: [
        'بدون جراحی و بی‌دردی',
        'نتایج طولانی مدت',
        'بدون دوران نقاهت',
        'ایمن و بدون عوارض',
        'مناسب برای تمام سنین',
        'بهبود تدریجی و طبیعی'
      ],
      process: [
        'ارزیابی پوست و مشاوره',
        'تعیین نواحی درمان',
        'اعمال امواج فراصوتی متمرکز',
        'پیگیری و ارزیابی پیشرفت'
      ]
    },
    'mesotherapy': {
      title: 'مزوتراپی',
      subtitle: 'تغذیه عمیق و جوانسازی پوست',
      description: 'مزوتراپی روشی است که در آن ترکیبات مغذی و دارویی مستقیماً به لایه‌های عمیق پوست تزریق می‌شود.',
      icon: '💧',
      color: 'emerald',
      features: [
        'تغذیه عمیق پوست',
        'بهبود رطوبت و شادابی',
        'کاهش لک و تیرگی',
        'درمان ریزش موی سر',
        'کاهش سلولیت',
        'بهبود گردش خون پوست'
      ],
      benefits: [
        'تغذیه مستقیم سلول‌های پوست',
        'بهبود کیفیت و بافت پوست',
        'نتایج تدریجی و ماندگار',
        'مناسب برای انواع پوست',
        'ترکیب با سایر درمان‌ها',
        'بدون عوارض جانبی'
      ],
      process: [
        'تشخیص نوع پوست و نیازها',
        'انتخاب ترکیبات مناسب',
        'تزریق دقیق در نواحی هدف',
        'برنامه‌ریزی جلسات بعدی'
      ]
    }
  };

  // Set dark theme as default
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get current service or default to botox
  const currentService = services[serviceName as keyof typeof services] || services.botox;
  const serviceKeys = Object.keys(services);

  return (
    <div className="min-h-screen relative">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <Header 
        scrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-24">
      {/* Service Navigation */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              خدمات ما
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {serviceKeys.map((key) => {
              const service = services[key as keyof typeof services];
              const isActive = key === serviceName;
              return (
                <button
                  key={key}
                  onClick={() => router.push(`/${key}`)}
                  className={`
                    group relative p-4 md:p-6 rounded-2xl transition-all duration-300 
                    border border-gray-200 dark:border-gray-700 hover:border-transparent
                    ${isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                  

                  
                  {/* Title */}
                  <div className={`
                    text-sm md:text-base font-medium leading-tight
                    ${isActive ? 'text-white' : 'text-gray-800 dark:text-gray-200'}
                  `}>
                    {service.title}
                  </div>

                  {/* Hover effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${!isActive ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5' : ''}
                  `}></div>
                </button>
              );
            })}
          </div>

          {/* Mobile scroll indicator */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex space-x-1">
              {[...Array(Math.ceil(serviceKeys.length / 2))].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* Service Detail */}
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              {/* Service Header */}
              <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-gradient-primary leading-tight">
                  {currentService.title}
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentService.subtitle}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  {currentService.description}
                </p>
              </div>

              {/* Service Details Grid */}
              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
                {/* Features */}
                <div className="glass-strong rounded-2xl p-5 sm:p-6 lg:p-8 hover-glass hover-lift transition-all duration-300">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center mr-3
                      ${currentService.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : ''}
                      ${currentService.color === 'rose' ? 'bg-gradient-to-br from-rose-500 to-orange-500' : ''}
                      ${currentService.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : ''}
                      ${currentService.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : ''}
                    `}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200">
                      ویژگی‌های درمان
                    </h3>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    {currentService.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`
                          w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0
                          ${currentService.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : ''}
                          ${currentService.color === 'rose' ? 'bg-gradient-to-br from-rose-500 to-orange-500' : ''}
                          ${currentService.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : ''}
                          ${currentService.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : ''}
                        `}></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="glass-strong rounded-2xl p-5 sm:p-6 lg:p-8 hover-glass hover-lift transition-all duration-300">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center mr-3
                      ${currentService.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : ''}
                      ${currentService.color === 'rose' ? 'bg-gradient-to-br from-rose-500 to-orange-500' : ''}
                      ${currentService.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : ''}
                      ${currentService.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : ''}
                    `}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m9-9H3" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200">
                      مزایای درمان
                    </h3>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    {currentService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`
                          w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0
                          ${currentService.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : ''}
                          ${currentService.color === 'rose' ? 'bg-gradient-to-br from-rose-500 to-orange-500' : ''}
                          ${currentService.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : ''}
                          ${currentService.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : ''}
                        `}></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process */}
                <div className="glass-strong rounded-2xl p-5 sm:p-6 lg:p-8 hover-glass hover-lift transition-all duration-300">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center mr-3
                      ${currentService.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : ''}
                      ${currentService.color === 'rose' ? 'bg-gradient-to-br from-rose-500 to-orange-500' : ''}
                      ${currentService.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : ''}
                      ${currentService.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : ''}
                    `}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200">
                      فرآیند درمان
                    </h3>
                  </div>
                  <div className="space-y-4 sm:space-y-5">
                    {currentService.process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`
                          w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-white font-bold text-xs sm:text-sm shadow-lg
                          ${currentService.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : ''}
                          ${currentService.color === 'rose' ? 'bg-gradient-to-br from-rose-500 to-orange-500' : ''}
                          ${currentService.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : ''}
                          ${currentService.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : ''}
                        `}>
                          {index + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed pt-1">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8 sm:mt-12 lg:mt-16">
                <div className="glass-strong rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
                    آماده برای شروع هستید؟
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
                    برای دریافت مشاوره رایگان و رزرو نوبت با ما تماس بگیرید
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
                    <button 
                      onClick={() => router.push('/#contact')}
                      className="bg-gradient-primary text-white px-6 sm:px-8 py-4 rounded-full font-medium hover-lift hover-glow transition-all text-base min-h-[48px] active:scale-95"
                    >
                      رزرو نوبت
                    </button>
                    <button 
                      onClick={() => router.push('/')}
                      className="glass text-gray-800 dark:text-gray-200 px-6 sm:px-8 py-4 rounded-full font-medium hover-glass transition-all text-base min-h-[48px] active:scale-95"
                    >
                      بازگشت به صفحه اصلی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
