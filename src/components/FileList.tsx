import { FileCopy } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
interface IFileListProps {
  name: string;
  date: string;
  fileName: string;
  role: string;
  Location: string;
}
const FileList = ({ name, date, fileName, role, Location }: IFileListProps) => {
  const router = useRouter();
  const FileBox = styled(Box)(({ theme }) => ({
    display: "flex",
    border: "1px solid #ccc",
    alignItems: "center",
    justifyContent: "center",
    height: "120px",
  }));

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      sx={{ cursor: "pointer", textAlign: "center" }}
      onClick={() => {
        window.open(Location, "_ blank");
      }}
    >
      <FileBox>
        <FileCopy sx={{ fontSize: 40 }} />
      </FileBox>
      <Box
        p={2}
        border={"1px solid #ccc"}
        borderTop={"none"}
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        flexDirection="column"
      >
        <Box>
          <Typography>{name}</Typography>
          <Typography>{date}</Typography>
          <Typography>{role}</Typography>
          <Typography>{fileName}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FileList;
