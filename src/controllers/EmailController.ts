import { sendEmail } from "../services/EmailService";

const sendEmailController = async (req: any, res: any) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const info = await sendEmail(to, subject, message);
    
    if(info){
        res.json({ success: true, message: "Email sent successfully!", info });
    }    
  } catch (error) {
    res.status(500).json({ error: "Failed to send email"});
  }
};

export default{
    sendEmailController
}
