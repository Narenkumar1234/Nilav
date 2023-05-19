const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);

export default function handler(req, res) {
  const message = req.body.message;
  const phoneNumber = "+918940550534";
  console.log(message);
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
