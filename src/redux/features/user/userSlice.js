export function userReducer(state = null, action) {
  switch(action.type) {
    case "user/loggedIn": {
      const { username, fullName, email, photoURL, uid, following } = action.payload;
      return {
        username,
        fullName,
        email,
        photoURL,
        uid,
        following
      }
    }
    case "user/modifyInfo": {
      return {
        ...state,
        ...action.payload
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

export function modifyInfo(payload) {
  return {
    type: "user/modifyInfo",
    payload
  }
}

// Selectors
export const selectUser = (state) => state.user;