import { legacy_createStore as createStore, combineReducers, Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { applyMiddleware } from "redux";// 中间件
import reduxThunk from "redux-thunk";// 异步必须
import reduxPromise  from "redux-promise";
import menu from "./modules/menu/reducer";
import tabs from "./modules/tabs/reducer";

// 创建reducer(这里做一次合并reducer)
const reducer = combineReducers({
    menu,
    tabs
});

// redux 持久化配置
const persistConfig = {
    key: "redux-state",
    storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeENhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeENhancers(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export {
    store,
    persistor
};