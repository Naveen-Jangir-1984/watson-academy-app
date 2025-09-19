const mediaReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_POSTER":
      return {
        ...state,
        posters: {
          isDisplayed: true,
          images: action.images,
        },
      };
    case "UPDATE_POSTERS":
      return {
        ...state,
        posters: {
          ...state.posters,
          images: action.posters.map((item) => ({ ...item, logo: `${process.env.REACT_APP_API_URI}:${process.env.REACT_APP_API_PORT}${item.logo}`, isSelected: false })),
        },
      };
    case "DELETE_POSTER":
      return {
        ...state,
        posters: {
          ...state.posters,
          images: state.posters.images.filter((image) => image.id !== action.id),
        },
        banner: {
          isDisplayed: true,
          message: "Poster Deleted !",
          position: "center",
        },
      };
    case "CLOSE_POSTER":
      return {
        ...state,
        posters: {
          ...state.posters,
          isDisplayed: false,
        },
      };
    case "UPDATE_VIDEO":
      return {
        ...state,
        videos: action.videos,
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        videos: {
          ...state.videos,
          clips: state.videos.clips.filter((clip) => clip.id !== action.id),
        },
        banner: {
          isDisplayed: true,
          message: "Video Deleted !",
          position: "center",
        },
      };
    case "UPDATE_PHOTOS":
      return {
        ...state,
        photos: {
          ...state.photos,
          images: action.photos.map((item) => ({ ...item, logo: `${process.env.REACT_APP_API_URI}:${process.env.REACT_APP_API_PORT}${item.logo}`, isSelected: false })),
        },
      };
    default:
      return state;
  }
};

export default mediaReducer;
