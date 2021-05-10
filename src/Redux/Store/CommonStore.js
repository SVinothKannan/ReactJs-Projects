import Get_All_User_Details_Reducer from '../Reducers/Users_Reducer';
import * as redux from 'redux';
const rootReducer = redux.combineReducers({
    Users:Get_All_User_Details_Reducer
  }
);

export default rootReducer;