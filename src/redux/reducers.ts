import app from './slices/app-slice';
import auth from './slices/auth-slice';
import transaction from './slices/transaction-slice';

const rootReducer = {
  app,
  auth,
  transaction
};

export default rootReducer;
