//import { getRequest } from './Tweet-Lookup/get_tweets_with_bearer_token.js';
import { getRequest } from './Recent-Search/recent_search.js';
import { replyToTweet } from './Manage-Tweets/create_reply.js';
import { getUser } from './User-Lookup/get_users_with_id.js';
import fs from 'fs';


getRecentTweets(async function(response) {
    response.data.forEach(async function(value){
        const userResponse = await getUser(value.author_id);
        //console.log("User is: \n" + userResponse.data.toString());
        if (value.text.startsWith("RT"))
        {
            console.log("Begins with RT Skipping");
            return;
        }       
      
        if (value.conversation_id != value.id)
        {
            console.log("This is a reply skipping");
            return;
        }

        await replyToTweet(value.id, userResponse.data.username);
            
        
    });
});

function getRecentTweets(cb)
{
    getHighestTweetId(async function(data) {

        const response = await getRequest(data);

        if (response  != undefined && response.meta != undefined && response.meta.newest_id != undefined)
        {  
            const num = Number(response.meta.newest_id);
            if (Number.isInteger(num))
            {   
                writeToFile(response.meta.newest_id);
                cb(response);
            }
        }
       }); 
}

function getHighestTweetId(cb)
{
    fs.readFile('helloworld.txt', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        cb(data);
      }); 
}


function writeToFile(highestTweetId)
{
    fs.writeFile('helloworld.txt', highestTweetId, function (err) {
        if (err) return console.log(err);
      });
}


