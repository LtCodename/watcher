import { combineReducers } from 'redux';
import DirectorsReducer from "./DirectorsReducer";
import MoviesReducer from "./MoviesReducer";

const RootReducer = combineReducers({
    directors: DirectorsReducer.reducer,
    movies: MoviesReducer.reducer
});

export default RootReducer;
