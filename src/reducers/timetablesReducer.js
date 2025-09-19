const timetablesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMETABLE":
      const hours = `${Number(action.timetable.start) > 12 ? Number(action.timetable.start) - 12 : action.timetable.start}:${action.timetable.startHour} ${Number(action.timetable.start) > 12 ? "PM" : "AM"} - ${Number(action.timetable.end) > 12 ? Number(action.timetable.end) - 12 : action.timetable.end}:${action.timetable.endHour} ${Number(action.timetable.end) > 12 ? "PM" : "AM"}`;
      return {
        ...state,
        timetables: state.timetables.map((timetable) => {
          if (timetable.id === action.timetable.id) {
            timetable.standard = action.timetable.standard;
            timetable.hours = hours;
            timetable.start = action.timetable.start;
            timetable.startHour = action.timetable.startHour;
            timetable.end = action.timetable.end;
            timetable.endHour = action.timetable.endHour;
            timetable.subjects = action.timetable.subjects;
          }
          return timetable;
        }),
        banner: {
          isDisplayed: true,
          message: "TimeTable Updated !",
          position: "center",
        },
      };
    case "ADD_TIMETABLE":
      return {
        ...state,
        timetables: [...state.timetables.slice(0, action.index), action.timetable, ...state.timetables.slice(action.index)],
        banner: {
          isDisplayed: true,
          message: "Timetable Added !",
          position: "center",
        },
      };
    case "DELETE_TIMETABLE":
      return {
        ...state,
        timetables: state.timetables.filter((timetable) => timetable.id !== action.id),
        banner: {
          isDisplayed: true,
          message: "Timetable Deleted !",
          position: "center",
        },
      };
    default:
      return state;
  }
};

export default timetablesReducer;
