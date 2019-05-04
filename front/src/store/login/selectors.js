export const initialState = {
  user_id : null,
  username: localStorage.getItem("user"),
  password: null,
  name : null,
  email : null,
  point : null,
  mySNU_verified : null,
  mySNU_verification_token: localStorage.getItem("token"),
  meetings : null,
};

