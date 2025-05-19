---

sidebar: false
---
# WeHack 2024 – Custom LLM Chatbot with LangChain

**Team Members:** Courtney Dickenson, Tushar Wani, Ariel Ong, Ryan Farley
**Role:** Backend Architecture, LangChain Integration, Full Stack Deployment
**Tools:** Node.js, LangChain, OpenAI API, Django, Express.js, Vite, TailwindCSS, Docker

---

## Project Overview

Built in 24 hours at **WeHack 2024**, this project is a **document-aware chatbot** that lets users upload `.txt` files and ask questions about them. We combined **vector retrieval** and **LLM generation** using **LangChain**, building the full stack from scratch and deploying it in a Dockerized environment.

---

## Stack Highlights

* 🧠 **LangChain + GPT-3.5-turbo** for Retrieval-Augmented Generation (RAG)
* ⚙️ **Express.js** backend as LLM controller
* 🌐 **Django server** for structured view logic and user routing
* 🎨 **Vite + TailwindCSS** frontend UI
* 🐳 **Dockerized full stack** with isolated services for hot reload and modular dev

---

## 🔧 Key Features

* **Contextual Q\&A via LangChain**
  Upload `.txt` files and get grounded responses with document-based vector retrieval.

* **Dynamic Prompt Engineering**
  Used `ChatPromptTemplate` for fine-tuned response shaping.

* **Layered API Separation**
  Express.js handled LLM routing, Django managed backend logic — clean and modular.

* **Fast Frontend UI**
  Lightweight, responsive chat interface built with Vite + Tailwind.

---

## 📁 System Architecture

```bash
├── frontend/          # Vite + Tailwind UI
├── backend/           # LangChain + Express.js LLM API
├── server/            # Django server (views, models, routing)
└── docker-compose.yml # Container orchestration
```

---

### 🧠 LangChain Pipeline Logic (JavaScript)

```js
const model = new OpenAI({ modelName: 'gpt-3.5-turbo-instruct' });
const loader = new TextLoader('./example.txt');
const docs = await loader.load();

const prompt = ChatPromptTemplate.fromTemplate(`Answer based on:\n<context>\n{context}\n</context>\nQuestion: {input}`);
const chain = await createStuffDocumentsChain({ llm: model, prompt });

const embeddings = new OpenAIEmbeddings();
const vectorstore = await MemoryVectorStore.fromDocuments(docs, embeddings);
const retriever = vectorstore.asRetriever();

const retrievalChain = await createRetrievalChain({ combineDocsChain: chain, retriever });
const result = await retrievalChain.invoke({ input: 'What is LangSmith?' });
```

---

## 🛠️ DevOps & Deployment

* **Docker Compose**: Unified services and enabled parallel development
* **Live Reload**: Hot reloading set up for Node + Vite workflows
* **Port Isolation**: Each service ran on a distinct port with mapped access

---

## 🧪 Challenges and Fixes

### 📚 LangChain Documentation Overload

**Issue:** Constant class migrations and shallow docs (e.g., `retrievalChain`, `StuffDocumentsChain`)

**Fix:** Read through LangChain GitHub issues and reverse-engineered working chains from fragmented code samples

---

### 🔄 Async Inconsistencies

**Issue:** Retrieval chain returned `undefined` despite full pipeline

**Fix:** Refactored async logic, improved error logging, and validated each layer's return values

---

### ⚠️ Package Deprecation Whiplash

**Issue:** Classes like `ChatOpenAI` suddenly moved packages

**Fix:** Switched to `@langchain/openai` and `@langchain/community` where stable documentation lived

---

### ♻️ 3AM Full Stack Pivot

**Issue:** LangChain’s Python stack (with FastAPI) was unstable mid-hack

**Fix:** We pivoted entirely to **Node.js + Express** to reduce cross-stack bugs and save the deadline

---

## ✅ Final Results

* 🚀 Fully working RAG chatbot MVP in < 24 hours
* 🔗 LangChain + OpenAI + custom document processing
* 📆 Dockerized dev setup with real-time hot reload
* 🧠 Delivered grounded, usable LLM responses live on demo day

---

## 🔮 Future Plans

* Support for **PDF, Markdown, CSV ingestion**
* Add **persistent vector DB** like Pinecone or Qdrant
* Build out a **multi-user dashboard** with file history
* Add **voice input support** via Web Speech API

---

## 💬 Key Takeaways

* We made LangChain work under pressure — even mid-migration
* I built and deployed a **multi-stack LLM app** with Dockerized services and integrated frontend/backend logic
* This project taught us to debug fast, deploy clean, and pivot hard when needed — and we still crossed the finish line on time

---
