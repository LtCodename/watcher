const initState: any[] = [];

const YEARS_FETCH = 'YEARS_FETCH';

const OscarYearsReducer = (state = initState, action: { type: any; snapshot: any[]; }) => {
    const copy: any[] = [];
    switch (action.type) {
        case YEARS_FETCH:
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

export default {reducer: OscarYearsReducer, actions: {YEARS_FETCH}};
