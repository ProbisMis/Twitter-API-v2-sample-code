// Get User objects by username, using bearer token authentication
// https://developer.twitter.com/en/docs/twitter-api/users/lookup/quick-start

import needle from 'needle';
import Dotenv from 'dotenv';

Dotenv.config();

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.TWITTER_ACCESS_TOKEN;

const endpointURL = "https://api.twitter.com/2/users/"

export async function getUser(id) {

    // These are the parameters for the API request
    // specify User names to fetch, and any additional fields that are required
    // by default, only the User ID, name and user name are returned
    const params = {
        "user.fields": "created_at,description"
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL + id, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request')
    }
}

