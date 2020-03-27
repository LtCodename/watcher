const initState: any[] = [];

const THEATERS_FETCH = 'THEATERS_FETCH';

const TheatersReducer = (state = initState, action: { type: any; snapshot: any[]; }) => {
    const copy: any[] = [];
    switch (action.type) {
        case THEATERS_FETCH:
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

export default {reducer: TheatersReducer, actions: {THEATERS_FETCH}};
