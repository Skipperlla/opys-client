import { Typography, Button, Box, Grid, TextField } from "@mui/material";

import withAuth from "@utils/hooks/withAuth";
import {
  StyledDropzone,
  MuiAccordion,
  FileList,
  Modal,
  Progress,
} from "@components/index";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { roles } from "@utils/querys";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/index";
import {
  StudentSubTaskAction,
  TeacherSubTaskAction,
} from "@store/actions/subtask";
import { StudentGroupAction, TeacherGroupAction } from "@store/actions/group";
import { QuestionAction } from "@store/actions";

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
const SingleSubTaskPage = () => {
  const router = useRouter();
  const { groupCode, taskId, studentId, subTaskId } = router?.query;

  const dispatch = useDispatch<any>();
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const { Questions, isLoading: questionIsLoading } = useSelector(
    (state: AppState) => {
      return state.question;
    }
  );

  const { SubTask, isLoading: subTaskIsLoading } = useSelector(
    (state: AppState) => {
      return state.subtask;
    }
  );
  useEffect(() => {
    if (Object.getOwnPropertyNames(User)?.length && router.isReady) {
      dispatch(QuestionAction.allQuestionsSubTask(groupCode, subTaskId));
      if (User?.role === roles.Student) {
        dispatch(
          StudentSubTaskAction.singleSubTask(groupCode, taskId, subTaskId)
        );
        dispatch(StudentGroupAction.singleGroup(groupCode));
      } else {
        dispatch(
          TeacherSubTaskAction.singleSubTask(
            groupCode,
            taskId,
            subTaskId,
            studentId
          )
        );
        dispatch(TeacherGroupAction.singleGroup(groupCode));
      }
    }
  }, [User, router]);

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
  const [openAskTask, setOpenAskTask] = useState(false);
  const handleCloseAskTask = () => setOpenAskTask(false);
  const handleOpenAskTask = () => setOpenAskTask(true);
  const [title, setTitle] = useState("");
  return (
    <Box flex={4} p={2}>
      {questionIsLoading && subTaskIsLoading ? (
        <Progress />
      ) : (
        <>
          {User?.role === roles.Student && (
            <React.Fragment>
              <Modal isOpen={openAskTask} onClose={handleCloseAskTask}>
                <Box sx={styleAskTask} gap={2}>
                  <TextField
                    label="Başlık"
                    name="title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        QuestionAction.createQuestionSubTask(
                          groupCode,
                          subTaskId,
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
              <Box py={2}>
                <Typography variant="h6" mb={1}>
                  Operasyonlar
                </Typography>
                <Box display="flex" gap={1}>
                  <Button variant="outlined" onClick={handleOpenAskTask}>
                    Soru Sor
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      dispatch(
                        StudentSubTaskAction.endSubTask(
                          groupCode,
                          taskId,
                          subTaskId,
                          router
                        )
                      );
                    }}
                  >
                    Alt Görevi Bitir
                  </Button>
                </Box>
              </Box>
            </React.Fragment>
          )}
          <Box py={2}>
            <Typography variant="h6" mb={1}>
              Yüklemeler
            </Typography>
            <StyledDropzone />
            <Grid container spacing={2} my={1} alignItems={"stretch"}>
              {SubTask?.uploads?.map((item, index) => {
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
        </>
      )}
    </Box>
  );
};

export default withAuth(SingleSubTaskPage);
