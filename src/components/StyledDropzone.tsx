import { Box, Button } from "@mui/material";
import {
  StudentTaskAction,
  TeacherTaskAction,
} from "@store/actions/task/index";
import {
  StudentSubTaskAction,
  TeacherSubTaskAction,
} from "@store/actions/subtask/index";
import { AppState } from "@store/index";
import { roles } from "@utils/querys";
import { useRouter } from "next/router";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

interface IAcceptedFilesProps {
  path: string;
}

function StyledDropzone() {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({});
  const router = useRouter();
  const { groupCode, taskId, studentId, subTaskId } = router?.query;
  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const [AcceptedFiles, setAcceptedFiles] = useState<any>([]);
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>{file.path}</li>
  ));
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (AcceptedFiles?.length) {
      if (router.pathname.includes("subtask")) {
        switch (User?.role) {
          case roles.Student:
            dispatch(
              StudentSubTaskAction.uploadSubTask(
                groupCode,
                taskId,
                subTaskId,
                AcceptedFiles,
                setAcceptedFiles,
                router
              )
            );
            break;
          case roles.Teacher:
            dispatch(
              TeacherSubTaskAction.uploadSubTask(
                groupCode,
                taskId,
                subTaskId,
                studentId,
                AcceptedFiles,
                setAcceptedFiles,
                router
              )
            );
            break;
          default:
            break;
        }
      } else {
        switch (User?.role) {
          case roles.Student:
            dispatch(
              StudentTaskAction.uploadTask(
                groupCode,
                taskId,
                AcceptedFiles,
                setAcceptedFiles,
                router
              )
            );
            break;
          case roles.Teacher:
            dispatch(
              TeacherTaskAction.uploadTask(
                groupCode,
                taskId,
                studentId,
                AcceptedFiles,
                setAcceptedFiles,
                router
              )
            );
            break;
          default:
            break;
        }
      }
    }
  }, [AcceptedFiles]);

  return (
    <Box display={"flex"} flexDirection="column">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} onChange={() => {}} />
        <p>
          Yüklemek istediğiniz dosya/dosyaları sürükleyin ya da seçmek için
          tıklayın.
        </p>
      </div>
      <Box my={1}>
        <h4>Eklenen Dosyalar</h4>
        <ul>{AcceptedFiles?.length ? files : null}</ul>
      </Box>
      <Button
        sx={{ mt: 1 }}
        variant="contained"
        onClick={() => {
          setAcceptedFiles(acceptedFiles);
        }}
      >
        Yükle
      </Button>
    </Box>
  );
}

export default memo(StyledDropzone);
