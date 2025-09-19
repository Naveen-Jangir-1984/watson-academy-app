const eventsReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_EVENT":
      return {
        ...state,
        selectedEvent: state.events.find((event) => event.id === action.id),
      };
    case "ADD_EVENT":
      return {
        ...state,
        events: [action.event, ...state.events],
        banner: {
          isDisplayed: true,
          message: "Event Added !",
          position: "center",
        },
      };
    case "UPDATE_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.id),
        banner: {
          isDisplayed: true,
          message: "Event Deleted !",
          position: "center",
        },
      };
    case "CLOSE_EVENT":
      return {
        ...state,
        selectedEvent: "",
      };
    default:
      return state;
  }
};

export default eventsReducer;
