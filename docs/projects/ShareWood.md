---
sidebar: false
---
# ShareWood – Real Estate Investment Platform (HackUTD 3rd Place)  
**Team Members:** Courtney Dickenson, Ryan Farley, Tushar Wani, Jarrod Rogers  
**Role:** Frontend Architecture, ML Model Integration, Firebase Auth, UI Design  
**Tools:** Vue.js, Quasar, Firebase, FastAPI, Python, Hugging Face ViLT, SCSS  

---
## Project Overview  
**ShareWood** is a hackathon-built platform that enables **fractional property investment** through an AI-assisted interface. Created in 24 hours at **HackUTD**, the platform placed **3rd overall**, judged by CBRE (Commercial Real Estate).

It leverages **ViLT**, a vision-and-language transformer, to evaluate property condition from listing descriptions and uploaded images. Results are used to assist users in making smart, risk-aware investments.

### Stack Snapshot:  
- 🔍 **ViLT-based ML pipeline** – property risk analysis using visual question answering  
- 🛠️ **Vue + Quasar** frontend – responsive, mobile-first UI  
- 🔐 **Firebase** backend – real-time data and auth  
- ⚙️ **FastAPI backend** – handles share transactions and ML hooks

<!-- ![ShareWood Screenshot](./assets/sharewood_mvp_ui.png) -->

---
## Key Features  

- **Visual Investment Scoring:**  
  ML model evaluates text/image pairs to assess property quality, damage, and safety.

- **Firebase Authentication & Shares:**  
  Users log in and assign fractional investment shares. Updates sync to Firebase in real time.

- **Quasar-Powered Interface:**  
  UI built using Quasar for component reusability, mobile responsiveness, and fast prototyping.

---
## System Architecture  

### 🔧 Backend API (FastAPI + Firebase)  
- **FastAPI** routes handle investment logic and authentication requests.  
- **Firebase Firestore** stores user data and property listings.

**Example Routes:**
- `POST /buy`, `POST /sell` — Transaction logic  
- `POST /register`, `POST /login` — Auth endpoints  
- `POST /value` — Placeholder route for ML scoring integration

```python
@app.post("/buy/")
async def process_buy(req: RequestBody):
    return req
````

### 🔐 CORS + Auth

* Full CORS enabled for local testing (`localhost`)
* Firebase Authentication managed session state and protected routes.

### 🔗 Firestore Property Access

Property metadata was accessed during API startup:

```python
users_ref = db.collection("properties")
docs = users_ref.stream()
for doc in docs:
    print(f"{doc.id} => {doc.to_dict()}")
```

---

## Machine Learning Pipeline

We used **Hugging Face’s ViLT model** (`dandelin/vilt-b32-finetuned-vqa`) for **vision-language question answering**. The system asked structured natural-language questions to inspect and grade property photos.

Example queries:

* *Is this the inside or outside of a building?*
* *Do the walls have cracks?*
* *Is the floor made of wood, tile, or marble?*
* *Would it be a safe neighborhood to live in?*

```python
from transformers import ViltProcessor, ViltForQuestionAnswering

def answer_question(question, image_path):
    processor = ViltProcessor.from_pretrained("dandelin/vilt-b32-finetuned-vqa")
    model = ViltForQuestionAnswering.from_pretrained("dandelin/vilt-b32-finetuned-vqa")
    image = Image.open(image_path)
    encoding = processor(image, question, return_tensors="pt")
    outputs = model(**encoding)
    top_prediction = model.config.id2label[outputs.logits.argmax(-1).item()]
    return top_prediction
```

The answers were compiled into a property data profile (`data_set`) to estimate condition and risk level for potential investors.

---

## Challenges and Fixes

### 🔐 Firebase Auth Hiccups

* **Issue:** Auth state wasn’t syncing during hot reloads
* **Fix:** Added `onAuthStateChanged` listeners and route guards

### 🧠 Model Runtime Limitations

* **Issue:** Hugging Face inference was slow on local machines
* **Fix:** Cached answers and ran batched queries ahead of time

### 💻 Styling Conflicts

* **Issue:** Layout issues from last-minute component merges
* **Fix:** Resolved with scoped SCSS and layout isolation

---

## Results

* ✅ Fully functioning MVP with end-to-end auth, investment logic, and ML scoring
* 🥉 Placed 3rd at HackUTD judged by CBRE
* 🔄 Successfully demoed frontend-backend interaction and AI reasoning live

---

## Future Plans

* Add blockchain for **tokenized property shares**
* Personalize investment suggestions using user behavior and ratings
* Expand image models to include **satellite views and neighborhood sentiment**

---

## Key Takeaways

* Hackathon environments reward focus, modularity, and UI polish under pressure
* **ViLT + VQA** offers a novel way to interpret unstructured real estate data
* The project proves that **ML-backed real estate investing** can be user-friendly, scalable, and fun

---

