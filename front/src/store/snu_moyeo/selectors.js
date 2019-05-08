export const initialState = {
  user_id : localStorage.getItem("user_id"),
  username: localStorage.getItem("username"),
  password: localStorage.getItem("password"),
  name : localStorage.getItem("name"),
  email : localStorage.getItem("email"),
  point : null,
  mySNU_verified : null,
  mySNU_verification_token: localStorage.getItem("token"),
  meetings : null,

  meeting_list : localStorage.getItem("meeting_list")
};
