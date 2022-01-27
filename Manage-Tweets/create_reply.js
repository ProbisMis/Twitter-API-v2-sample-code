import Twit from 'twit';
import Dotenv from 'dotenv';

Dotenv.config();

const T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
  
export async function replyToTweet(replyToId, replyToUsername) {
  const tweet = () => {
    const text = "@" + replyToUsername +  "\n Hey, check this I think you will like it 🥂 \n https://twitter.com/teenageapenc/status/1480662210254938120?s=21";  
    if (replyToId == undefined)
      return;
    const onFinish = (err, reply) => {
      if (err) {
        console.log("Error: ", err.message);
      } else {
        console.log("Success: ", reply);
      }
    };
  
    T.post("statuses/update", { status:text,in_reply_to_status_id:replyToId,username:replyToUsername}, onFinish);
  };
  
  tweet();
}