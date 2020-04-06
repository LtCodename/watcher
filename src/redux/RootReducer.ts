import { combineReducers } from 'redux';
import DirectorsReducer from "./DirectorsReducer";
import MoviesReducer from "./MoviesReducer";
import AddPanelReducer from "./AddPanelReducer";
import FilmingReducer from "./FilmingReducer";
import UserReducer from "./UserReducer";
import TheatersReducer from "./TheatersReducer";
import OscarYearsReducer from "./OscarYearsReducer";
import OscarMoviesReducer from "./OscarMoviesReducer";
import OscarsAddPanelReducer from "./OscarsAddPanelReducer";

const RootReducer = combineReducers({
    directors: DirectorsReducer.reducer,
    movies: MoviesReducer.reducer,
    addPanelState: AddPanelReducer.reducer,
    oscarsAddPanelState: OscarsAddPanelReducer.reducer,
    filming: FilmingReducer.reducer,
    user: UserReducer.reducer,
    theaters: TheatersReducer.reducer,
    oscarYears: OscarYearsReducer.reducer,
    oscarMovies: OscarMoviesReducer.reducer
});

export default RootReducer;
