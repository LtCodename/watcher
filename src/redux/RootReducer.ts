import { combineReducers } from 'redux';
import DirectorsReducer from "./DirectorsReducer";
import MoviesReducer from "./MoviesReducer";
import AddPanelReducer from "./AddPanelReducer";
import SelectedDirectorReducer from "./SelectedDirectorReducer";

const RootReducer = combineReducers({
    directors: DirectorsReducer.reducer,
    movies: MoviesReducer.reducer,
    addPanelState: AddPanelReducer.reducer,
    selectedDirector: SelectedDirectorReducer.reducer
});

export default RootReducer;
