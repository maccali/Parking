// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const hello = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId || "" },
      properties: {
        title: {
          title: [
            {
              text: {
                content: "Blue Barry API",
              },
            },
          ],
        },
        tags: {
          multi_select: [
            {
              // id: "ca0806cb-b2a2-4411-94da-6044b154ff3a",
              name: "red 1333",
              color: "red",
            },
            {
              // id: "aa702282-a3bf-4d94-88df-7e853357dfbf",
              name: "blue 222",
              color: "blue",
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error.body);
    res.status(500).json(error);
  }
};

export default hello;
