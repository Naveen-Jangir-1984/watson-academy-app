const enquiriesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ENQUIRY":
      return {
        ...state,
        enquiries: [action.enquiry, ...state.enquiries],
        banner: {
          isDisplayed: true,
          message: "Enquiry Sent !",
          position: "center",
        },
      };
    case "UPDATE_ENQUIRIES":
      return {
        ...state,
        enquiries: action.enquiries,
      };
    case "DELETE_ENQUIRY":
      return {
        ...state,
        enquiries: state.enquiries.filter((enquiry) => enquiry.id !== action.id),
        banner: {
          isDisplayed: true,
          message: "Enquiry Deleted !",
          position: "center",
        },
      };
    case "RESET_ENQUIRY":
      return {
        ...state,
        enquiries: state.enquiries.map((enquiry) => {
          enquiry.status = "read";
          return enquiry;
        }),
      };
    default:
      return state;
  }
};

export default enquiriesReducer;
