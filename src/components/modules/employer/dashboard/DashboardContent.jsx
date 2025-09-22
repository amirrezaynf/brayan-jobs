import React from 'react';
import DashboardWelcome from './DashboardWelcome';
import DashboardStats from './DashboardStats';
import RecentTransactions from './RecentTransactions';
import RecentJobs from './RecentJobs';
import CompanyInfo from './CompanyInfo';

const DashboardContent = ({ companyData }) => {
  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-0">
      {/* Welcome Section */}
      <DashboardWelcome companyName={companyData.companyName} />

      {/* Quick Stats */}
      <DashboardStats />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Recent Jobs */}
        <RecentJobs />
      </div>

      {/* Company Info */}
      <CompanyInfo />
    </div>
  );
};

export default DashboardContent;
