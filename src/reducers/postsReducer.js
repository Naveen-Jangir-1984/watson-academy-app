const postsReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_POST":
      return {
        ...state,
        selectedPost: state.posts.find((post) => post.id === action.id),
      };
    case "CLOSE_POST":
      return {
        ...state,
        selectedPost: "",
      };
    case "ADD_FEEDBACK":
      return {
        ...state,
        posts: [action.feedback, ...state.posts],
        banner: {
          isDisplayed: true,
          message: "Feedback Recorded !",
          position: "center",
        },
      };
    case "UPDATE_FEEDBACKS":
      return {
        ...state,
        posts: action.posts,
      };
    case "DELETE_FEEDBACK":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
        banner: {
          isDisplayed: true,
          message: "Feedback Deleted !",
          position: "center",
        },
      };
    default:
      return state;
  }
};

export default postsReducer;
