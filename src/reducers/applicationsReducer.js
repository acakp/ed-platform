const STORAGE_KEY = 'ed-platform-applications';

const getSavedApplications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading applications from localStorage', error);
    return [];
  }
};

export const initialState = {
  items: getSavedApplications(),
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
  let nextItems;
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
      nextItems = [
        ...state.items,
        {
          id: Date.now(),
          ...action.payload,
        },
      ];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      } catch (err) {
        console.error('Error saving to localStorage', err);
      }
      return {
        ...state,
        items: nextItems,
        formValues: initialState.formValues,
        errors: {},
      };
    case ACTION_TYPES.REMOVE_APPLICATION:
      nextItems = state.items.filter((item) => item.id !== action.payload);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      } catch (err) {
        console.error('Error saving to localStorage', err);
      }
      return {
        ...state,
        items: nextItems,
      };
    case ACTION_TYPES.CLEAR_APPLICATIONS:
      nextItems = [];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      } catch (err) {
        console.error('Error saving to localStorage', err);
      }
      return {
        ...state,
        items: nextItems,
      };
    default:
      return state;
  }
}
