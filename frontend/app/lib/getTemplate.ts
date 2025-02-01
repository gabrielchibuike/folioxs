import { domain } from "../config/domain";

export default async function getTemplate() {
  const templates = await fetch(`${domain}/api/get_all_template`);
  if (!templates.ok){
    // console.log(templates.text());
    throw new Error("failed to fetch");
  } 
  return templates.json();
}
