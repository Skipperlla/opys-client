import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { roles } from "@utils/querys";
import moment from "moment";
import { useRouter } from "next/router";
import withAuth from "@utils/hooks/withAuth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/index";
import { StudentGroupAction, TeacherGroupAction } from "@store/actions/group";
import { Progress } from "@components/index";
const GroupsPage = () => {
  // Hooks
  const [groupName, setGroupName] = useState("");
  const [GroupCode, setGroupCode] = useState("");
  const router = useRouter();
  // * Reduxs
  const dispatch = useDispatch<any>();
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const { Groups, isLoading } = useSelector((state: AppState) => {
    return state.group;
  });

  useEffect(() => {
    if (Object.getOwnPropertyNames(User)?.length) {
      if (User?.role === roles.Student) {
        dispatch(StudentGroupAction.allGroups());
      } else {
        dispatch(TeacherGroupAction.allGroups());
      }
    }
  }, [User]);
  // Functions
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "groupCode") setGroupCode(e.target.value);
    else setGroupName(e.target.value);
  };
  function createData(
    name: string,
    studentsCount: number,
    createdAt: string,
    groupCode: string
  ) {
    return { name, studentsCount, createdAt, groupCode };
  }
  const rows = Groups?.map((item) => {
    return createData(
      item.name,
      item.students?.length,
      moment(item.createdAt).format("L"),
      item.groupCode
    );
  });
  return (
    <Box flex={4} p={2} display={"flex"} flexDirection={"column"}>
      {isLoading ? (
        <Progress />
      ) : (
        <>
          {User?.role === roles.Teacher ? (
            <Box>
              <Typography variant="h6" mb={1}>
                Grup Oluştur
              </Typography>
              <Box
                component={"form"}
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  if (groupName) {
                    dispatch(TeacherGroupAction.createGroup(groupName));
                    setGroupName("");
                  }
                }}
                display={"flex"}
                alignContent={"center"}
                gap={2}
              >
                <TextField
                  fullWidth
                  name="groupName"
                  label={"Grup adı"}
                  onChange={onChange}
                />
                <Button type="submit" variant="contained">
                  Oluştur
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" mb={1}>
                Gruba Katıl
              </Typography>
              <Box
                component={"form"}
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  if (GroupCode)
                    dispatch(StudentGroupAction.joinGroup(GroupCode));
                }}
                display={"flex"}
                alignContent={"center"}
                gap={2}
              >
                <TextField
                  fullWidth
                  name="groupCode"
                  label={"Grup kodu"}
                  onChange={onChange}
                />
                <Button type="submit" variant="contained">
                  Katıl
                </Button>
              </Box>
            </Box>
          )}

          <Box mt={2}>
            <Typography variant="h6" mb={1}>
              Kayıtlı Gruplar
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Grup Adı</TableCell>
                    <TableCell align="right">Üye Sayısı</TableCell>
                    <TableCell align="right">Oluşturulma Tarihi</TableCell>
                    <TableCell align="right">Grup Kodu</TableCell>
                    {roles.Teacher === User?.role && (
                      <TableCell align="right"></TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => {
                          // router.prefetch(`/groups/${row.groupCode}`);
                          router.push(`/groups/${row.groupCode}`);
                        }}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: "#6366f1",
                            transition: "all",
                            transitionDuration: "300ms",
                          },
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row?.studentsCount}</TableCell>
                      <TableCell align="right">{row.createdAt}</TableCell>
                      <TableCell align="right">{row.groupCode}</TableCell>
                      {roles.Teacher === User?.role && (
                        <TableCell
                          align="right"
                          sx={{
                            cursor: "pointer",
                            color: "red",
                          }}
                          onClick={() => {
                            dispatch(
                              TeacherGroupAction.deleteGroup(row.groupCode)
                            );
                          }}
                        >
                          Grubu Sil
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default withAuth(GroupsPage);
