import { Request, Response } from "express";
import {
  create_project_service,
  delete_project_service,
  edit_project_service,
  // edit_support_service,
  get_all_template_service,
  get_user_template_service,
  select_template_service,
  update_user_template_record_service,
} from "../services/TemplateService";
import { find_user } from "../services/UserService";

export async function get_all_template_controller(req: Request, res: Response) {
  try {
    const get_template = await get_all_template_service();

    if (get_template.length > 0) return res.send(get_template);
  } catch (err) {
    return res.send(err);
  }
}

export async function select_template_controller(req: Request, res: Response) {
  try {
    const { userId, email } = req.params;

    const value = req.body;
    const data = await select_template_service(
      userId as string,
      email as string,
      value
    );

    return res.send("success!!");
  } catch (err) {
    return res.send("something went wrong!!");
  }
}

export async function get_user_template_controller(
  req: Request,
  res: Response
) {
  try {
    const { userId } = req.params;
    console.log(userId);

    const get_template = await get_user_template_service(userId as string);

    const result = get_template?.selected_template;

    console.log(result);

    if (result!.length > 0) {
      const email = get_template?.email;
      const data = await find_user(email as string);

      const userProfileImg = data?.profileImg;
      const userProfileName = data?.profileName;
      const userBio = data?.bio;
      const userSocialHandle = [];
      userSocialHandle.push(data?.socialHandle[0]);
      const userLink = get_template?.selected_template[0].links;
      const bankDetails = get_template?.selected_template[0].bankDetails;

      const x = await update_user_template_record_service(
        userId,
        userProfileImg,
        userProfileName,
        userBio,
        userSocialHandle,
        userLink,
        bankDetails
      );
    }
    console.log(result);

    return res.send(result);
  } catch (err) {
    return res.send(err);
  }
}

// PROJECT LINK CONTROLLER
export async function create_project_controller(req: Request, res: Response) {
  try {
    const { linkId, email, title, link, linkImage } = req.body;

    const userData = await find_user(email as string);

    const userProfileImg = userData?.profileImg;
    const userProfileName = userData?.profileName;
    const userBio = userData?.bio;
    const userSocialHandle = [];
    userSocialHandle.push(userData?.socialHandle[0]);

    const data = await create_project_service(
      linkId,
      email,
      title,
      link,
      linkImage,
      userProfileImg,
      userProfileName,
      userBio,
      userSocialHandle
    );

    // console.log(data);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
}

export async function edit_project_controller(req: Request, res: Response) {
  try {
    const image = req.file!;

    const { email, title, link, linkId } = JSON.parse(req.body.jsonData);

    const userData = await find_user(email as string);

    const userProfileImg = userData?.profileImg;
    const userProfileName = userData?.profileName;
    const userBio = userData?.bio;
    const userSocialHandle = [];
    userSocialHandle.push(userData?.socialHandle[0]);

    const data = await edit_project_service(
      email,
      title,
      link,
      linkId,
      image ? image.filename : "",
      userProfileImg,
      userProfileName,
      userBio,
      userSocialHandle
    );

    // console.log(data);
    return res.status(200).send(data);
    // }
  } catch (err) {
    console.log(err);
  }
}

export async function delete_project_controller(req: Request, res: Response) {
  try {
    const { linkId, email } = req.body;
    // const image = req.file!;

    // const { email, title, link, linkId } = JSON.parse(req.body.jsonData);

    const userData = await find_user(email as string);

    const userProfileImg = userData?.profileImg;
    const userProfileName = userData?.profileName;
    const userBio = userData?.bio;
    const userSocialHandle = [];
    userSocialHandle.push(userData?.socialHandle[0]);

    const data = await delete_project_service(
      email,
      linkId,
      userProfileImg,
      userProfileName,
      userBio,
      userSocialHandle
    );

    // console.log(data);
    return res.status(200).send(data);
    // }
  } catch (err) {
    console.log(err);
  }
}
