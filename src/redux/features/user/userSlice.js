export function userReducer(state = null, action) {
  switch(action.type) {
    case "user/loggedIn": {
      const { displayName, email, photoURL } = action.payload;
      return {
        name: displayName,
        email,
        photoURL
      }
    }
    case "user/loggedOut": {
      return null;
    }
    default: return state;
  }
}

// Action creators
export function loggedIn(user) {
  return {
    type: "user/loggedIn",
    payload: user
  }
}

export const loggedOut = { type: "user/loggedOut" };

// Selectors
export const selectUser = (state) => state.user;