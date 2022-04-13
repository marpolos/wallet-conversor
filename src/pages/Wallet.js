import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <div className="header-wallet">
          <h1>TrybeWallet</h1>
        </div>
        <hr />
        <div className="user-infos-sets">
          <Header />
          <Expenses />
        </div>
        <TableExpenses />
      </>
    );
  }
}

export default Wallet;
