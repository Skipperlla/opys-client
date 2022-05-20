import AuthReducer from "./AuthReducer";
import GroupReducer from "./GroupReducer";
import PostReducer from "./PostReducer";
import QuestionReducer from "./QuestionReducer";
import SubTaskReducer from "./SubTaskReducer";
import TaskReducer from "./TaskReducer";
import UserReducer from "./UserReducer";

export default {
  auth: AuthReducer,
  group: GroupReducer,
  post: PostReducer,
  question: QuestionReducer,
  subtask: SubTaskReducer,
  task: TaskReducer,
  user: UserReducer,
};
