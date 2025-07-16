/* eslint-disable */
'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  User, 
  Heart, 
  Settings, 
  Download, 
  Eye,
  CheckCircle,
  Filter,
  Search,
  Plus,
  BarChart3,
  Award,
  Zap
} from 'lucide-react';
import Header from '../components/Header';

const SERVICES = [
  { key: 'consult', label: 'مشاوره', icon: User, color: 'from-blue-500 to-cyan-500' },
  { key: 'botox', label: 'بوتاکس', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { key: 'filler', label: 'فیلر', icon: Zap, color: 'from-emerald-500 to-teal-500' },
  { key: 'hifu', label: 'هایفو', icon: Award, color: 'from-orange-500 to-red-500' },
];

const TIMES = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '12:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: false },
  { time: '17:00', available: true },
];

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    service: 'بوتاکس',
    date: '2024-07-20',
    time: '10:00',
    status: 'confirmed',
    doctor: 'دکتر احمدی'
  },
  {
    id: 2,
    service: 'مشاوره',
    date: '2024-07-25',
    time: '14:00',
    status: 'pending',
    doctor: 'دکتر محمدی'
  },
  {
    id: 3,
    service: 'فیلر',
    date: '2024-07-18',
    time: '16:00',
    status: 'completed',
    doctor: 'دکتر حسینی'
  }
];

const MOCK_FAVORITES = [
  { id: 1, service: 'لیزر موی زائد', category: 'لیزر' },
  { id: 2, service: 'جوانسازی پوست', category: 'جوانسازی' },
  { id: 3, service: 'میکرونیدلینگ', category: 'درمان' }
];

export default function DashboardPage() {
  const [selectedService, setSelectedService] = useState('consult');
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments] = useState(MOCK_APPOINTMENTS);
  const [favorites] = useState(MOCK_FAVORITES);

  const selectedServiceData = SERVICES.find(s => s.key === selectedService);

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{appointments.length}</span>
        </div>
        <h3 className="text-white font-semibold mb-1">کل نوبت‌ها</h3>
        <p className="text-slate-300 text-sm">
          {appointments.filter(a => a.status === 'confirmed').length} تأیید شده
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            {appointments.filter(a => a.status === 'confirmed').length}
          </span>
        </div>
        <h3 className="text-white font-semibold mb-1">نوبت‌های آینده</h3>
        <p className="text-slate-300 text-sm">۳۰ روز آینده</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{favorites.length}</span>
        </div>
        <h3 className="text-white font-semibold mb-1">علاقه‌مندی‌ها</h3>
        <p className="text-slate-300 text-sm">سرویس‌های ذخیره شده</p>
      </div>
    </div>
  );

  type AppointmentStatus = 'confirmed' | 'pending' | 'done';

  interface Appointment {
    service: string;
    doctor: string;
    status: AppointmentStatus;
    date: string;
    time: string;
  }

  interface AppointmentCardProps {
    appointment: Appointment;
  }

  const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{appointment.service}</h3>
          <p className="text-slate-300 text-sm">دکتر: {appointment.doctor}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          appointment.status === 'confirmed' 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
            : appointment.status === 'pending'
            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
            : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
        }`}>
          {appointment.status === 'confirmed' ? 'تأیید شده' : 
           appointment.status === 'pending' ? 'در انتظار' : 'انجام شده'}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-slate-400">تاریخ</p>
          <p className="text-white font-medium">{appointment.date}</p>
        </div>
        <div>
          <p className="text-slate-400">زمان</p>
          <p className="text-white font-medium">{appointment.time}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors">
            <Eye className="w-4 h-4 inline mr-1" />
            جزئیات
          </button>
          {appointment.status === 'confirmed' && (
            <button className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg text-pink-300 text-sm transition-colors">
              <Download className="w-4 h-4 inline mr-1" />
              دانلود
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const FavoriteCard = ({ favorite }: { favorite: { service: string; category: string } }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{favorite.service}</h3>
          <p className="text-slate-300 text-sm">دسته: {favorite.category}</p>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Heart className="w-5 h-5 text-pink-400 fill-current" />
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
          رزرو نوبت
        </button>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <button className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
        <Search className="w-8 h-8 text-blue-400 mx-auto mb-2" />
        <p className="text-white text-sm font-medium">جستجوی سرویس</p>
      </button>
      <button className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
        <Plus className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <p className="text-white text-sm font-medium">رزرو جدید</p>
      </button>
      <button className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
        <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
        <p className="text-white text-sm font-medium">گزارش‌ها</p>
      </button>
      <button className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
        <Settings className="w-8 h-8 text-orange-400 mx-auto mb-2" />
        <p className="text-white text-sm font-medium">تنظیمات</p>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Top Navigation */}
        <Header scrollToSection={() => {}} />

        <div className="max-w-7xl pt-18 mx-auto px-4 sm:px-6 lg:px-8 py-8 justify-center">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              خوش آمدید
            </h1>
            <p className="text-slate-300 text-lg">نوبت‌های خود را مدیریت کنید </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex  gap-2 mb-8 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/10 w-fit">
            {[
              { id: 'overview', label: 'نمای کلی', icon: BarChart3 },
              { id: 'booking', label: 'رزرو نوبت', icon: Calendar },
              { id: 'appointments', label: 'نوبت‌ها', icon: Clock },
              { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <DashboardStats />
              <QuickActions />
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">آخرین نوبت‌ها</h2>
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map(appointment => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <p className="text-white font-medium">{appointment.service}</p>
                          <p className="text-slate-300 text-sm">{appointment.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs ${
                          appointment.status === 'confirmed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {appointment.status === 'confirmed' ? 'تأیید شده' : 'در انتظار'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">سرویس‌های محبوب</h2>
                  <div className="space-y-4">
                    {favorites.slice(0, 3).map(favorite => (
                      <div key={favorite.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <p className="text-white font-medium">{favorite.service}</p>
                        </div>
                        <button className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-lg text-sm hover:bg-pink-500/30 transition-colors">
                          رزرو
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'booking' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">رزرو نوبت</h2>
                <p className="text-slate-300 text-lg">یک سرویس را انتخاب کنید و زمان‌های موجود را مشاهده کنید</p>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 text-center">انتخاب سرویس</h3>
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                  {SERVICES.map((service) => {
                    const isSelected = selectedService === service.key;
                    return (
                      <button
                        key={service.key}
                        onClick={() => setSelectedService(service.key)}
                        className={`group relative p-2 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/50 shadow-lg shadow-pink-500/15'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          
                          <span className={`font-medium transition-colors duration-300 ${
                            isSelected ? 'text-pink-300' : 'text-slate-300 group-hover:text-white'
                          }`}>
                            {service.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="flex items-center justify-center mb-8">
                  <Clock className="w-6 h-6 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-semibold text-white">
                    زمان‌های موجود برای {selectedServiceData?.label}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {TIMES.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => {
                        if (slot.available) setSelectedTime(slot.time as any);
                      }}
                      disabled={!slot.available}
                      className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                        slot.available
                          ? selectedTime === slot.time
                            ? 'backdrop-blur-2xl border-pink-500 text-white shadow-lg shadow-pink-500/25'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-105'
                          : 'bg-white/5 border-white/10 text-slate-500 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-semibold">{slot.time}</div>
                        <div className="text-sm opacity-75 mt-1">
                          {slot.available ? '' : 'رزرو شده'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedTime && (
                  <div className="mt-8 text-center">
                    <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105">
                      تأیید رزرو برای ساعت {selectedTime}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">نوبت‌های من</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                    <Filter className="w-4 h-4 inline mr-2" />
                    فیلتر
                  </button>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    خروجی
                  </button>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={{
                      ...appointment,
                      status: appointment.status as AppointmentStatus,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">علاقه‌مندی‌های من</h2>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  <Heart className="w-4 h-4 inline mr-2" />
                  پاک کردن همه
                </button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favorites.map((favorite) => (
                  <FavoriteCard key={favorite.id} favorite={favorite} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}