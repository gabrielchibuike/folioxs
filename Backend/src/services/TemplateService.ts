import { templateTypes } from "../Interface/TemplateTypes";
import Templates from "../model/Templates";
import UserDetails from "../model/UserModel";

export async function get_all_template_service() {
  const get_template = await Templates.find();
  return get_template;
}

export async function select_template_service(
  userId: string,
  email: string,
  userTemplateUpdate: templateTypes
) {
  const {
    _id,
    profilePictureUrl,
    profileName,
    bio,
    socialHandle,
    links,
    bankDetails,
    templateImage,
  } = userTemplateUpdate;
  console.log(userTemplateUpdate);

  const result = await UserDetails.findOneAndUpdate(
    {
      $or: [{ _id: userId }, { email: email }],
    },
    {
      selected_template: [
        {
          _id,
          profilePictureUrl,
          profileName,
          bio,
          socialHandle,
          links,
          bankDetails,
          templateImage,
        },
      ],
    },
    { new: true }
  );

  return result;
}

export async function get_user_template_service(userId: string) {
  const get_template = await UserDetails.findOne({ _id: userId });
  return get_template;
}

export async function update_user_template_record_service(
  userId: string | undefined,
  userProfileImg: string | null | undefined,
  userProfileName: string | null | undefined,
  userBio: string | null | undefined,
  userSocialHandle: any[],
  userLink: any[],
  bankDetails: any[]
) {
  const result = await UserDetails.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      selected_template: [
        {
          profilePictureUrl: userProfileImg,
          profileName: userProfileName,
          bio: userBio,
          socialHandle: userSocialHandle,
          links: userLink,
          bankDetails: bankDetails,
        },
      ],
    },
    { new: true }
  );

  return result;
}

// PROJECT LINK SERVICE
export async function create_project_service(
  linkId: string,
  email: string,
  title: string,
  link: string,
  filename: string,
  userProfileImg: string | null | undefined,
  userProfileName: string | null | undefined,
  userBio: string | null | undefined,
  userSocialHandle: any[]
) {
  const get_template = await UserDetails.findOne({ email });

  const linkDetails = get_template?.selected_template[0].links;

  console.log(linkDetails);

  linkDetails.push({
    linkId: linkId,
    title: title,
    url: link,
    linkImage: filename,
  });

  console.log(linkDetails);

  const result = await UserDetails.findOneAndUpdate(
    {
      email: email,
    },
    {
      selected_template: [
        {
          profilePictureUrl: userProfileImg,
          profileName: userProfileName,
          bio: userBio,
          socialHandle: userSocialHandle,
          links: linkDetails,
        },
      ],
    },
    { new: true }
  );
  return result;
}

export async function edit_project_service(
  email: string,
  title: string,
  link: string,
  linkId: string,
  filename: string,
  userProfileImg: string | null | undefined,
  userProfileName: string | null | undefined,
  userBio: string | null | undefined,
  userSocialHandle: any[]
) {
  const get_template = await UserDetails.findOne({ email });

  const linkDetails = get_template?.selected_template[0].links;

  const index = linkDetails.findIndex((link: any) => link.linkId === linkId);

  if (index !== -1) {
    linkDetails[index].title = title || linkDetails[index].title;
    linkDetails[index].linkImage = filename || linkDetails[index].linkImage;
    linkDetails[index].url = link || linkDetails[index].url;
  } else {
    console.log("Record not found!");
  }

  console.log(linkDetails);

  const result = await UserDetails.findOneAndUpdate(
    {
      email: email,
    },
    {
      selected_template: [
        {
          profilePictureUrl: userProfileImg,
          profileName: userProfileName,
          bio: userBio,
          socialHandle: userSocialHandle,
          links: linkDetails,
        },
      ],
    },
    { new: true }
  );
  return result;
}

export async function delete_project_service(
  email: string,
  linkId: string,
  userProfileImg: string | null | undefined,
  userProfileName: string | null | undefined,
  userBio: string | null | undefined,
  userSocialHandle: any[]
) {
  const get_template = await UserDetails.findOne({ email });

  const linkDetails = get_template?.selected_template[0].links;

  if (linkDetails) {
    const updatedLinks = linkDetails.filter(
      (link: any) => link.linkId !== linkId
    );

    console.log(updatedLinks);

    const result = await UserDetails.findOneAndUpdate(
      {
        email: email,
      },
      {
        selected_template: [
          {
            profilePictureUrl: userProfileImg,
            profileName: userProfileName,
            bio: userBio,
            socialHandle: userSocialHandle,
            links: updatedLinks,
          },
        ],
      },
      { new: true }
    );
    return result;
  }
}

//  SUPPORT DETAILS SERVICE
// export async function edit_support_service(
//   email: string,
//   bankId: string,
//   account_name: string,
//   account_number: string,
//   bank_name: string,
//   userProfileImg: string | null | undefined,
//   userProfileName: string | null | undefined,
//   userBio: string | null | undefined,
//   userSocialHandle: any[]
// ) {
//   const get_template = await UserDetails.findOne({ email });

//   const linkDetails = get_template?.selected_template[0].links;

//   const bankDetails = get_template?.selected_template[0].bankDetails;

//   const index = bankDetails.findIndex(
//     (details: any) => details.linkId === bankId
//   );

//   if (index !== -1) {
//     bankDetails[index].account_name =
//       account_name || bankDetails[index].account_name;
//     bankDetails[index].account_number =
//       account_number || bankDetails[index].account_number;
//     bankDetails[index].bank_name = bank_name || bankDetails[index].bank_name;
//   } else {
//     console.log("Record not found!");
//   }

//   // bankDetails.push({
//   //   accountName: account_name,
//   //   accountNumber: account_number,
//   //   bankName: bank_name,
//   // });

//   // const index = linkDetails.findIndex((link: any) => link.linkId === linkId);

//   // if (index !== -1) {
//   //   linkDetails[index].title = title || linkDetails[index].title;
//   //   linkDetails[index].linkImage = filename || linkDetails[index].linkImage;
//   //   linkDetails[index].url = link || linkDetails[index].url;
//   // } else {
//   //   console.log("Record not found!");
//   // }

//   const result = await UserDetails.findOneAndUpdate(
//     {
//       email: email,
//     },
//     {
//       selected_template: [
//         {
//           profilePictureUrl: userProfileImg,
//           profileName: userProfileName,
//           bio: userBio,
//           socialHandle: userSocialHandle,
//           links: linkDetails,
//           bankDetails: bankDetails,
//         },
//       ],
//     },
//     { new: true }
//   );
//   return result?.selected_template[0].bankDetails;
// }
