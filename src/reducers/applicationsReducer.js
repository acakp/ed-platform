export const initialState = {
  items: [],
  formValues: {
    name: '',
    phone: '',
    telegram: '',
    service: '',
  },
  errors: {},
};

export const ACTION_TYPES = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_ERRORS: 'SET_ERRORS',
  ADD_APPLICATION: 'ADD_APPLICATION',
  REMOVE_APPLICATION: 'REMOVE_APPLICATION',
  CLEAR_APPLICATIONS: 'CLEAR_APPLICATIONS',
};

export function applicationsReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_FIELD:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };
    case ACTION_TYPES.SET_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case ACTION_TYPES.ADD_APPLICATION:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            ...action.payload,
          },
        ],
        formValues: initialState.formValues,
        errors: {},
      };
    case ACTION_TYPES.REMOVE_APPLICATION:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case ACTION_TYPES.CLEAR_APPLICATIONS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}
