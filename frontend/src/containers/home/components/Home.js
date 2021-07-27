import React, { useState, useEffect } from "react";
import { List, Avatar, Skeleton} from "antd";
import {  Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemberRequest, getMemberListRequest } from "../actions";
import NavBar from "../../../components/navBar";
import FormModal from "./FormModal";

import { memberList, isLoading } from "../selectors";

function Home(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [initLoading, setInitLoading] = useState(true);
  // const [data, setData] = useState([]);
  // const [list, setList] = useState([]);
  const member_List = useSelector(memberList);
  const loading = useSelector(isLoading);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };  

  const handleCancel = () => {
    setIsModalVisible(false);
    
  };


  useEffect(() => {
    if (!localStorage.token) {
      props.history.push("/login");
    }
  }, [props.history]);

  const getData = async () => {
    dispatch(getMemberListRequest());
    


  };
  
  // const obj=  useSelector(state=>state.homeReducer)
  
    
  useEffect(() => {
    
    getData();
    // console.log("obj",obj);
    console.log(member_List);
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Delete the item?")) {
      dispatch(deleteMemberRequest(id))
      getData();
     
    }
  };
  return (
    <div>
      <NavBar title="Home" />

      <Button
        type="primary"
        icon={<UserOutlined />}
        className="add-button"
        onClick={showModal}
      >
        add member
      </Button>
      <FormModal
        showModalVisible={isModalVisible}
        handleCancel={handleCancel}
        setModalVisible={setIsModalVisible}
        getData={getData}
      />
      <br />
      <br />

      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={member_List}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link
                key="list-loadmore-edit"
                to={{
                  pathname: `/edit-member/${item._id}`,
                  state: { member: item },
                }}
              >
                edit
              </Link>,

              <Link
                key="list-loadmore-more"
                onClick={() => {
                  deleteHandler(item._id);
                }}
              >
                delete
              </Link>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar size={50} icon={<UserOutlined />} />}
                title={<a href="#">{`${item.firstName} ${item.lastName}`}</a>}
                description={item.email}
              />

              {/* <div>content</div> */}
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
