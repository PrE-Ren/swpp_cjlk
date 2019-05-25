export const initialState = {
  user_id : localStorage.getItem("user_id"),
  username : localStorage.getItem("username"),
  password : localStorage.getItem("password"),
  name : localStorage.getItem("name"),
  email : localStorage.getItem("email"),
  phone_number : localStorage.getItem("phone_number"),
  point : null,
  mySNU_verified : null,
  mySNU_verification_token : localStorage.getItem("token"),

  meetinglist_impending : localStorage.getItem("impending"),
  meetinglist_recent : localStorage.getItem("recent"),
  meetinglist_lead : localStorage.getItem("lead"),
  meetinglist_join : localStorage.getItem("join"),
  meetinglist_history : localStorage.getItem("history"),
  meetinglist_list : localStorage.getItem("list"),
  page_num : localStorage.getItem("page_num")
};
