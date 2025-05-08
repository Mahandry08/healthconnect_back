import EmailService from "../services/EmailService";

const sendEmailController = async (req: any, res: any) => {
    const { to, subject, text, html } = req.body;

    try {
      await EmailService.sendEmail({
        to, 
        subject, 
        text, 
        html
      });

      res.status(200).json({success: true, message: 'Email sent successfully' });

    } catch (e: any) {
        console.error(e);
        res.status(500).json({succes: false, message: 'There is an error while sending the email', error : e });
    }
};

export default{
    sendEmailController
}
