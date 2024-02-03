import { document } from "./document.sql";
import { db } from "../drizzle";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { randomUUID } from "crypto";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { Config } from "sst/node/config";
import { z } from "zod";
import { RetrievalQAChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

const pc = new Pinecone({
  apiKey: Config.PINECONE_API_KEY,
});

const index = pc.index("test");

// Copy paste from SO have no idea how it works
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

  return id;
}

export async function listDocuments() {
  return await db.select().from(document);
}

export const answerQuestionSchema = z.object({
  question: z.string(),
  id: z.string(),
});

export async function answerQuestion({
  question,
  id,
}: z.infer<typeof answerQuestionSchema>) {
  const store = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: Config.OPENAI_API_KEY,
    }),
    {
      pineconeIndex: index,
      namespace: id,
    }
  );

  const llm = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0,
    openAIApiKey: Config.OPENAI_API_KEY,
  });

  // Used this because it kept giving answers that weren't in the context.
  // Found out how to do this from https://github.com/langchain-ai/langchainjs/issues/1841
  const template = `Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
    Question: {question}
    Context: {context}`;

  const qa = RetrievalQAChain.fromLLM(llm, store.asRetriever(), {
    prompt: new PromptTemplate({
      template,
      inputVariables: ["context", "question"],
    }),
  });

  const res = await qa.invoke({
    query: question,
  });

  return {
    question,
    answer: res.text,
  };
}
