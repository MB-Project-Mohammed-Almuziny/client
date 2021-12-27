import { React } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  FormGroup,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export const UserSettingPassword = () => {
  const { token } = useSelector((state) => state.account);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (e.target.newPasword.value === e.target.checkNewPasword.value) {
        await axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/user/changePassword`,
            { newPassword: e.target.newPasword.value },
            {
              headers: { Authorization: "Bearer " + token },
            }
          )
          .then(() =>
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "your change saved",
              showConfirmButton: false,
              timer: 1500,
            })
          )
          .catch((err) => {
            console.log(err);
          });
      } else alert("not equal");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" mb={2}>
        change your password
      </Typography>

      <Card>
        <Box p={2}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <TextField
                fullWidth
                type="password"
                id="newPasword"
                label="newPasword"
                placeholder="new pasword"
                margin="normal"
                required
              />

              <TextField
                fullWidth
                type="password"
                id="checkNewPasword"
                label="check new pasword"
                placeholder="ckeck new pasword"
                margin="normal"
                required
              />
            </FormGroup>

            <Typography align="center" my={2}>
              <Button variant="contained" type="submit">
                save change
              </Button>
            </Typography>
          </form>
        </Box>
      </Card>
    </Container>
  );
};
