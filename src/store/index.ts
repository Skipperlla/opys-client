import { combineReducers } from "redux";
import { AuthState } from "types/auth";
import { GroupState } from "types/group";
import { PostState } from "types/post";
import { QuestionState } from "types/question";
import { TaskState } from "types/task";
import { UserState } from "types/user";
import { SubTaskState } from "types/subtask";
import reducers from "./reducers/index";

export interface AppState {
  user: any; // Değişcek
  auth: AuthState;
  task: TaskState;
  group: GroupState;
  post: PostState;
  question: QuestionState;
  subtask: SubTaskState;
}
const rootReducer = combineReducers<AppState>(reducers);
export default rootReducer;
