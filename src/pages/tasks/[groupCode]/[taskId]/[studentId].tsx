import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Input,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from "@mui/material";

import withAuth from "@utils/hooks/withAuth";
import {
  StyledDropzone,
  MuiAccordion,
  FileList,
  Modal,
  Progress,
} from "@components/index";
import { useEffect, useState } from "react";
import { roles, status } from "@utils/querys";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/index";
import { StudentTaskAction, TeacherTaskAction } from "@store/actions/task";
import {
  StudentSubTaskAction,
  TeacherSubTaskAction,
} from "@store/actions/subtask";
import { StudentGroupAction, TeacherGroupAction } from "@store/actions/group";
import { useRouter } from "next/router";
import { QuestionAction } from "@store/actions";
import { ITask, IUserProps } from "types/task";
import Link from "next/link";
import api, { getAllTaskLeader } from "@utils/lib/api";
import { Error, Success } from "@utils/lib/messages";
// Modal style
const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
export interface IAddSubTaskDataProps {
  name: string;
  description: string;
  deadline: string;
}
function createData(
  name: string,
  description: string,
  deadline: string,
  fullName: string,
  taskStatus: string,
  subTaskId: string,
  assignTo: any
) {
  return {
    name,
    description,
    deadline,
    fullName,
    taskStatus,
    subTaskId,
    assignTo,
  };
}
const SingleTaskPage = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { groupCode, taskId, studentId } = router?.query;
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const { Group, isLoading: groupIsLoading } = useSelector(
    (state: AppState) => {
      return state.group;
    }
  );
  const { Task, isLoading: taskIsLoading } = useSelector((state: AppState) => {
    return state.task;
  });
  const { SubTasks, isLoading: subTaskIsLoading } = useSelector(
    (state: AppState) => {
      return state.subtask;
    }
  );
  const { Questions, isLoading: questionsIsLoading } = useSelector(
    (state: AppState) => {
      return state.question;
    }
  );
  const [allTaskLeader, setAllTaskLeader] = useState([]);

  useEffect(() => {
    if (Object.getOwnPropertyNames(User)?.length && router.isReady) {
      dispatch(QuestionAction.allQuestionsTask(groupCode, taskId));
      if (User?.role === roles.Student) {
        dispatch(StudentGroupAction.singleGroup(groupCode));
        dispatch(StudentTaskAction.singleTask(groupCode, taskId));
        dispatch(StudentSubTaskAction.allSubTasks());
        if (Group?.leaders?.includes(User?._id)) {
          getAllTaskLeader(groupCode).then((data: any) => {
            setAllTaskLeader(data.data);
          });
        }
      } else {
        dispatch(TeacherGroupAction.singleGroup(groupCode));
        dispatch(TeacherTaskAction.singleTask(groupCode, taskId, studentId));
        dispatch(TeacherSubTaskAction.allSubTasks(groupCode, taskId));
      }
    }
  }, [User, router]);
  const [openAskTask, setOpenAskTask] = useState(false);
  const handleOpenAskTask = () => setOpenAskTask(true);
  const handleCloseAskTask = () => setOpenAskTask(false);

  const [openSubAskTask, setSubOpenAskTask] = useState(false);
  const handleOpenSubAskTask = () => setSubOpenAskTask(true);
  const handleCloseSubAskTask = () => setSubOpenAskTask(false);

  const [openEditTask, setOpenEditTask] = useState(false);
  const handleOpenEditTask = () => setOpenEditTask(true);
  const handleCloseEditTask = () => setOpenEditTask(false);

  const [openFinishTodo, setOpenFinishTodo] = useState(false);
  const handleOpenFinishTodo = () => setOpenFinishTodo(true);
  const handleCloseFinishTodo = () => setOpenFinishTodo(false);
  const [title, setTitle] = useState("");
  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const [addSubtaskData, setAddSubtaskData] = useState<IAddSubTaskDataProps>({
    name: "",
    description: "",
    deadline: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "deadline") {
      setAddSubtaskData({
        ...addSubtaskData,
        [e.target.name]: moment(new Date(e.target.value)).format("MM-DD-YYYY"),
      });
    } else {
      setAddSubtaskData({
        ...addSubtaskData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const styleFinishTodo = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const styleAskTask = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const rows = SubTasks?.map((item) => {
    return createData(
      item.name,
      item.description,
      moment(item.deadline).format("L"),
      User?.role === roles.Student
        ? `${item.assigner.name} ${item.assigner.surname}`
        : `${item.assignTo.name} ${item.assignTo.surname}`,
      item.status,
      item._id,
      item.assignTo._id
    );
  });
  const filterSubTask = SubTasks?.filter((item) => {
    return item.status === status.Completed;
  });
  const allTaskLeaderRows = allTaskLeader?.map((item: ITask) => {
    return createData(
      item.name,
      item.description,
      moment(item.deadline).format("L"),

      `${item.assignTo.name} ${item.assignTo.surname}`,
      item.status,
      item._id,
      item.assignTo._id
    );
  });
  const [editGroup, setEditGroup] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const onChangeEditGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditGroup({
      ...editGroup,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Box flex={4} p={2}>
      {groupIsLoading &&
      taskIsLoading &&
      subTaskIsLoading &&
      questionsIsLoading ? (
        <Progress />
      ) : (
        <>
          <Modal isOpen={openFinishTodo} onClose={handleCloseFinishTodo}>
            <Box sx={styleFinishTodo} gap={2}>
              <Typography id="modal-modal-title" component="h2">
                {User?.role === roles.Student
                  ? "Görevi teslim etmek istediğinizden emin misiniz?"
                  : "Görevi sonlandırmak istediğinizden emin misiniz?"}
              </Typography>
              <Box display={"flex"} justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  disabled={taskIsLoading}
                  onClick={() => {
                    if (User?.role === roles.Student)
                      dispatch(
                        StudentTaskAction.endTask(
                          groupCode,
                          taskId,
                          router,
                          handleCloseFinishTodo
                        )
                      );
                    else
                      dispatch(
                        TeacherTaskAction.endTask(
                          groupCode,
                          taskId,
                          studentId,
                          router,
                          handleCloseFinishTodo
                        )
                      );
                  }}
                >
                  {User?.role === roles.Student
                    ? "Evet, teslim et"
                    : "Evet, sonlandır"}
                </Button>
                <Button variant="outlined" onClick={handleCloseFinishTodo}>
                  {User?.role === roles.Student
                    ? "Hayır, teslim etme"
                    : "Hayır, sonlandırma"}
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal isOpen={openAskTask} onClose={handleCloseAskTask}>
            <Box sx={styleAskTask} gap={2}>
              <TextField
                label="Başlık"
                name="title"
                onChange={onChangeQuestion}
              />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    QuestionAction.createQuestionTask(
                      groupCode,
                      taskId,
                      title,
                      handleCloseAskTask
                    )
                  );
                }}
              >
                Sor
              </Button>
            </Box>
          </Modal>
          <Modal isOpen={openSubAskTask} onClose={handleCloseSubAskTask}>
            <Box
              sx={style}
              gap={2}
              component="form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                dispatch(
                  TeacherSubTaskAction.createSubTask(
                    groupCode,
                    taskId,
                    studentId,
                    addSubtaskData,
                    handleCloseSubAskTask,
                    router
                  )
                );
              }}
            >
              <TextField
                label="Başlık"
                required
                onChange={onChange}
                name="name"
              />
              <TextField
                multiline
                label="Açıklama"
                rows={6}
                required
                onChange={onChange}
                name="description"
              />
              <Input
                type="date"
                id="date"
                required
                // value={addSubtaskData.deadline}
                onChange={onChange}
                name="deadline"
              />

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                type="submit"
                disabled={subTaskIsLoading}
              >
                Alt Görev Ekle
              </Button>
            </Box>
          </Modal>

          <Modal isOpen={openEditTask} onClose={handleCloseEditTask}>
            <Box
              sx={style}
              gap={2}
              component="form"
              onSubmit={async (e: any) => {
                e.preventDefault();
                try {
                  const { data } = await api.put(
                    `/Task/Teacher/Update/${groupCode}/${taskId}`,
                    {
                      ...editGroup,
                      deadline: moment(new Date(editGroup.deadline)).format(
                        "MM-DD-YYYY"
                      ),
                    }
                  );
                  Success(data.message);
                  router.reload();
                } catch (err: any) {
                  Error(err.response.data.message);
                }
              }}
            >
              <TextField
                label="Başlık"
                value={editGroup.name}
                required
                onChange={onChangeEditGroup}
                name="name"
              />
              <TextField
                multiline
                label="Açıklama"
                value={editGroup.description}
                rows={6}
                required
                onChange={onChangeEditGroup}
                name="description"
              />
              <Input
                type="date"
                id="date"
                required
                value={editGroup.deadline}
                onChange={onChangeEditGroup}
                name="deadline"
              />

              <Button sx={{ mt: 2 }} variant="outlined" type="submit">
                Güncelle
              </Button>
            </Box>
          </Modal>
          {Task?.status !== status.Completed && (
            <Box py={2}>
              <Typography variant="h6" mb={1}>
                Operasyonlar
              </Typography>
              <Box display="flex" gap={1}>
                {User?.role === roles.Student && (
                  <Button variant="outlined" onClick={handleOpenAskTask}>
                    Soru Sor
                  </Button>
                )}
                {User?.role === roles.Student &&
                filterSubTask?.length === SubTasks?.length ? (
                  <Button variant="outlined" onClick={handleOpenFinishTodo}>
                    Görevi teslim et
                  </Button>
                ) : User?.role === roles.Teacher ? (
                  <Button variant="outlined" onClick={handleOpenFinishTodo}>
                    Görevi sonlandır
                  </Button>
                ) : null}

                <Button variant="outlined" onClick={handleOpenEditTask}>
                  Görevi Düzenle
                </Button>

                {User?.role === roles.Teacher ||
                Group?.leaders?.includes(User?._id) ? (
                  <Button variant="outlined" onClick={handleOpenSubAskTask}>
                    Alt Görev Ekle
                  </Button>
                ) : null}
              </Box>
            </Box>
          )}
          <Box py={2}>
            <Typography variant="h6" mb={1}>
              Yüklemeler
            </Typography>
            <StyledDropzone />
            <Grid container spacing={2} my={1} alignItems={"stretch"}>
              {Task?.uploads?.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <FileList
                      name={item.fullName}
                      date={item.uploadDate}
                      fileName={item.originalname}
                      role={item.role}
                      Location={item.Location}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box mt={2}>
            <Typography variant="h6" mb={1}>
              {User?.role === roles.Student
                ? "Alt Ödevler"
                : "Atanan Alt Ödevler"}
            </Typography>
            {SubTasks?.length ? (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Görev Adı</TableCell>
                      <TableCell>Açıklama</TableCell>
                      <TableCell>Bitiş Tarihi</TableCell>
                      <TableCell>
                        {User?.role === roles.Student
                          ? "Atayan Kişi"
                          : "Atanan Kişi"}
                      </TableCell>
                      <TableCell>Durum</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.deadline}</TableCell>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.taskStatus}</TableCell>
                        <TableCell align="right">
                          <Link
                            href={`/subtasks/${groupCode}/${taskId}/${row.subTaskId}/${row.assignTo}`}
                          >
                            Göreve git
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div>Henüz alt göreviniz bulunmamaktadır.</div>
            )}
          </Box>
          {Group?.leaders?.includes(User?._id) && (
            <Box mt={2}>
              <Typography variant="h6" mb={1}>
                Atanan Ödevler
              </Typography>
              {allTaskLeader?.length ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Görev Adı</TableCell>
                        <TableCell>Açıklama</TableCell>
                        <TableCell>Bitiş Tarihi</TableCell>
                        <TableCell>Atanan Kişi</TableCell>
                        <TableCell>Durum</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allTaskLeaderRows.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.deadline}</TableCell>
                          <TableCell>{row.fullName}</TableCell>
                          <TableCell>{row.taskStatus}</TableCell>
                          <TableCell align="right">
                            {/* <Link
                              href={`/tasks/${groupCode}/${row.taskId}/${row.assignTo}`}
                            >
                              Göreve git
                            </Link> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div>Henüz göreviniz bulunmamaktadır.</div>
              )}
            </Box>
          )}
          <Box pb={10}>
            <Typography variant="h6" my={2}>
              Sorular
            </Typography>
            {Questions?.length ? (
              <Box>
                {Questions?.map((item, index) => {
                  return (
                    <MuiAccordion
                      key={index}
                      questionId={item._id}
                      title={item.title}
                      description={item.content}
                    />
                  );
                })}
              </Box>
            ) : (
              <div>Herhangi bir soru veya cevap bulunamadı</div>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default withAuth(SingleTaskPage);
