export async function generateOtp() {
  let digit = "1234567890";
  let otp = "";
  for (let i = 0; i < 5; i++) {
    otp += digit[Math.floor(Math.random() * 10)];
  }
  return otp
  // const timeTokenSent = new Date().getTime();
  //   const token = jwt.sign(
  //     { email: email },
  //     process.env.ACCESS_TOKEN_PRIVATE_KEY!,
  //     { expiresIn: "60s" }
  //   );

  //   const query = "update user_info set otpcode = ? where email = ?";
  //   const [rows] = await con.query<ResultSetHeader>(query, [otp, email]);
  //   if (rows.affectedRows == 0) return res.status(500).send("Db Error");
  //   res.status(200).send(token);

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "gabrielnwagu2002@gmail.com",
  //     pass: "joaayblzmjukvrmp",
  //   },
  // });
  // const mailOptions = {
  //   from: "gabriel2002@gmail.com",
  //   to: "gabrielnwagu2002@gmail.com",
  //   subject: "verify Email",
  //   html: `<h3>Your Verification Code is${otp} </h3>`,
  // };

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(info);
  //   }
  // });
}
