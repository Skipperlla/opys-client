import { memo, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Input,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Post, Progress } from "@components/index";

import Link from "next/link";
import withAuth from "@utils/hooks/withAuth";
import { roles } from "@utils/querys";
import { useRouter } from "next/router";
import moment from "moment";
import { Label } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/index";
import { StudentTaskAction, TeacherTaskAction } from "@store/actions/task";
import { StudentGroupAction, TeacherGroupAction } from "@store/actions/group";
import { PostAction } from "@store/actions/index";
import MaterialModal from "@components/MaterialModal";
import { ITask, IUserProps } from "types/task";
import { getAllTaskLeader } from "@utils/lib/api";

function createData(
  name: string,
  description: string,
  deadline: string,
  fullName: string,
  taskStatus: string,
  taskId: string,
  assignTo: any
) {
  return {
    name,
    description,
    deadline,
    fullName,
    taskStatus,
    taskId,
    assignTo,
  };
}
export interface IAddTaskDataProps {
  name: string;
  description: string;
  deadline: string;
  assignTo: string;
}
const SingleGroup = () => {
  // Contexts
  // Hooks

  // * Redux
  const dispatch = useDispatch<any>();

  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const { Group, isLoading } = useSelector((state: AppState) => {
    return state.group;
  });

  const { Tasks, isLoading: taskIsLoading } = useSelector((state: AppState) => {
    return state.task;
  });
  const { Posts, isLoading: postIsLoading } = useSelector((state: AppState) => {
    return state.post;
  });
  const [limit, setLimit] = useState(5);
  const { groupCode } = useRouter()?.query;
  const [content, setContent] = useState("");
  // Modal States
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //
  const [openAddTask, setOpenAddTask] = useState(false);
  const handleOpenAddTask = () => setOpenAddTask(true);
  const handleCloseAddTask = () => setOpenAddTask(false);
  //
  const [allTaskLeader, setAllTaskLeader] = useState([]);

  const [addTaskData, setAddTaskData] = useState<IAddTaskDataProps>({
    name: "",
    description: "",
    deadline: "",
    assignTo: "",
  });

  useEffect(() => {
    if (Object.getOwnPropertyNames(User)?.length) {
      dispatch(PostAction.allPosts(groupCode));
      if (User?.role === roles.Student) {
        dispatch(StudentTaskAction.allTasks());
        dispatch(StudentGroupAction.singleGroup(groupCode));
        getAllTaskLeader(groupCode).then((data: any) => {
          setAllTaskLeader(data.data);
        });
      } else {
        dispatch(TeacherTaskAction.allTasks());
        dispatch(TeacherGroupAction.singleGroup(groupCode));
      }
    }
  }, [User]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "deadline") {
      setAddTaskData({
        ...addTaskData,
        [e.target.name]: moment(new Date(e.target.value)).format("MM-DD-YYYY"),
      });
    } else {
      setAddTaskData({
        ...addTaskData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Functions
  const userRows = Group?.students?.map((item, index) => {
    return {
      id: index,
      email: item.email,
      firstName: item.name,
      lastName: item.surname,
      role: Group?.leaders?.includes(item._id) ? "Lider" : item.role,
      studentId: item._id,
    };
  });
  const rows = Tasks?.map((item) => {
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
  const userColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "E-posta",
      width: 200,
      editable: false,
    },
    {
      field: "firstName",
      headerName: "İsim",
      width: 100,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Soyisim",
      width: 110,
      editable: false,
    },
    {
      field: "role",
      headerName: "Rol",
      width: 110,
      editable: false,
    },
  ];
  if (User?.role === roles.Teacher) {
    const doLeader = {
      field: "do",
      headerName: "Lider Yap",
      width: 110,
      editable: false,
      renderCell: function (params: {
        row: { role: string; studentId: string };
      }) {
        return (
          <>
            {params?.row?.role === roles.Student &&
            !Group?.leaders?.includes(params.row.studentId) ? (
              <Button
                color="primary"
                disabled={isLoading}
                onClick={() => {
                  dispatch(
                    TeacherGroupAction.doLeader(groupCode, params.row.studentId)
                  );
                }}
              >
                Lider Yap
              </Button>
            ) : Group?.leaders?.includes(params.row.studentId) ? (
              <Button
                color="primary"
                disabled={isLoading}
                onClick={() => {
                  dispatch(
                    TeacherGroupAction.removeLeader(
                      groupCode,
                      params.row.studentId
                    )
                  );
                }}
              >
                Liderliği Al
              </Button>
            ) : null}
          </>
        );
      },
    };
    userColumns.push(doLeader);
  }
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
  const autoCompleteDataFilter = Group?.students?.filter((item) => {
    return item.role === roles.Student;
  });
  const autoCompleteData = autoCompleteDataFilter?.map((item) => {
    return {
      label: `${item.name} ${item.surname}`,
      value: item._id,
    };
  });
  return (
    <Box flex={4} p={2} pb={10} display={"flex"} flexDirection={"column"}>
      {isLoading && taskIsLoading && postIsLoading ? (
        <Progress />
      ) : (
        <>
          <MaterialModal isOpen={openAddTask} onClose={handleCloseAddTask}>
            <Box
              sx={style}
              gap={2}
              component="form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                dispatch(
                  TeacherTaskAction.createTask(
                    groupCode,
                    addTaskData.assignTo,
                    addTaskData,
                    handleCloseAddTask
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
                onChange={onChange}
                name="deadline"
              />
              <Autocomplete
                onChange={(event, value: any) => {
                  setAddTaskData({ ...addTaskData, assignTo: value.value });
                }}
                disablePortal
                isOptionEqualToValue={(option, value) => {
                  return option.value === value.value;
                }}
                options={autoCompleteData}
                renderInput={(params) => (
                  <TextField {...params} label="Öğrenci" />
                )}
              />

              <Button
                sx={{ mt: 2 }}
                variant="contained"
                disabled={taskIsLoading}
                type="submit"
              >
                Ekle
              </Button>
            </Box>
          </MaterialModal>

          {User?.role === roles.Teacher ||
          Group?.leaders?.includes(User?._id) ? (
            <Box py={2}>
              <Typography variant="h6" mb={1}>
                Operasyonlar
              </Typography>
              <Box display="flex" gap={1}>
                <Button variant="outlined" onClick={handleOpenAddTask}>
                  Görev Ekle
                </Button>
              </Box>
            </Box>
          ) : null}

          <Box>
            <Typography variant="h6" mb={1}>
              Kullanıcılar
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={userRows || []}
                columns={userColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </Box>

          <Box mt={2}>
            <Typography variant="h6" mb={1}>
              {User?.role === roles.Student ? "Ödevler" : "Atanan Ödevler"}
            </Typography>
            {Tasks?.length ? (
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
                            href={`/tasks/${groupCode}/${row.taskId}/${row.assignTo}`}
                          >
                            Göreve git
                          </Link>
                        </TableCell>
                        <TableCell align="right">Görevi Sil</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div>Henüz göreviniz bulunmamaktadır.</div>
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
                            <Link
                              href={`/tasks/${groupCode}/${row.taskId}/${row.assignTo}`}
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
                <div>Henüz göreviniz bulunmamaktadır.</div>
              )}
            </Box>
          )}
          <Box mt={2} pb={10}>
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
              my={1}
            >
              <Typography variant="h6" mb={1}>
                Gönderiler
              </Typography>
              <Button size="small" variant="contained" onClick={handleOpen}>
                Gönderi Ekle
              </Button>
            </Box>
            <MaterialModal isOpen={open} onClose={handleClose}>
              <Box sx={style}>
                <TextField
                  multiline
                  label="Gönderi"
                  rows={6}
                  maxRows={6}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  type="submit"
                  disabled={postIsLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    if (content)
                      dispatch(
                        PostAction.createPost(groupCode, content, handleClose)
                      );
                  }}
                >
                  Paylaş
                </Button>
              </Box>
            </MaterialModal>
            {Posts?.length ? (
              <Grid container spacing={2}>
                {Posts?.map((item, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Post
                        avatar={item.author.avatar.Location}
                        role={item.author.role}
                        fullName={item.author.name + " " + item.author.surname}
                        content={item.content}
                        date={item.createdAt}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <div>Henüz gönderi yok</div>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
export default withAuth(SingleGroup);
