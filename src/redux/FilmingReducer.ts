const initState: any[] = [];

const FILMING_FETCH = 'FILMING_FETCH';

const FilmingReducer = (state = initState, action: { type: any; snapshot: any[]; }) => {
    const copy: any[] = [];
    switch (action.type) {
        case FILMING_FETCH:
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

export default {reducer: FilmingReducer, actions: {FILMING_FETCH}};
