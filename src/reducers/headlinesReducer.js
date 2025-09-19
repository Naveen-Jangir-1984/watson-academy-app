const headlinesReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_HEADLINE":
      return {
        ...state,
        selectedHeadline: state.headlines.find((headline) => headline.id === action.id),
      };
    case "ADD_HEADLINE":
      return {
        ...state,
        headlines: [action.headline, ...state.headlines],
        banner: {
          isDisplayed: true,
          message: "News Added !",
          position: "center",
        },
      };
    case "UPDATE_HEADLINES":
      return {
        ...state,
        headlines: action.headlines,
      };
    case "DELETE_HEADLINE":
      return {
        ...state,
        headlines: state.headlines.filter((headline) => headline.id !== action.id),
        banner: {
          isDisplayed: true,
          message: "News Deleted !",
          position: "center",
        },
      };
    case "CLOSE_HEADLINE":
      return {
        ...state,
        selectedHeadline: "",
      };
    default:
      return state;
  }
};

export default headlinesReducer;
