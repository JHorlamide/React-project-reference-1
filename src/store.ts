import {
  configureStore,
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
  combineReducers,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import authReducer, { logoutUser } from "./redux/authSlice";
import walletReducer from "./redux/walletSlice";
import { taxitPayApi } from "./redux/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import toast from "react-hot-toast";
import capitalize from "./helpers/capitalize";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.data?.message.toLowerCase() === "jwt expired") {
      api.dispatch(logoutUser());
      return;
    } else if (action?.payload.status === 500) {
      toast.error("Something went wrong");
    } else if (action?.payload?.status === 401) {
      api.dispatch(logoutUser());
      return;
    } else if (action?.payload?.status === 404) {
      if (
        typeof window !== undefined &&
        (sessionStorage.getItem("taxitPayToken") || localStorage.getItem("taxitPayToken"))
      ) {
        window.location.replace("/wallet");
      } else {
        window.location.replace("/");
      }
    } else {
      toast.error(capitalize(action?.payload?.data?.message as string) ?? "Something went wrong");
    }
  }

  return next(action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [taxitPayApi.reducerPath, "wallet"],
  whitelist: ["auth"],
};

const appReducer = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
  [taxitPayApi.reducerPath]: taxitPayApi.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logoutUser") {
    if (typeof window !== undefined) {
      localStorage.removeItem("taxitPayToken");
      sessionStorage.removeItem("taxitPayToken");
      // localStorage.removeItem("persist:root");
    }
    taxitPayApi.util.resetApiState();
    window.location.replace("/");

    state = {} as RootState;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(taxitPayApi.middleware)
      .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
