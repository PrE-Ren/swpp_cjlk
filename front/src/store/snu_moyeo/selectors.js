export const initialState = {
  // Account
  user_id : sessionStorage.getItem("user_id"),
  username : sessionStorage.getItem("username"),
  password : sessionStorage.getItem("password"),
  name : sessionStorage.getItem("name"),
  email : sessionStorage.getItem("email"),
  phone_number : sessionStorage.getItem("phone_number"),
  point : sessionStorage.getItem("point"),
  mySNU_verification_token : sessionStorage.getItem("mySNU_verification_token"),
  phone_verification_token : sessionStorage.getItem("phone_verification_token"),
  email_open: false, 
  phone_open: false,

  // MeetingLoad
  meetinglist_impending : sessionStorage.getItem("impending"),
  meetinglist_recent : sessionStorage.getItem("recent"),
  meetinglist_lead : sessionStorage.getItem("lead"),
  meetinglist_join : sessionStorage.getItem("join"),
  meetinglist_history : sessionStorage.getItem("history"),
  meetinglist_list : sessionStorage.getItem("kind"),
  meetinglist_all : sessionStorage.getItem("all"),
  page_num : sessionStorage.getItem("page_num"),

  // Admin
  report_list : sessionStorage.getItem("report_list"),

  // Comment
  comments : sessionStorage.getItem("comments"),
  is_comment_loaded : false,

  // UserLoad
  is_leader_loaded : false,
  is_member_loaded : false,

  // OtherFunc
  is_search_loaded : false,
  is_captcha_loaded : false,
  is_captcha_verified : false
};
