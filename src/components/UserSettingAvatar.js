import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import { Form, Upload, Button, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { storage } from "./../utils/firebaseConfig";
import { login } from "./../reducers/account";

export const UserSettingAvatar = () => {
  const [newAvatar, setNewAvatar] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const { user, avatar, userId, role, token } = useSelector(
    (state) => state.account
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (newAvatar.type.split("/")[0] === "image") {
      const uploadImg = storage.ref(`images/${newAvatar.name}`).put(newAvatar);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          // eslint-disable-next-line
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(newAvatar.name)
            .getDownloadURL()
            .then((url) => {
              setNewAvatarUrl(url);

              dispatch(login({ user, avatar: url, userId, role, token }));
            });
        }
      );
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        text: "avatar have to be image file",
      });
    }
  };

  const submitAvatar = () => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/user/` + userId,
          {
            avatar: newAvatarUrl,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your change saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (newAvatarUrl) submitAvatar();
    // eslint-disable-next-line
  }, [newAvatarUrl]);

  useEffect(() => {
    console.log(newAvatar);
    // eslint-disable-next-line
  }, [newAvatar]);

  return (
    <>
      <h1 className="title">your avatar</h1>

      <div className="box">
        <Avatar className="avatarImg" src={avatar} size={100} />

        <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item
            name="LessonName"
            rules={[
              {
                required: true,
                message: "Please input your file",
              },
            ]}
          >
            <Upload
              name="logo"
              method="GET"
              action=""
              listType="picture"
              maxCount={1}
              onChange={(e) => setNewAvatar(e.fileList[0])}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <TextField
            onChange={(e) => setNewAvatar(e.target.files[0])}
            fullWidth
            type="file"
            id="newAvatar"
            label="newAvatar"
            placeholder="newAvatar"
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
