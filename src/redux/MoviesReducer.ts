const initState: any[] = [];

const MOVIES_FETCH = 'MOVIES_FETCH';

const MoviesReducer = (state = initState, action: { type: any; snapshot: any[]; }) => {
    const copy: any[] = [];
    switch (action.type) {
        case MOVIES_FETCH:
            action.snapshot.forEach(doc => {
                let otherData = doc.data();
                copy.push({
                    id: doc.id,
                    ...otherData
                });
            });
            return copy;
        default:
            return state;
    }
};

export default {reducer: MoviesReducer, actions: {MOVIES_FETCH}};
