export const initialState = {
  user_id : localStorage.getItem("user_id"),
  username: localStorage.getItem("username"),
  password: localStorage.getItem("password"),
  name : localStorage.getItem("name"),
  email : localStorage.getItem("email"),
  point : null,
  mySNU_verified : null,
  mySNU_verification_token: localStorage.getItem("token"),

  meetinglist_impending: localStorage.getItem("impending"),
  meetinglist_recent: localStorage.getItem("recent"),
  meetinglist_lead: null,
  meetinglist_join: null,
  meetinglist_history: null,
};
