import React, { Component } from 'react';

class Admindashboard extends Component {
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (
      <div className="animated fadeIn">
        Welcome To Admin Dashboard
      </div>
    );
  }
}

export default Admindashboard;
