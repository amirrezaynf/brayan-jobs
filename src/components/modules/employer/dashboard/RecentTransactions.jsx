import React from 'react';

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      type: 'income',
      title: 'شارژ کیف پول',
      time: 'امروز - ۱۴:۳۰',
      amount: '+۵۰۰,۰۰۰ تومان',
      color: 'green'
    },
    {
      id: 2,
      type: 'expense',
      title: 'انتشار آگهی React',
      time: 'دیروز - ۱۰:۱۵',
      amount: '-۱۲۰,۰۰۰ تومان',
      color: 'red'
    },
    {
      id: 3,
      type: 'refund',
      title: 'بازگشت وجه',
      time: '۲ روز پیش - ۱۶:۴۵',
      amount: '+۸۰,۰۰۰ تومان',
      color: 'blue'
    },
    {
      id: 4,
      type: 'expense',
      title: 'ارتقاء آگهی UI/UX',
      time: '۳ روز پیش - ۰۹:۳۰',
      amount: '-۲۰۰,۰۰۰ تومان',
      color: 'red'
    }
  ];

  const getIcon = (type, color) => {
    const iconClass = `w-4 h-4 text-${color}-400`;
    
    if (type === 'income') {
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (type === 'expense') {
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
            transform="rotate(180 10 10)"
          />
        </svg>
      );
    } else {
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          آخرین تراکنش‌ها
        </h3>
        <div className="text-green-400 bg-green-400/10 rounded-full p-2 flex-shrink-0">
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
            <div className="flex items-center">
              <div className={`w-8 h-8 bg-${transaction.color}-400/10 rounded-full flex items-center justify-center ml-3 flex-shrink-0`}>
                {getIcon(transaction.type, transaction.color)}
              </div>
              <div>
                <span className="text-sm sm:text-base text-gray-300 block">
                  {transaction.title}
                </span>
                <span className="text-xs text-gray-500">{transaction.time}</span>
              </div>
            </div>
            <span className={`text-sm font-bold text-${transaction.color}-400 mr-11 sm:mr-0`}>
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
