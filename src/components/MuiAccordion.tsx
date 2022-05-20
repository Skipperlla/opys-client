import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { roles } from "@utils/querys";
import MaterialModal from "./MaterialModal";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/index";
import { QuestionAction } from "@store/actions";
interface IMuiAccordionProps {
  title: string;
  description: string;
  questionId: string;
}
const MuiAccordion = ({
  title,
  description,
  questionId,
}: IMuiAccordionProps) => {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expand, setExpand] = useState(false);
  const handleExpand = () => setExpand(!expand);

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
  const [content, setContent] = useState("");
  const { groupCode, taskId } = useRouter()?.query;
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  const { isLoading } = useSelector((state: AppState) => {
    return state.question;
  });
  return (
    <React.Fragment>
      <Accordion
        expanded={expand}
        sx={{
          marginY: "8px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore onClick={handleExpand} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" alignItems={"center"} gap={2}>
            <Typography fontWeight={500}>{title}</Typography>
            {!description && (
              <>
                {User?.role === roles.Teacher && (
                  <Button onClick={handleOpen}>Cevapla</Button>
                )}
              </>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {description ? (
            <Typography>{description}</Typography>
          ) : (
            <Typography>
              Öğretmen tarafından henüz bir cevap verilmedi
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <MaterialModal isOpen={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            multiline
            label="Cevabınız"
            rows={6}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            disabled={isLoading}
            sx={{ mt: 2 }}
            variant="contained"
            type="submit"
            onClick={() => {
              dispatch(
                QuestionAction.createAnswer(
                  groupCode,
                  taskId,
                  questionId,
                  content
                )
              );
            }}
          >
            Cevapla
          </Button>
        </Box>
      </MaterialModal>
    </React.Fragment>
  );
};

export default MuiAccordion;
