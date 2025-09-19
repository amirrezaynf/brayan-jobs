"use client";

import React from "react";
import {
  X,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Trash2,
  CheckCheck,
} from "lucide-react";

export default function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // نوتیفیکیشن‌های نمونه
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "پروژه جدید",
      message: "پروژه توسعه وب‌سایت فروشگاهی برای شما ارسال شد",
      time: "۵ دقیقه پیش",
      isRead: false,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      id: 2,
      type: "info",
      title: "پیام جدید",
      message: "کارفرما پاسخی به پیشنهاد شما ارسال کرده است",
      time: "۱۵ دقیقه پیش",
      isRead: false,
      icon: Info,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      id: 3,
      type: "warning",
      title: "یادآوری",
      message: "مهلت ارسال پروژه «طراحی لوگو» تا ۲ روز دیگر باقی مانده",
      time: "۱ ساعت پیش",
      isRead: true,
      icon: AlertCircle,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      id: 4,
      type: "info",
      title: "پروفایل بازدید شد",
      message: "پروفایل شما توسط ۳ کارفرما جدید بازدید شده است",
      time: "۲ ساعت پیش",
      isRead: true,
      icon: Info,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      id: 5,
      type: "success",
      title: "پرداخت موفق",
      message: "مبلغ ۲,۵۰۰,۰۰۰ تومان به حساب شما واریز شد",
      time: "۱ روز پیش",
      isRead: true,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    // اینجا می‌توانید API call برای mark all as read اضافه کنید
    console.log("Mark all as read");
  };

  const handleMarkAsRead = (id) => {
    // اینجا می‌توانید API call برای mark as read اضافه کنید
    console.log("Mark as read:", id);
  };

  const handleDeleteNotification = (id) => {
    // اینجا می‌توانید API call برای حذف نوتیفیکیشن اضافه کنید
    console.log("Delete notification:", id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">اعلان‌ها</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="p-4 border-b border-gray-700/50">
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              همه را خوانده شده علامت بزن
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-96">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">هیچ اعلانی وجود ندارد</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700/50">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`group p-4 hover:bg-gray-800/30 transition-colors cursor-pointer ${
                      !notification.isRead ? "bg-gray-800/20" : ""
                    }`}
                    onClick={() =>
                      !notification.isRead && handleMarkAsRead(notification.id)
                    }
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}
                      >
                        <IconComponent
                          className={`w-4 h-4 ${notification.color}`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className={`text-sm font-medium ${
                              !notification.isRead
                                ? "text-white"
                                : "text-gray-300"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notification.id);
                            }}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <button className="w-full text-center text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
            مشاهده همه اعلان‌ها
          </button>
        </div>
      </div>
    </div>
  );
}
