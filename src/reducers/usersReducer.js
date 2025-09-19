const usersReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.user],
        banner: {
          isDisplayed: true,
          message: "User Added !",
          position: "center",
        },
      };
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
        banner: {
          isDisplayed: true,
          message: "User Deleted !",
          position: "center",
        },
      };
    default:
      return state;
  }
};

export default usersReducer;
