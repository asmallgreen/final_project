import "dotenv/config.js";
import {google} from 'googleapis'


const googleOAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

export default googleOAuth2Client;