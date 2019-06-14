export const initialState = {
  user_id : sessionStorage.getItem("user_id"),
  username : sessionStorage.getItem("username"),
  password : sessionStorage.getItem("password"),
  name : sessionStorage.getItem("name"),
  email : sessionStorage.getItem("email"),
  phone_number : sessionStorage.getItem("phone_number"),
  point : null,
  mySNU_verification_token : sessionStorage.getItem("mySNU_verification_token"),
  phone_verification_token : sessionStorage.getItem("phone_verification_token"),

  meetinglist_impending : sessionStorage.getItem("impending"),
  meetinglist_recent : sessionStorage.getItem("recent"),
  meetinglist_lead : sessionStorage.getItem("lead"),
  meetinglist_join : sessionStorage.getItem("join"),
  meetinglist_history : sessionStorage.getItem("history"),
  meetinglist_list : sessionStorage.getItem("kind"),
  meetinglist_all : sessionStorage.getItem("all"),
  page_num : sessionStorage.getItem("page_num"),
  comments : null,
  
  check_leader_click : false
};
