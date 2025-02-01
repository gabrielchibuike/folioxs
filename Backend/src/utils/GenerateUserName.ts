export async function generateUserName(firstname: string, lastname: string) {
  let userNum = "";
  let digits = "1234567890";
  for (let i = 0; i < 4; i++) {
    userNum += digits[Math.floor(Math.random() * 10)];
  }
  const userName = firstname + lastname + userNum;
  return userName;
}
