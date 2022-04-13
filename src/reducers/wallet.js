// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CREATE_WALLET_DATA, DELETE_WALLET_DATA,
  EDIT_WALLET_DATA, THUNK_FETCH, RETURN_DATA,
  ERROR_FETCH,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_WALLET_DATA:
    return ({
      ...state,
      expenses: state.expenses.concat(action.payload),
    });
  case DELETE_WALLET_DATA:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.payload),
    });
  case EDIT_WALLET_DATA:
    return state;
  case THUNK_FETCH:
    return { ...state, isLoading: true };
  case RETURN_DATA:
    return { ...state,
      isLoading: false,
      currencies: action.payload,
    };
  case ERROR_FETCH:
    return { ...state,
      error: action.payload,
      isLoading: false };
  default:
    return state;
  }
};

export default wallet;
