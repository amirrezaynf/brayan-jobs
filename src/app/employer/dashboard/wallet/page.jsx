"use client";

import React, { useState } from "react";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const transactions = [
    {
      id: "TXN001",
      date: "۱۴۰۳/۰۶/۲۱",
      desc: "افزایش موجودی از طریق کارت بانکی",
      amount: "+۵۰۰,۰۰۰ تومان",
      status: "موفق",
      type: "deposit",
    },
    {
      id: "TXN002",
      date: "۱۴۰۳/۰۶/۲۰",
      desc: "ارتقاء آگهی 'توسعه‌دهنده React'",
      amount: "-۵۰,۰۰۰ تومان",
      status: "موفق",
      type: "expense",
    },
    {
      id: "TXN003",
      date: "۱۴۰۳/۰۶/۱۸",
      desc: "خرید بسته ویژه استخدام",
      amount: "-۱۵۰,۰۰۰ تومان",
      status: "موفق",
      type: "expense",
    },
    {
      id: "TXN004",
      date: "۱۴۰۳/۰۶/۱۵",
      desc: "افزایش موجودی از طریق درگاه پرداخت",
      amount: "+۲۰۰,۰۰۰ تومان",
      status: "ناموفق",
      type: "deposit",
    },
    {
      id: "TXN005",
      date: "۱۴۰۳/۰۶/۱۴",
      desc: "بازگشت وجه آگهی منقضی",
      amount: "+۲۵,۰۰۰ تومان",
      status: "موفق",
      type: "refund",
    },
  ];

  const packages = [
    {
      name: "بسته استارت",
      price: "۱۰۰,۰۰۰ تومان",
      features: ["۵ آگهی استخدام", "۳۰ روز اعتبار", "پشتیبانی عادی"],
      popular: false,
    },
    {
      name: "بسته حرفه‌ای",
      price: "۲۵۰,۰۰۰ تومان",
      features: [
        "۱۵ آگهی استخدام",
        "۹۰ روز اعتبار",
        "پشتیبانی اولویت‌دار",
        "آمار پیشرفته",
      ],
      popular: true,
    },
    {
      name: "بسته سازمانی",
      price: "۵۰۰,۰۰۰ تومان",
      features: [
        "۵۰ آگهی استخدام",
        "۱۸۰ روز اعتبار",
        "پشتیبانی ویژه",
        "مشاوره اختصاصی",
      ],
      popular: false,
    },
  ];

  const paymentMethods = [
    { name: "کارت بانکی", icon: "💳", available: true },
    { name: "درگاه پرداخت", icon: "🏦", available: true },
    { name: "کیف پول الکترونیک", icon: "📱", available: false },
    { name: "انتقال بانکی", icon: "🏪", available: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">کیف پول و امور مالی</h1>
        <div className="flex space-x-4 space-x-reverse">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            نمای کلی
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "packages"
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            بسته‌ها
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "transactions"
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            تراکنش‌ها
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-tr from-yellow-500/20 to-gray-900 rounded-xl p-8 border border-yellow-400/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  موجودی فعلی
                </h3>
                <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-yellow-400 mb-2">
                ۲,۵۰۰,۰۰۰ تومان
              </p>
              <p className="text-sm text-gray-400">موجودی قابل استفاده</p>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl p-8 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  هزینه‌های ماه جاری
                </h3>
                <div className="text-red-400 bg-red-400/10 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-red-400 mb-2">
                ۳۲۰,۰۰۰ تومان
              </p>
              <p className="text-sm text-gray-400">+۱۵% نسبت به ماه گذشته</p>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl p-8 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  میانگین هزینه روزانه
                </h3>
                <div className="text-blue-400 bg-blue-400/10 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-400 mb-2">
                ۱۰,۶۶۷ تومان
              </p>
              <p className="text-sm text-gray-400">بر اساس ۳۰ روز گذشته</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">
                افزایش موجودی
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[100000, 200000, 500000, 1000000].map((amount) => (
                    <button
                      key={amount}
                      className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      {amount.toLocaleString()} تومان
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="مبلغ دلخواه"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                />
                <button className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors">
                  پرداخت و افزایش موجودی
                </button>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">
                روش‌های پرداخت
              </h3>
              <div className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl ml-3">{method.icon}</span>
                      <span className="text-white">{method.name}</span>
                    </div>
                    <span
                      className={`text-sm ${
                        method.available ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {method.available ? "فعال" : "غیرفعال"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "packages" && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              بسته‌های خدماتی
            </h2>
            <p className="text-gray-400">
              انتخاب بسته مناسب برای نیازهای استخدامی سازمان شما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-[#1e1e1e] rounded-xl p-8 border transition-all duration-200 ${
                  pkg.popular
                    ? "border-yellow-400 shadow-lg shadow-yellow-400/10"
                    : "border-gray-800"
                }`}
              >
                {pkg.popular && (
                  <div className="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    محبوب‌ترین
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-3xl font-bold text-yellow-400 mb-6">
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 text-green-400 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${
                    pkg.popular
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  خرید بسته
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">تاریخچه تراکنش‌ها</h2>
            <div className="flex space-x-4 space-x-reverse">
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
                <option>همه تراکنش‌ها</option>
                <option>واریزی‌ها</option>
                <option>برداشت‌ها</option>
                <option>بازگشت وجه</option>
              </select>
              <input
                type="date"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>

          <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-800">
                <tr className="text-gray-400 text-sm">
                  <th className="p-4">شناسه تراکنش</th>
                  <th className="p-4">تاریخ</th>
                  <th className="p-4">توضیحات</th>
                  <th className="p-4">مبلغ</th>
                  <th className="p-4">وضعیت</th>
                  <th className="p-4">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <td className="p-4 text-gray-300 font-mono text-sm">
                      {t.id}
                    </td>
                    <td className="p-4 text-white">{t.date}</td>
                    <td className="p-4 text-gray-300">{t.desc}</td>
                    <td
                      className={`p-4 font-semibold ${
                        t.amount.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {t.amount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          t.status === "موفق"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                        مشاهده جزئیات
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transaction Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-2xl font-bold text-green-400 mb-2">
                ۱,۲۰۰,۰۰۰
              </p>
              <p className="text-sm text-gray-400">کل واریزی‌ها</p>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-2xl font-bold text-red-400 mb-2">۵۲۰,۰۰۰</p>
              <p className="text-sm text-gray-400">کل برداشت‌ها</p>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-2xl font-bold text-blue-400 mb-2">۲۵,۰۰۰</p>
              <p className="text-sm text-gray-400">بازگشت وجه</p>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-2xl font-bold text-yellow-400 mb-2">
                ۲,۵۰۰,۰۰۰
              </p>
              <p className="text-sm text-gray-400">موجودی فعلی</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
