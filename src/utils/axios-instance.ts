import axios from "axios";
import { Storage } from '@google-cloud/storage';
import fs from "fs";

const projectId = 'portfolio-web-249407'

export async function getCookie(): Promise<string> {

  let cookiestring = ""

  // Create a client instance
  const storage = new Storage({
    projectId,
    keyFilename: './portfolio-web-249407-5cae3c51b1d6.json'
  });

  // Access the bucket
  const bucketName = 'cookiebingchat';
  const fileName = 'cookie.txt';
  const file = storage.bucket(bucketName).file(fileName);

  // Read from a file in the bucket
  try {
    const data = await file.download();
    cookiestring = data[0].toString();
  } catch (err) {
    console.error('Error downloading file:', err);
  }

  console.log("COOKIE STRING GOT:")
  console.log(cookiestring)

  return cookiestring;
}

const instance = axios.create({
  baseURL: "https://www.bing.com",
  headers: {
    "content-type": "application/json",
    referer: "https://www.bing.com/",
    origin: "https://www.bing.com",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50",
  },
});

export default instance;
