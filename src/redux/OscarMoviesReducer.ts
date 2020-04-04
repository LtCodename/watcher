const initState: any[] = [];

const OSCAR_MOVIES_FETCH = 'OSCAR_MOVIES_FETCH';

const OscarMoviesReducer = (state = initState, action: { type: any; snapshot: any[]; }) => {
    const copy: any[] = [];
    switch (action.type) {
        case OSCAR_MOVIES_FETCH:
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

export default {reducer: OscarMoviesReducer, actions: {OSCAR_MOVIES_FETCH}};
