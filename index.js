//import { getRequest } from './Tweet-Lookup/get_tweets_with_bearer_token.js';
import { getRequest } from './Recent-Search/recent_search.js';
import { replyToTweet } from './Manage-Tweets/create_reply.js';
import { getUser } from './User-Lookup/get_users_with_id.js';
import fs from 'fs';


getRecentTweets(async function(response) {
    response.data.forEach(function(value){
        const username = getUser(value.author_id);
        replyToTweet(value.conversation_id, username);
        console.log(value);
    });
});

function getRecentTweets(cb)
{
    getHighestTweetId(async function(data) {
        console.log(data);
        const response = await getRequest(data);
        console.log(response);
        if (response  != undefined && response.meta != undefined && response.meta.newest_id != undefined)
        {   
            console.log("IN")
            const num = Number(response.meta.newest_id);
            if (Number.isInteger(num))
            {   h
                console.log("NUM YES")
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
        console.log('Hello World > helloworld.txt');
      });
}


