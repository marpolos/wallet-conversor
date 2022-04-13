// Coloque aqui suas actions
import { USER_INFO, CREATE_WALLET_DATA, DELETE_WALLET_DATA,
  EDIT_WALLET_DATA, THUNK_FETCH, ERROR_FETCH,
  RETURN_DATA } from './actionsTypes';

export const user = (email) => ({
  type: USER_INFO,
  payload: email,
});

export const createWalletData = (expense) => ({
  type: CREATE_WALLET_DATA,
  payload: expense,
});

export const deleteWalletData = (expense) => ({
  type: DELETE_WALLET_DATA,
  payload: expense,
});

export const editWalletData = (state) => ({
  type: EDIT_WALLET_DATA,
  payload: state,
});

export const thunkFetch = () => ({
  type: THUNK_FETCH,
});

export const errorFetch = (error) => ({
  type: ERROR_FETCH,
  payload: error.message,
});

export const returnData = (coins) => ({
  type: RETURN_DATA,
  payload: coins,
});

export async function getCoins() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(endpoint);
  const data = await request.json();
  return data;
}

const thunkCoins = () => async (dispatch) => {
  dispatch(thunkFetch());
  try {
    const currencies = await getCoins();
    dispatch(returnData(currencies));
  } catch (error) {
    dispatch(errorFetch(error.message));
  }
};

export { thunkCoins };
