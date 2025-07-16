'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import { AnimatedTestimonials } from './components/ui/animated-testimonials';
import { LoopOnce } from 'three/src/constants.js';

export default function Home() {
  const router = useRouter();
  
  // Video testimonials data
  const videoTestimonials = [
    {
      quote: "با بهره‌گیری از جدیدترین تکنولوژی‌ها و روش‌های درمانی، تجربه‌ای منحصر به فرد از زیبایی و سلامت پوست را برای شما فراهم می‌کنیم.",
      name: "درمان‌های پیشرفته",
      designation: "لیزر و تکنولوژی مدرن",
      src: "/video1.mp4",
      isVideo: true,
    },
    {
      quote: "کیفیت بالا و ایمنی در ارائه خدمات زیبایی با استفاده از تجهیزات پزشکی مدرن و تکنیک‌های به‌روز.",
      name: "خدمات حرفه‌ای",
      designation: "تزریق و جوانسازی",
      src: "/video2.mp4",
      isVideo: true,
    },
    {
      quote: "مشاوره تخصصی و طراحی برنامه درمانی مخصوص هر فرد با در نظر گیری نیازهای شخصی.",
      name: "مشاوره تخصصی",
      designation: "برنامه‌ریزی شخصی‌سازی شده",
      src: "/video3.mp4",
      isVideo: true,
      autoplay: true,
    },
  ];

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

      {/* Header Component */}
      <Header 
        scrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen text-foreground">
        {/* Hero Section */}
        <section id="home" className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 ">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              {/* Hero Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight">
                  زیبایی با علم
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-700 dark:text-gray-300">
                  کلینیک تخصصی زیبایی و درمان‌های پوستی دکتر بهروز مسعودی
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="bg-blue-600 text-white px-6 sm:px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-all text-base sm:text-lg min-h-[48px] active:scale-95"
                  >
                    رزرو نوبت
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 sm:px-8 py-4 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-base sm:text-lg min-h-[48px] active:scale-95"
                  >
                    مشاهده خدمات
                  </button>
                </div>
              </div>
              
              {/* Animated Video Testimonials */}
              <AnimatedTestimonials 
                testimonials={videoTestimonials} 
                autoplay={false}
              />
            </div>
          </div>
        </section>


        {/* About Section */}
        <section id="about" className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gradient-primary px-2">درباره دکتر بهروز مسعودی</h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4 sm:px-0">
                  متخصص برجسته در زمینه زیبایی و درمان‌های پوستی
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div className="animate-slideIn order-2 md:order-1">
                  <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl hover-glass transition-all duration-300 hover-lift">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-primary ring-4 ring-white/30">
                      <span className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">د</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4 text-gray-800 dark:text-gray-200">دکتر بهروز مسعودی</h4>
                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      متخصص زیبایی و درمان‌های پوستی
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
                  <div className="animate-fadeIn glass rounded-2xl p-4 sm:p-6 hover-glass transition-all duration-300">
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">تجربه و تخصص</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                      دکتر بهروز مسعودی با بیش از ۱۵ سال تجربه در زمینه زیبایی و درمان‌های پوستی، یکی از پیشگامان استفاده از روش‌های نوین و مدرن در ایران محسوب می‌شود.
                    </p>
                  </div>
                  
                  <div className="animate-fadeIn glass rounded-2xl p-4 sm:p-6 hover-glass transition-all duration-300">
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">مأموریت ما</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                      هدف ما ارائه بهترین خدمات درمانی و زیبایی با استفاده از تکنولوژی‌های روز دنیا و رعایت بالاترین استانداردهای ایمنی و کیفیت است.
                    </p>
                  </div>
                  
                  <div className="animate-fadeIn glass rounded-2xl p-4 sm:p-6 hover-glass transition-all duration-300">
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">اعتبارات</h4>
                    <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-gradient-primary rounded-full mr-3 shadow-sm flex-shrink-0"></span>
                        عضو انجمن پزشکان متخصص پوست ایران
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-gradient-primary rounded-full mr-3 shadow-sm flex-shrink-0"></span>
                        دارای مدرک تخصصی از دانشگاه علوم پزشکی تهران
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-gradient-primary rounded-full mr-3 shadow-sm flex-shrink-0"></span>
                        گواهینامه‌های بین‌المللی در زمینه لیزر درمانی
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-3 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  خدمات ما
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  طیف گسترده‌ای از خدمات تخصصی زیبایی و درمان‌های پوستی
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {[
                  {
                    title: "بوتاکس",
                    description: "کاهش چین و چروک‌های صورت و جوانسازی طبیعی پوست",
                    colors: "purple",
                    route: "/botox"
                  },
                  {
                    title: "فیلر",
                    description: "پرکردن چین و چروک‌ها و شکل‌دهی طبیعی به صورت",
                    colors: "rose",
                    route: "/filler"
                  },
                  {
                    title: "هایفوتراپی",
                    description: "لیفت غیر جراحی با فناوری HIFU",
                    colors: "blue",
                    route: "/hifu"
                  },
                  {
                    title: "مزوتراپی",
                    description: "تغذیه عمیق پوست و درمان ریزش مو",
                    colors: "emerald",
                    route: "/mesotherapy"
                  },
                  {
                    title: "پلاسما جت",
                    description: "درمان موثر جوش، لک، و رگ‌های عنکبوتی با جدیدترین دستگاه‌های لیزر",
                    colors: "pink",
                    route: "#"
                  },
                  {
                    title: "درمان آکنه",
                    description: "درمان تخصصی جوش و آثار آن با روش‌های مدرن",
                    colors: "amber",
                    route: "#"
                  }
                ].map((service, index) => (
                  <div key={index} className="group">
                    <div 
                      className="relative h-full bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-95 active:shadow-sm"
                      onClick={() => service.route !== "#" && router.push(service.route)}
                    >
                      
                      {/* Title */}
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-center line-clamp-1">
                        {service.title}
                      </h4>
                      
                      {/* Description - hidden on mobile, visible on sm+ */}
                      <p className="hidden sm:block text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-center line-clamp-3">
                        {service.description}
                      </p>

                      {/* Mobile description - shorter version */}
                      <p className="block sm:hidden text-xs text-gray-600 dark:text-gray-400 text-center line-clamp-2">
                        {service.description.split(' ').slice(0, 4).join(' ')}...
                      </p>

                      {/* Click indicator for main services */}
                      {service.route !== "#" && (
                        <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}

                      {/* Active state indicator */}
                      <div className={`
                        absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-active:opacity-10 transition-opacity duration-100
                        ${service.colors === 'pink' ? 'bg-pink-500' : ''}
                        ${service.colors === 'purple' ? 'bg-purple-500' : ''}
                        ${service.colors === 'rose' ? 'bg-rose-500' : ''}
                        ${service.colors === 'amber' ? 'bg-amber-500' : ''}
                        ${service.colors === 'blue' ? 'bg-blue-500' : ''}
                        ${service.colors === 'emerald' ? 'bg-emerald-500' : ''}
                      `} />
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="flex justify-center mt-8 sm:mt-12">
                <button className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base">
                  <span>مشاهده همه</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gradient-primary px-2">تماس با ما</h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4 sm:px-0">
                  برای رزرو نوبت و مشاوره تخصصی با ما در ارتباط باشید
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
                  <div className="animate-slideIn glass rounded-2xl p-4 sm:p-6 hover-glass hover-lift transition-all duration-300">
                    <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base mb-1">آدرس</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                          تهران، میدان ولیعصر، برج پزشکان، طبقه ۱۲
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="animate-slideIn glass rounded-2xl p-4 sm:p-6 hover-glass hover-lift transition-all duration-300">
                    <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base mb-1">تلفن</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          ۰۲۱-۱۲۳۴۵۶۷۸
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="animate-slideIn glass rounded-2xl p-4 sm:p-6 hover-glass hover-lift transition-all duration-300">
                    <div className="flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base mb-1">ساعات کاری</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                          شنبه تا چهارشنبه: ۹:۰۰ - ۱۹:۰۰
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                          پنج‌شنبه: ۹:۰۰ - ۱۵:۰۰
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="animate-fadeIn order-1 md:order-2">
                  <div className="glass-strong rounded-2xl p-6 sm:p-8 shadow-2xl hover-glass hover-lift transition-all duration-300">
                    <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-200">درخواست مشاوره</h4>
                    <form className="space-y-4 sm:space-y-6">
                      <div>
                        <input
                          type="text"
                          placeholder="نام و نام خانوادگی"
                          className="input-glass w-full px-4 py-3 sm:py-4 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base min-h-[44px]"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="شماره تماس"
                          className="input-glass w-full px-4 py-3 sm:py-4 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base min-h-[44px]"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="پیام شما"
                          rows={4}
                          className="input-glass w-full px-4 py-3 sm:py-4 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none text-sm sm:text-base min-h-[100px]"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-primary text-white py-4 rounded-lg font-medium hover-lift hover-glow transition-all duration-300 transform hover:scale-105 shadow-primary text-base min-h-[48px] active:scale-95"
                      >
                        ارسال درخواست
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass border-t border-white/30 dark:border-white/20 py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center sm:text-right">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse mb-3 sm:mb-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
                      <span className="text-white font-bold drop-shadow-lg text-sm">د</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">دکتر بهروز مسعودی</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                    کلینیک تخصصی زیبایی و درمان‌های پوستی
                  </p>
                </div>
                
                <div className="text-center sm:text-right">
                  <h4 className="font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">خدمات</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <li className="hover:text-pink-500 transition-colors cursor-pointer py-1 min-h-[32px] flex items-center justify-center sm:justify-start">لیزر درمانی</li>
                    <li className="hover:text-pink-500 transition-colors cursor-pointer py-1 min-h-[32px] flex items-center justify-center sm:justify-start">تزریق بوتاکس</li>
                    <li className="hover:text-pink-500 transition-colors cursor-pointer py-1 min-h-[32px] flex items-center justify-center sm:justify-start">فیلر و ژل</li>
                    <li className="hover:text-pink-500 transition-colors cursor-pointer py-1 min-h-[32px] flex items-center justify-center sm:justify-start">پیلینگ شیمیایی</li>
                  </ul>
                </div>
                
                <div className="text-center sm:text-right sm:col-span-2 md:col-span-1">
                  <h4 className="font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">تماس</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <p className="py-1 leading-relaxed">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                    <p className="py-1 leading-relaxed">آدرس: تهران، میدان ولیعصر</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/30 dark:border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed px-4 sm:px-0">
                  © ۱۴۰۳ کلینیک زیبایی دکتر بهروز مسعودی. تمامی حقوق محفوظ است.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
