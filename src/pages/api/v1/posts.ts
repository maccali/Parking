// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const hello = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId || "",
      //   page_size: 5,
      //   start_cursor: "617ede58-05b6-42e1-8121-1c2dfbcc2309",
    });
    // const response = await notion.pages.retrieve({
    //   page_id : "498dd43ab1334597ae05f80feb624606" || "",

    // });
    // const response = await notion.blocks.children.list({
    //   block_id: "94cb45a88d2c449b9a839384add644a2" || "",
    // });
    console.log(response);
    console.log("Success! Entry added.");
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error.body);
    res.status(500).json(error);
  }
};

export default hello;
