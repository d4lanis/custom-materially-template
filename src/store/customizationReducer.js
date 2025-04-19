// action - state management
import * as actionTypes from './actions';

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const initialState = {
  isOpen: 'dashboard', //for active default menu
  navType: '',
  sidebarCollapsed: false // for tracking sidebar collapsed state
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case actionTypes.MENU_TYPE:
      return {
        ...state,
        navType: action.navType
      };
    case actionTypes.SIDEBAR_COLLAPSED:
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed
      };
    default:
      return state;
  }
};

export default customizationReducer;
