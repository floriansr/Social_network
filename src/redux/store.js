import { createStore } from "redux";
import logReducer from "redux/log/logReducer";

const store = createStore(logReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;