import sender from "../configs/EmailConfig";

export const sendEmail = async (to: string, subject: string, message: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    };

    const info = await sender.sendMail(mailOptions);
    if(info){
        console.log("Lasa le izy lekaaaa!!!!!!");
        return info;
    }
    
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
};
