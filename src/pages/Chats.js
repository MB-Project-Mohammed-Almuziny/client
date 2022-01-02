import { React, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Layout, Menu, Avatar } from "antd";
import "./../styles/chats.css";

// import { MessageBox, ChatItem, MessageList } from "react-chat-elements";

const { Sider, Content } = Layout;

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [chatIndex, setChatIndex] = useState(0);
  const [messages] = useState([
    {
      id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        id: 2,
        name: "React",
        avatar: "https://facebook.github.io/react/img/logo_og.png",
      },
    },
  ]);

  const { userId, token } = useSelector((state) => state.account);

  // const message = useRef(1);

  const getUserChats = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/chats/user/${userId}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          setChats(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserChats();
  }, []);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  useEffect(() => {
    console.log("index : " + chatIndex);
  }, [chatIndex]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu theme="dark" mode="inline">
          {chats.map((chat, i) => (
            <Menu.Item
              key={chat._id}
              onClick={() => setChatIndex(i)}
              icon={
                <Avatar
                  src={
                    chat.user1._id === userId
                      ? chat.user2.avatar
                      : chat.user1.avatar
                  }
                />
              }
            >
              {chat.user1._id === userId ? chat.user2.name : chat.user1.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Content>
        {/* <ChatItem
          alt={"Reactjs"}
          title={"Facebook"}
          subtitle={"What are you doing?"}
          date={new Date()}
          unread={0}
        /> */}
        {/* <MessageBox
          position={"left"}
          type={"photo"}
          text={"react.svg"}
          data={{
            uri: "https://facebook.github.io/react/img/logo.svg",
            status: {
              click: false,
              loading: 0,
            },
          }}
        /> */}

        {/* <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
          ]}
          // ref={message}
        /> */}
      </Content>
    </Layout>
  );
};
