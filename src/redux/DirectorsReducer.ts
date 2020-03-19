const initState: any[] = [];

const DIRECTORS_FETCH = 'DIRECTORS_FETCH';

const DirectorsReducer = (state = initState, action: { type: any; snapshot: any[]; }) => {
    const copy: any[] = [];
    switch (action.type) {
        case DIRECTORS_FETCH:
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

export default {reducer: DirectorsReducer, actions: {DIRECTORS_FETCH}};
