import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useUserContext();

  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (
    { email, password },
    { setSubmitting, setError, resetForm }
  ) => {
    try {
      const credentialUser = await register({ email, password });
      console.log("venga que llega aca esta madre", credentialUser);
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email no valido").required("Email requerido"),
    password: yup
      .string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("password requerido"),
  });

  return (
    <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
        <AddAPhotoIcon></AddAPhotoIcon>
      </Avatar>

      <Typography variant="h5" component="h1">
        Register
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Box onSubmit={handleSubmit} sx={{ mt: 1 }} component="form">
            <TextField
              type="text"
              placeholder="Ingrese Email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              id="email"
              label="Ingrese email"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            ></TextField>

            <TextField
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese password"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            ></TextField>

            <LoadingButton
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
              sx={{ mb: 3 }}
            >
              Registrate
            </LoadingButton>

            <Button fullWidth component={Link} to="/">
              Ya tienes cuenta? Ingresa
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
