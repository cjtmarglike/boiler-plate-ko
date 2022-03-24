import { combineReducers } from "redux";
import user from './user_reducer';

//combineReducers를 이용하여 기능에 따른 여러 reducer들을 rootReducer로 묶음
const rootReducer = combineReducers({
    user
})

export default rootReducer;