export const initialState = {
  username: localStorage.getItem("username"),
  password: localStorage.getItem("password"),
  name : null,
  email : null,
  point : null,
  mySNU_verified : null,
  mySNU_verification_token: localStorage.getItem("token"),
  meetings : null,

  meeting_list : localStorage.getItem("meeting_list"),
  user_id : localStorage.getItem("user_id")
};
