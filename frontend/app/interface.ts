export interface InputsTypes {
  title: string;
  bio: string;
  socialHandle: {}[];
  userName: string;
  selected_template?: any[];
}

export type socialHandleType = {
  img: string;
  name: string;
  placeHolder: string;
  //  name:string
  value: string;
};
