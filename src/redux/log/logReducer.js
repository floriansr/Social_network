import { CONNEXION } from "redux/log/logType";

const initialState = {
  log: false,
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNEXION:
      return {
        ...state,
        log: true,
      };
    default:
      return state;
  }
};

export default logReducer;