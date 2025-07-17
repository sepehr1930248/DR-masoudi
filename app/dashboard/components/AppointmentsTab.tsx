"use client";
import React from "react";
import { Download, Filter } from "lucide-react";
import { Appointment, AppointmentStatus } from "./OverviewTab";

const MOCK_APPOINTMENTS: (Appointment & { id: number })[] = [
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
    status: "done",
    doctor: "دکتر حسینی",
  },
];

interface AppointmentCardProps {
  appointment: Appointment & { id: number };
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
        {appointment.status === "confirmed" ? "تأیید شده" : appointment.status === "pending" ? "در انتظار" : "انجام شده"}
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
  </div>
);

const AppointmentsTab: React.FC = () => {
  const appointments = MOCK_APPOINTMENTS;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">نوبت‌های من</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            <Filter className="w-4 h-4 inline mr-2" /> فیلتر
          </button>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4 inline mr-2" /> خروجی
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
  );
};

export default AppointmentsTab;
