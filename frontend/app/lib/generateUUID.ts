
export async function generateUUID() {
  let userNum = "";
  let digits = "1A2B3C35EGH3HDU75RU7GBBYEZ";
  for (let i = 0; i < 17; i++) {
    userNum += digits[Math.floor(Math.random() * 10)];
  }
  return userNum;
}
