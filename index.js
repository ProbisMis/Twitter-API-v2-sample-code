//import { getRequest } from './Tweet-Lookup/get_tweets_with_bearer_token.js';
import { getRequest } from './Recent-Search/recent_search.js';
import fs from 'fs';


//Retrieve highest id searched last time OK
//Search for the tweets OK
//Validate list OK 
getRecentTweets(async function(data) {
    console.log(data);
});
//Find the parent tweet 

//Comment on parent tweet 

//Deployment and automation

function getRecentTweets(cb)
{
    getHighestTweetId(async function(data) {
        console.log(data);
        const response = await getRequest(data);
        console.log(response); 
        if (response.meta.result_count == 0)
           return false;
        writeToFile(response.meta.newest_id);
        cb(response);
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


