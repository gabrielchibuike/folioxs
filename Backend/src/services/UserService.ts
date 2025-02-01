import { userTypes } from "../Interface/TemplateTypes";
import UserDetails from "../model/UserModel";

export async function create_user_service(email: string, password: string) {
  const result = await UserDetails.create({
    email,
    password,
  });
  return result;
}

export async function getUser_info_service({
  id,
  filename,
  title,
  bio,
  socialHandle,
  userName,
  selected_template,
}: {
  id: string;
  filename: string;
  title: string;
  bio: string;
  socialHandle: [];
  userName: string;
  selected_template: [];
}) {
  const result = await UserDetails.findOneAndUpdate(
    { _id: id },
    {
      profileName: title,
      bio,
      profileImg: filename,
      socialHandle,
      userName,
      selected_template: selected_template,
    },
    { new: true }
  );
  return result;
}

export async function login_user_service(email: string, password: string) {
  const result = await UserDetails.findOne({
    email,
    password,
  });
  return result;
}

export async function get_user_email_service(email: string) {
  const isExisting = await UserDetails.findOne({
    email,
  });
  return isExisting;
}

export async function verify_otp_service(otp: string) {
  const result = await UserDetails.findOneAndUpdate(
    { otp: otp },
    { verified: "yes" },
    { new: true }
  );
  return result;
}

export async function find_user(email: string) {
  const result = await UserDetails.findOne({ email });
  return result;
}

export async function validate_userName_service(userName: string) {
  const result = await UserDetails.findOne({ userName });
  return result;
}
