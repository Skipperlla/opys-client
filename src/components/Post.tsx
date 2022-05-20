import { styled, Box, Avatar, Typography, Divider } from "@mui/material";
import moment from "moment";
import { FC } from "react";
interface IPost {
  avatar: string;
  fullName: string;
  content: string;
  role: string;
  date: string;
}
const Post: FC<IPost> = ({ avatar, fullName, content, role, date }) => {
  const PostBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
  }));

  return (
    <PostBox p={2}>
      <Box display={"flex"} pb={1}>
        <Avatar sx={{ width: 48, height: 48 }} src={avatar} />
        <Box display={"flex"} flexDirection={"column"} ml={1}>
          <Typography fontWeight={500}>{fullName}</Typography>
          <Typography fontSize={14}>{role}</Typography>
          <Typography fontSize={14}>{moment(date).format("L")}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box pt={1} pb={1}>
        <Typography>{content}</Typography>
      </Box>
    </PostBox>
  );
};

export default Post;
