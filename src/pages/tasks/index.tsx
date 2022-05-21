import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  CircularProgress,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
import Link from "next/link";
import withAuth from "@utils/hooks/withAuth";
import { roles, status } from "@utils/querys";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/index";
import { useEffect } from "react";
import { StudentTaskAction, TeacherTaskAction } from "@store/actions/task";
import { Progress } from "@components/index";
const TasksPage = () => {
  const dispatch = useDispatch<any>();
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const { Tasks, isLoading } = useSelector((state: AppState) => {
    return state.task;
  });
  useEffect(() => {
    if (Object.getOwnPropertyNames(User)?.length) {
      if (User?.role === roles.Student) {
        dispatch(StudentTaskAction.allTasks());
      } else {
        dispatch(TeacherTaskAction.allTasks());
      }
    }
  }, [User]);
  function createData(
    name: string,
    description: string,
    deadline: string,
    fullName: string,
    taskStatus: string,
    taskId: string,
    groupCode: string,
    assignTo: any,
    subTasksLength: number
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
      subTasksLength,
    };
  }
  const rows = Tasks?.map((item) => {
    const subTasksCompletedLength = item.subTasks?.filter((item: any) => {
      return item.status === status.Completed;
    })?.length;
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
      item.assignTo._id,
      item.subTasks.length
        ? Math.ceil((100 / item.subTasks.length) * subTasksCompletedLength)
        : 0
    );
  });
  return (
    <Box
      flex={4}
      p={2}
      pb={10}
      display={"flex"}
      flexDirection={"column"}
      position="relative"
      width={"100vw"}
    >
      {isLoading ? (
        <Progress />
      ) : (
        <Box mt={2} sx={{ overflowX: "scroll" }} width={"100%"}>
          <Typography variant="h6" mb={1}>
            {User?.role === roles.Student
              ? "Görevler"
              : "Öğrencilere Atanan Görevler"}
          </Typography>
          {Tasks?.length ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Görev Adı </TableCell>
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
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {row.taskStatus !== status.Completed && (
                        <>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.deadline}</TableCell>
                          <TableCell>{row.fullName}</TableCell>
                          <TableCell>{row.taskStatus}</TableCell>
                          <TableCell>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgressWithLabel
                                value={row.subTasksLength}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/tasks/${row.groupCode}/${row.taskId}/${row.assignTo}`}
                            >
                              Göreve git
                            </Link>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>Henüz bir görev atamadınız</div>
          )}
        </Box>
      )}
    </Box>
  );
};

export default withAuth(TasksPage);
