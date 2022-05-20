import { Box, Button, Input, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import withAuth from "@utils/hooks/withAuth";
import { styled } from "@mui/material/styles";
import { UserAction } from "@store/actions/";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/index";
const ImageInput = styled("input")({
  display: "none",
});
interface IProfilePageFormProps {
  name: string;
  surname: string;
  email: string;
  role: string;
}
export interface IProfilePagePasswordFormProps {
  oldPassword: string;
  oldPasswordAgain: string;
  newPassword: string;
}
const ProfilePage = () => {
  // Hooks
  const { User, isLoading } = useSelector((state: AppState) => {
    return state.user;
  });

  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<IProfilePageFormProps>({
    name: "",
    surname: "",
    email: "",
    role: "",
  });
  const [passwordForm, setPasswordForm] =
    useState<IProfilePagePasswordFormProps>({
      oldPassword: "",
      oldPasswordAgain: "",
      newPassword: "",
    });
  useEffect(() => {
    if (!isLoading) {
      setForm({
        name: User.name,
        surname: User.surname,
        email: User.email,
        role: User.role,
      });
    }
  }, [isLoading]);
  // Functions
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name.includes("Password")) {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
      } else {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    },
    [form, passwordForm]
  );
  return (
    <Box
      flex={4}
      p={2}
      pb={10}
      display={"flex"}
      flexDirection={"column"}
      gap={4}
    >
      <Box
        p={2}
        display={"flex"}
        flexDirection={"column"}
        border={"1px solid #ccc"}
        borderRadius={1}
        component="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          dispatch(UserAction.updatePassword(passwordForm));
        }}
        gap={1}
      >
        <Typography>Parolanı Değiştir</Typography>
        <TextField
          label={"Eski Parola"}
          type="password"
          required
          name="oldPassword"
          onChange={handleChange}
        />
        <TextField
          label={"Eski Parola (Tekrar)"}
          type="password"
          required
          name="oldPasswordAgain"
          onChange={handleChange}
        />
        <TextField
          label={"Yeni Parola"}
          type="password"
          required
          name="newPassword"
          onChange={handleChange}
        />
        {/* // TODO: Validasyonlar eklenecek. */}
        <Button
          variant="contained"
          sx={{ alignSelf: "end" }}
          type="submit"
          disabled={isLoading}
        >
          Güncelle
        </Button>
      </Box>
      <Box
        p={2}
        display={"flex"}
        flexDirection={"column"}
        border={"1px solid #ccc"}
        borderRadius={1}
        component="form"
        gap={1}
      >
        <Typography>Profili Düzenle</Typography>
        <Box
          sx={{
            alignSelf: "center",
            borderRadius: "9999px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label htmlFor="contained-button-file">
            <ImageInput
              disabled={isLoading}
              id="contained-button-file"
              type="file"
              onChange={(e: any) => {
                if (e.target.files[0]) {
                  dispatch(UserAction.uploadProfilePic(e.target.files[0]));
                }
              }}
            />
            {User?.avatar?.Location && (
              <Image
                src={User?.avatar?.Location}
                alt={"profile image"}
                height={128}
                width={128}
                style={{ cursor: "pointer", borderRadius: "9999px" }}
              />
            )}
          </label>

          <Typography>{form?.role}</Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          gap={"12px"}
        >
          <TextField
            onChange={handleChange}
            name="name"
            disabled
            label={"İsim"}
            sx={{ width: { xs: "100%", sm: 1 / 2 } }}
            value={form?.name}
          />
          <TextField
            onChange={handleChange}
            name="surname"
            disabled
            label={"Soyisim"}
            sx={{ width: { xs: "100%", sm: 1 / 2 } }}
            value={form?.surname}
          />
        </Box>
        <TextField
          label={"E-Posta"}
          type="email"
          disabled
          value={form?.email}
          onChange={handleChange}
          name="email"
        />
        <Input id="profilePhoto" type="file" sx={{ display: "none" }} />
      </Box>
    </Box>
  );
};

export default withAuth(ProfilePage);
