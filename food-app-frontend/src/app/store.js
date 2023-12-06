import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import productReducer from "../features/product/productSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer, productReducer)
// const persistedReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  reducer: {
    auth : persistedReducer,
    product : persistedReducer,
    middleware: [thunk]
  },
});

export const persistor = persistStore(store)