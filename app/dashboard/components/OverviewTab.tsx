"use client";
import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Heart,
  Search,
  Plus,
  BarChart3,
  Settings,
  Eye,
  Download,
} from "lucide-react";

// Mock data – in real app these would come from API / context
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    service: "بوتاکس",
    date: "2024-07-20",
    time: "10:00",
    status: "confirmed",
    doctor: "دکتر احمدی",
  },
  {
    id: 2,
    service: "مشاوره",
    date: "2024-07-25",
    time: "14:00",
    status: "pending",
    doctor: "دکتر محمدی",
  },
  {
    id: 3,
    service: "فیلر",
    date: "2024-07-18",
    time: "16:00",
    status: "completed",
    doctor: "دکتر حسینی",
  },
];

const MOCK_FAVORITES = [
  { id: 1, service: "لیزر موی زائد", category: "لیزر" },
  { id: 2, service: "جوانسازی پوست", category: "جوانسازی" },
  { id: 3, service: "میکرونیدلینگ", category: "درمان" },
];

export type AppointmentStatus = "confirmed" | "pending" | "done";

export interface Appointment {
  service: string;
  doctor: string;
  status: AppointmentStatus;
  date: string;
  time: string;
}

interface AppointmentCardProps {
  appointment: Appointment & { id?: number };
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-white font-semibold text-lg">{appointment.service}</h3>
        <p className="text-slate-300 text-sm">دکتر: {appointment.doctor}</p>
      </div>
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          appointment.status === "confirmed"
            ? "bg-green-500/20 text-green-300 border border-green-500/30"
            : appointment.status === "pending"
            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
            : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
        }`}
      >
        {appointment.status === "confirmed"
          ? "تأیید شده"
          : appointment.status === "pending"
          ? "در انتظار"
          : "انجام شده"}
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
          <Eye className="w-4 h-4 inline mr-1" /> جزئیات
        </button>
        {appointment.status === "confirmed" && (
          <button className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg text-pink-300 text-sm transition-colors">
            <Download className="w-4 h-4 inline mr-1" /> دانلود
          </button>
        )}
      </div>
    </div>
  </div>
);

const FavoriteCard = ({
  favorite,
}: {
  favorite: { service: string; category: string; id?: number };
}) => (
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

const DashboardStats: React.FC<{ appointments: typeof MOCK_APPOINTMENTS; favorites: typeof MOCK_FAVORITES }> = ({ appointments, favorites }) => (
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
        {appointments.filter((a) => a.status === "confirmed").length} تأیید شده
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white">
          {appointments.filter((a) => a.status === "confirmed").length}
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

const QuickActions: React.FC = () => (
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

const OverviewTab: React.FC = () => {
  const [appointments] = useState(MOCK_APPOINTMENTS);
  const [favorites] = useState(MOCK_FAVORITES);

  return (
    <div className="space-y-8">
      <DashboardStats appointments={appointments} favorites={favorites} />
      <QuickActions />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">آخرین نوبت‌ها</h2>
          <div className="space-y-4">
            {appointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div>
                  <p className="text-white font-medium">{appointment.service}</p>
                  <p className="text-slate-300 text-sm">{appointment.date}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs ${
                    appointment.status === "confirmed"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {appointment.status === "confirmed" ? "تأیید شده" : "در انتظار"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">سرویس‌های محبوب</h2>
          <div className="space-y-4">
            {favorites.slice(0, 3).map((favorite) => (
              <div
                key={favorite.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
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
  );
};

export default OverviewTab;
