import { SetupType } from "@store/types";
import { QuestionAction, QuestionState } from "types/question";

const defaultState: QuestionState = {
  Questions: [],
  isLoading: false,
  error: "",
  success: "",
  status: null,
};

const QuestionReducer = (state = defaultState, action: QuestionAction) => {
  switch (action.type) {
    case SetupType.GET_QUESTIONS_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Questions: action.payload,
        status: action.status,
      };

    case SetupType.GET_QUESTIONS_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.CREATE_QUESTION_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Questions: [...state.Questions, action.payload],
        status: action.status,
      };

    case SetupType.CREATE_QUESTION_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.CREATE_ANSWER_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.CREATE_ANSWER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Questions: state.Questions.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
      };

    case SetupType.CREATE_ANSWER_RESET:
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

export default QuestionReducer;
