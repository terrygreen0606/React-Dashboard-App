import React, { Component } from 'react';

class AccountingDashboard extends Component {
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (
      <div className="animated fadeIn">
        Welcome To Accounting Dashboard
      </div>
    );
  }
}

export default AccountingDashboard;
