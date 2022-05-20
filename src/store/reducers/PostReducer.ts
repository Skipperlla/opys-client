import { SetupType } from "@store/types";
import { PostAction, PostState } from "types/post";

const defaultState: PostState = {
  Posts: [],
  isLoading: false,
  error: "",
  success: "",
  status: null,
};

const PostReducer = (state = defaultState, action: PostAction) => {
  switch (action.type) {
    case SetupType.GET_POSTS_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Posts: action.payload,
        status: action.status,
      };

    case SetupType.GET_POSTS_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.CREATE_POST_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Posts: [...state.Posts, action.payload],
        status: action.status,
      };

    case SetupType.CREATE_POST_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    default:
      return state;
  }
};

export default PostReducer;
