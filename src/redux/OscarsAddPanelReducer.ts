const initState: boolean = false;

const OSCARS_PANEL_CHANGE = 'OSCARS_PANEL_CHANGE';

const OscarsAddPanelReducer = (state = initState, action: { type: any; newState: boolean; }) => {
    switch (action.type) {
        case OSCARS_PANEL_CHANGE:
            return action.newState;
        default:
            return state;
    }
};

export default {reducer: OscarsAddPanelReducer, actions: {OSCARS_PANEL_CHANGE}};
