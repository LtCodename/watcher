const initState: string = '';

const DIRECTOR_SET = 'DIRECTOR_SET';

const SelectedDirectorReducer = (state = initState, action: { type: any; selectedDirector: string; }) => {
    switch (action.type) {
        case DIRECTOR_SET:
            return action.selectedDirector;
        default:
            return state;
    }
};

export default {reducer: SelectedDirectorReducer, actions: {DIRECTOR_SET}};
