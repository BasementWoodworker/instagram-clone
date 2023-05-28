export function userReducer(state = null, action) {
  switch(action.type) {
    case "user/setUser": {
      const { displayName, email, photoURL, uid } = action.payload;
      return {
        name: displayName,
        email,
        photoURL,
        id: uid
      }
    }
    case "user/loggedOut": {
      return null;
    }
    default: return state;
  }
}

// Action creators
export function setUser(user) {
  return {
    type: "user/setUser",
    payload: user
  }
}

export const loggedOut = { type: "user/loggedOut" };

// Selectors
export const selectUser = (state) => state.user;