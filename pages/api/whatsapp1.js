const accountSid = "AC3c3f64882e4173a0411b1f6eb39af7c8";
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

export default function handler(req, res) {
  const message = req.body.message;
  const phoneNumber = "+916382549628";
  console.log(message)
  // Send the message using Twilio
  client.messages
    .create({
      body: `${message}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phoneNumber}`,
    })
    .then(() => {
      // Send a success response to the client
      res.status(200).json({ message: "Message sent successfully!" });
    })
    .catch((error) => {
      // Send an error response to the client
      res.status(500).json({ message: "Error sending message: " + error });
    });
}
