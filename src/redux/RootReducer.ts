import { combineReducers } from 'redux';
import DirectorsReducer from "./DirectorsReducer";
import MoviesReducer from "./MoviesReducer";
import AddPanelReducer from "./AddPanelReducer";
import FilmingReducer from "./FilmingReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
    directors: DirectorsReducer.reducer,
    movies: MoviesReducer.reducer,
    addPanelState: AddPanelReducer.reducer,
    filming: FilmingReducer.reducer,
    user: UserReducer.reducer
});

export default RootReducer;
