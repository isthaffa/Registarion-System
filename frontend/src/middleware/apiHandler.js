import axios from 'axios';

const apiHandler = {
  userLogin: data => {
      console.log("api ",data);
    return axios.post("http://localhost:8080/login", {
      ...data
    });
  },
  signup:data=>{
   
    return axios.post ('http://localhost:8080/register',{
      ...data
    })
  },
  getMemberList:()=>{
    return axios.get("http://localhost:8080/user/member")
  },
  createMember:(data)=>{
    return axios.post("http://localhost:8080/user/member",{...data})
  },
  editMember:(id,values)=>{
    return axios.post(`http://localhost:8080/user/member/${id}`,values)
  },
  deleteMember:(id)=>{
    return axios.delete(`http://localhost:8080/user/member/${id}`)
  }


  
};

export default apiHandler;