import app from './slices/app-slice';
import transaction from './slices/transaction-slice';

const rootReducer = {
  app,
  transaction
};

export default rootReducer;
