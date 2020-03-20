const initState: boolean = false;

const PANEL_CHANGE = 'PANEL_CHANGE';

const AddPanelReducer = (state = initState, action: { type: any; newState: boolean; }) => {
    switch (action.type) {
        case PANEL_CHANGE:
            return action.newState;
        default:
            return state;
    }
};

export default {reducer: AddPanelReducer, actions: {PANEL_CHANGE}};
