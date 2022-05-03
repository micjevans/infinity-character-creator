import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import characterReducer from "../redux/reducers/character";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer
} from 'redux-persist';

const persistConfig = {
  key: 'character',
  storage: storage,
};

const reducers = combineReducers({
  character: characterReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
