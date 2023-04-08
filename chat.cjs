require("dotenv").config();
const client = require("twilio")(
  "AC178918cf254b1241ab1e05fba94e2de5",
  "4ac207daf85b75815f74aa03031d29e4"
);

client.conversations.v1.conversations
                       .create({identity: 'My First Conversation'})
                       .then(conversation => console.log(conversation.sid));

client.conversations.v1.conversations('CH7493a964e5fb4fe4a3966dc31796aa6a')
      .fetch()
      .then(conversation => console.log(conversation.chatServiceSid));


client.conversations.v1.conversations('CH7493a964e5fb4fe4a3966dc31796aa6a')
  .participants
  .create({
     'messagingBinding.address': '+919506846608',
     'messagingBinding.proxyAddress': '+14406414438'
   })
  .then(participant => console.log(participant.sid));