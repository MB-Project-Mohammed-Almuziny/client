import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Avatar, List, ListItem, Typography } from "@mui/material";

import { UserSettingInfo } from "./../components/UserSettingInfo";
import { UserSettingAvatar } from "../components/UserSettingAvatar";
import { UserSettingPassword } from "../components/UserSettingPassword";

const GetPanel = ({ panel }) => {
  switch (panel) {
    case "Info":
      return <UserSettingInfo />;

    case "avatar":
      return <UserSettingAvatar />;

    case "password":
      return <UserSettingPassword />;

    default:
      return <>404</>;
  }
};

export const UserSetting = () => {
  const [panel, setPanel] = useState("Info");

  const { user, avatar } = useSelector((state) => state.account);

  return (
    <Grid container>
      <Grid item xs={3}>
        <List
          sx={{
            width: "100%",
            maxWidth: 200,
            height: "100vh",
            bgcolor: "background.paper",
          }}
        >
          <Avatar alt={user} src={avatar} />

          {["Info", "avatar", "Password"].map((value) => (
            <ListItem key={value} disableGutters>
              <Typography
                variant="button"
                className="pointer"
                onClick={() => setPanel(value)}
              >
                {value}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={9}>
        <GetPanel panel={panel} />
      </Grid>
    </Grid>
  );
};
