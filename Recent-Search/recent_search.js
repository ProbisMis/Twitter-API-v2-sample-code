// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

import Needle from 'needle';
import Dotenv from 'dotenv';

Dotenv.config();

const token = process.env.TWITTER_ACCESS_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

export async function getRequest(highestTweetId) {

    const params = {
        'query': '#NFTcommunity OR #NFTdrop OR #apeNft', //#NFTcommunity OR #NFTdrop OR #apeNft
        'since_id' : highestTweetId,
        'max_results': 15,
        'tweet.fields': 'author_id,conversation_id,created_at,geo,id,lang,source,text'
    }

    const res = await Needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

