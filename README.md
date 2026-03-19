#  Skin Cancer Classification - ViT

<p align="center">
  <img src="https://img.shields.io/badge/Model-Vision%20Transformer%20(ViT)-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Dataset-HAM10000-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Stack-React%20%7C%20Flask%20%7C%20TensorFlow-red?style=for-the-badge" />
</p>

<p align="center">
  An AI-powered web application for skin cancer detection using the <strong>Vision Transformer (ViT)</strong> architecture, trained and evaluated on the <strong>HAM10000</strong> dataset.
</p>

---

##  Table of Contents

- [About](#-about)
- [Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Model](#-model)
- [Dataset](#-dataset)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

##  About

**Skin Cancer Classification - ViT** is a full-stack AI web application that allows users to upload a skin lesion image and receive an instant classification result. The backend leverages a fine-tuned **Vision Transformer (ViT)** model trained on the HAM10000 dermatoscopy dataset to identify **7 types of skin lesions**.

---

##  Features

- 📸 **Image Upload & Detection** — Upload a skin lesion photo and get an AI-powered diagnosis
- 🤖 **ViT-based Classification** — State-of-the-art Vision Transformer model for high accuracy
- 💬 **AI Chatbot** — Integrated chatbot for skin health Q&A
- 👨‍⚕️ **Doctor Finder** — Browse and locate dermatologists
- 🌍 **Multi-language Support** — Arabic & English (i18n)
- 🔐 **Authentication** — Login, Signup, Forgot Password via Firebase
- 📱 **Responsive UI** — Mobile-friendly React frontend

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, CSS |
| Backend | Python, Flask |
| ML Model | TensorFlow / Keras, Vision Transformer (ViT) |
| Auth | Firebase Authentication |
| i18n | react-i18next |
| Dataset | HAM10000 |

---

## 📁 Project Structure

```
Skin-Cancer-Classification-ViT/
│
├── client/                     # React Frontend
│   ├── public/
│   └── src/
│       ├── pages/
│       │   ├── Home.js
│       │   ├── UploadDetect.js  # Main detection page
│       │   ├── ChatBot.js
│       │   ├── Doctors.js
│       │   ├── Login.js
│       │   ├── Signup.js
│       │   └── Tips.js
│       ├── components/
│       ├── locales/             # ar & en translations
│       ├── firebase.js
│       └── App.js
│
└── server/                     # Flask Backend
    ├── app.py                  # API server
    └── requirements.txt
```

---

##  Getting Started

### Prerequisites

- Node.js >= 16
- Python >= 3.8
- pip

---

### 1. Clone the repository

```bash
git clone https://github.com/AHMED-METAWEA/Skin-Cancer-Classification-ViT.git
cd Skin-Cancer-Classification-ViT
```

---

### 2. Setup the Backend

```bash
cd server
pip install -r requirements.txt
```

>  Download the trained model (`best_model.h5`) and place it inside the `server/` folder.
> [Download Model](#) *(add your link here — Google Drive / Hugging Face)*

```bash
python app.py
```

The server will run at `http://localhost:5000`

---

### 3. Setup the Frontend

```bash
cd client
npm install
npm start
```

The app will run at `http://localhost:3000`

---

##  Model

| Property | Details |
|----------|---------|
| Architecture | Vision Transformer (ViT) |
| Input Size | 224 × 224 |
| Classes | 7 skin lesion types |
| Dataset | HAM10000 |
| Framework | TensorFlow / Keras |

###  Classified Skin Lesions

| Label | Full Name |
|-------|-----------|
| `akiec` | Actinic Keratoses |
| `bcc` | Basal Cell Carcinoma |
| `bkl` | Benign Keratosis |
| `df` | Dermatofibroma |
| `mel` | Melanoma |
| `nv` | Melanocytic Nevi |
| `vasc` | Vascular Lesions |

---

##  Dataset

This project uses the **[HAM10000 dataset](https://www.kaggle.com/datasets/kmader/skin-lesion-analysis-toward-melanoma-detection)** (Human Against Machine with 10000 training images), a large collection of multi-source dermatoscopic images of common pigmented skin lesions.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict` | Upload image and get classification result |
| `GET` | `/health` | Check server status |

### Example Request

```bash
curl -X POST http://localhost:5000/predict \
  -F "file=@skin_image.jpg"
```

### Example Response

```json
{
  "prediction": "Melanoma",
  "confidence": 0.94,
  "label": "mel"
}
```

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

##  Disclaimer

This application is intended for **educational and research purposes only**. It is **not a substitute for professional medical advice, diagnosis, or treatment**. Always consult a qualified dermatologist.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ by <a href="https://github.com/AHMED-METAWEA">Ahmed Metawea</a></p>
