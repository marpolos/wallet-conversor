import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import { deleteWalletData } from '../actions/index';

class TableExpenses extends Component {
  handleClick = (expense) => {
    const { deleteExpense } = this.props;
    deleteExpense(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses
          && expenses.map((expense) => {
            const { id, description, tag, method, value,
              exchangeRates, currency } = expense;
            const valueConverted = (+value * +exchangeRates[currency].ask).toFixed(2);
            return (
              <tbody key={ id }>
                <tr>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ (+value).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                  <td>{ (+exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>{ valueConverted }</td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClick(expense) }
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => (dispatch(deleteWalletData(expense))),
});

TableExpenses.propTypes = {
  expenses: shape({}).isRequired,
  deleteExpense: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
