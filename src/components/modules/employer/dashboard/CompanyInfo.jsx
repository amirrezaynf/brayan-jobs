import React from 'react';

const CompanyInfo = () => {
  const companyStats = [
    {
      id: 1,
      value: '۱۲۸',
      label: 'روز عضویت',
      sublabel: 'در سایت',
      color: 'green',
      icon: (
        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      id: 2,
      value: 'تایید شده',
      label: 'وضعیت حساب',
      sublabel: 'فعال',
      color: 'blue',
      icon: (
        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      value: '۳۸۷',
      label: 'رزومه دریافتی',
      sublabel: 'کل زمان',
      color: 'purple',
      icon: (
        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9 2.003V2a1 1 0 00-1.75-.628L6.5 2.122a1 1 0 00-.628.928v.001L6 18a1 1 0 001.75.628L8.5 17.878A1 1 0 009 17V3.003zM11 2.003V2a1 1 0 011.75-.628l.75.75a1 1 0 01.628.928v.001L14 18a1 1 0 01-1.75.628l-.75-.75A1 1 0 0111 17V3.003z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      id: 4,
      value: '۹۲%',
      label: 'تکمیل پروفایل',
      sublabel: 'کامل',
      color: 'indigo',
      icon: (
        <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          اطلاعات شرکت
        </h3>
        <div className="text-blue-400 bg-blue-400/10 rounded-full p-2 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {companyStats.map((stat) => (
          <div key={stat.id} className="text-center p-3 sm:p-4 bg-black/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className={`w-8 h-8 bg-${stat.color}-400/20 rounded-full flex items-center justify-center ml-2`}>
                {stat.icon}
              </div>
              <p className={`text-xl sm:text-2xl font-bold text-${stat.color}-400`}>
                {stat.value}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-xs text-${stat.color}-400`}>{stat.sublabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfo;
