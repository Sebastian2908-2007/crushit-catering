import { transporter } from "@/emailerConfig/nodemailer";

const handler = async (req, res) => {
  const data = req.body;
  console.log('HANDLEr',data);
  if (!data || !data.orderNumber || !data.userEmail ) {
    return res.status(400).send({ message: "Bad request" });
  }
  const adminEmail = process.env.MAILER_EMAIL
  const   mailOptions = {
    from: adminEmail,
    to: data.userEmail,
  };
  if (req.method === "POST") {
    try {
      await transporter.sendMail({
        ...mailOptions,
        html:`<h1/>Thanks For Your order!</h1>
       <p>
      your order is on its way! here is your conformation number make sure
      to keep it handy if you are picking up your order in person
       </p>
       <span>
       ${data.orderNumber}
       </span>
       `,
        subject: 'Order Conformation',
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;
