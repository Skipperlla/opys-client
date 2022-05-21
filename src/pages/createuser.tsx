import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback, useState } from "react";
import withAuth from "@utils/hooks/withAuth";
import { AuthAction } from "@store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppState } from "@store/index";

const CreateUser = () => {
  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    password: "",
    surname: "",
    role: "",
  });
  const { isLoading } = useSelector((state: AppState) => state.auth);

  const dispatch = useDispatch<any>();
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(AuthAction.Register(form, router));
  };
  const onChange = useCallback(
    (e: any) => {
      if (e.target.name === "role") {
        setForm({ ...form, role: e.target.value });
      } else {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    },
    [form]
  );
  return (
    <Box flex={4} p={2}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>A</Avatar>
          <Typography component="h1" variant="h5">
            Kullanıcı Oluştur
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  onChange={onChange}
                  required
                  fullWidth
                  id="name"
                  label="İsim"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={onChange}
                  id="surname"
                  label="Soyisim"
                  name="surname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={onChange}
                  label="E-Posta"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={onChange}
                  name="password"
                  label="Parola"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Rol</InputLabel>
                    <Select
                      onChange={onChange}
                      id="simple-select"
                      value={form.role}
                      label="Rol"
                      name="role"
                    >
                      <MenuItem value={"Öğrenci"}>Öğrenci</MenuItem>
                      <MenuItem value={"Öğretmen"}>Öğretmen</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Oluştur
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default withAuth(CreateUser);
