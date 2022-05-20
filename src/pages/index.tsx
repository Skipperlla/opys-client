import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import withAuth from "@utils/hooks/withAuth";
import { roles } from "@utils/querys";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudentTaskAction, TeacherTaskAction } from "@store/actions/task";
import { StudentGroupAction, TeacherGroupAction } from "@store/actions/group";
import { AppState } from "@store/index";
import Link from "next/link";
import { ITask } from "types/task";
import { Progress } from "@components/index";
const Home = () => {
  const dispatch = useDispatch<any>();
  // Hooks
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const { Groups, isLoading: groupIsLoading } = useSelector(
    (state: AppState) => {
      return state.group;
    }
  );
  const { Tasks, isLoading: taskIsLoading } = useSelector((state: AppState) => {
    return state.task;
  });
  useEffect(() => {
    if (Object.getOwnPropertyNames(User)?.length) {
      if (User?.role === roles.Student) {
        dispatch(StudentTaskAction.allTasks());
        dispatch(StudentGroupAction.allGroups());
      } else {
        dispatch(TeacherTaskAction.allTasks());
        dispatch(TeacherGroupAction.allGroups());
      }
    }
  }, [User]);
  // Functions
  function createData(
    name: string,
    description: string,
    deadline: string,
    fullName: string,
    taskStatus: string,
    taskId: string,
    groupCode: string,
    assignTo: any
  ) {
    return {
      name,
      description,
      deadline,
      fullName,
      taskStatus,
      taskId,
      groupCode,
      assignTo,
    };
  }
  const rows = Tasks?.map((item: ITask) => {
    return createData(
      item.name,
      item.description,
      moment(item.deadline).format("L"),
      User?.role === roles.Student
        ? `${item.assigner.name} ${item.assigner.surname}`
        : `${item.assignTo.name} ${item.assignTo.surname}`,
      item.status,
      item._id,
      item.group.groupCode,
      item.assignTo._id
    );
  });

  return (
    <Box flex={4} p={2}>
      {groupIsLoading && taskIsLoading ? (
        <Progress />
      ) : (
        <>
          <Typography variant="h4" mb={2}>
            Anasayfa
          </Typography>
          <Box
            display={"flex"}
            gap={"20px"}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Card sx={{ width: { xs: "100%", md: 1 / 2 } }}>
              <CardMedia
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                height="140"
                component="img"
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="h6">Grup Sayısı</Typography>
                <Typography variant="body1">{Groups?.length}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: { xs: "100%", md: 1 / 2 } }}>
              <CardMedia
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                height="140"
                component="img"
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="h6">
                  {"Öğrenci" === roles.Student
                    ? "Ödev Sayısı"
                    : "Atanan Ödev Sayısı"}
                </Typography>
                <Typography variant="body1">{Tasks?.length}</Typography>
              </CardContent>
            </Card>
          </Box>
          {"Öğrenci" === roles.Student && (
            <Box mt={2} sx={{ display: { xs: "none", md: "block" } }}>
              <Typography variant="h6" mb={1}>
                Yapılacak Görevler
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Görev adı</TableCell>
                      <TableCell align="right">Açıklama</TableCell>
                      <TableCell align="right">Bitiş Tarihi</TableCell>
                      <TableCell align="right">Atayan Kişi</TableCell>
                      <TableCell align="right">Durum</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.length ? (
                      <>
                        {rows.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">
                              {row.description}
                            </TableCell>
                            <TableCell align="right">{row.deadline}</TableCell>
                            <TableCell align="right">{row.fullName}</TableCell>
                            <TableCell align="right">
                              {row.taskStatus}
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`/groups/${row.groupCode}/task/${row.taskId}?studentId=${row.assignTo}`}
                              >
                                Göreve git
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <Box p={2}>Henüz bir görev eklenmedi.</Box>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
export default withAuth(Home);
