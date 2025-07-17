"use client";
import React, { useState } from "react";
import { Clock } from "lucide-react";

const SERVICES = [
  { key: "consult", label: "مشاوره" },
  { key: "botox", label: "بوتاکس" },
  { key: "filler", label: "فیلر" },
  { key: "hifu", label: "هایفو" },
];

const TIMES = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: false },
  { time: "17:00", available: true },
];

const BookingTab: React.FC = () => {
  const [selectedService, setSelectedService] = useState("consult");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedServiceData = SERVICES.find((s) => s.key === selectedService);

  return (
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
                    ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/50 shadow-lg shadow-pink-500/15"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      isSelected ? "text-pink-300" : "text-slate-300 group-hover:text-white"
                    }`}
                  >
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
                    ? "backdrop-blur-2xl border-pink-500 text-white shadow-lg shadow-pink-500/25"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-105"
                  : "bg-white/5 border-white/10 text-slate-500 cursor-not-allowed opacity-50"
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold">{slot.time}</div>
                <div className="text-sm opacity-75 mt-1">{slot.available ? "" : "رزرو شده"}</div>
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
  );
};

export default BookingTab;
