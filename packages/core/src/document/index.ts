import { NewDocument, document } from "./document.sql";
import { db } from "../drizzle";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { randomUUID } from "crypto";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Config } from "sst/node/config";

const pc = new Pinecone({
  apiKey: Config.PINECONE_API_KEY,
});

const index = pc.index("test");

function getYoutubeId(url: string) {
  const x = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return x[2] !== undefined ? x[2].split(/[^0-9a-z_\-]/i)[0] : x[0];
}

export async function createDocument(source: string) {
  const loader = YoutubeLoader.createFromUrl(source, {
    language: "en",
    addVideoInfo: true,
  });

  const docs = await loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: " ",
      chunkSize: 2500,
      chunkOverlap: 100,
    })
  );

  const name = docs[0].metadata.title;

  const id = randomUUID();
  await db.insert(document).values({
    id,
    source,
    name,
    thumbnail: `https://i.ytimg.com/vi/${getYoutubeId(source)}/mqdefault.jpg`,
  });

  await PineconeStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: Config.OPENAI_API_KEY,
    }),
    {
      pineconeIndex: index,
      namespace: id,
    }
  );
}

export async function listDocuments() {
  return await db.select().from(document);
}

export async function answerQuestion(question: string) {
  return {
    question,
    answer: "foo",
  };
}
