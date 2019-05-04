export const initialState = {
  user_id : null,
  username: localStorage.getItem("username"),
  password: null,
  name : null,
  email : null,
  point : null,
  mySNU_verified : null,
  mySNU_verification_token: localStorage.getItem("token"),
  meetings : null,

  meeting_list : localStorage.getItem("meeting_list")
};
