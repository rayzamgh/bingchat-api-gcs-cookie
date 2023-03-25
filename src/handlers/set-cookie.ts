import { Request, Response } from "express";
import { Storage } from '@google-cloud/storage';
import fs from "fs";

const projectId = 'portfolio-web-249407'

async function setCookie(req: Request, res: Response) {
  try {
    const cookieString = req.body.cookie;
    if (!cookieString) {
      throw new Error("Missing required parameters: cookie");
    }

    // Create a client instance
    const storage = new Storage({
      projectId,
      keyFilename: './portfolio-web-249407-5cae3c51b1d6.json'
    });

    // Access the bucket
    const bucket = storage.bucket('cookiebingchat');
    // Write to a file in the bucket
    const file = bucket.file('cookie.txt');
    const contents = cookieString;
    file.save(contents, {
      contentType: 'text/plain',
    }, (err: any) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return;
      }
      console.log(`File written to ${file.name}`);
    });

    res.status(200).json({ message: "Cookie set" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default setCookie;
