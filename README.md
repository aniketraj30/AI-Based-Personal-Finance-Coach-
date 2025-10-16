💸 AI-Based Personal Finance Coach

An AI-powered financial assistant designed to help users manage spending, track expenses, and receive intelligent financial insights in real time. This project combines Node.js, FastAPI, and OpenAI APIs to deliver personalized financial recommendations, secure data handling, and real-time analytics — all hosted on AWS for scalability and reliability.

📌 Table of Contents

About

Features

Architecture

Tech Stack

Getting Started

How It Works

Dataset

Challenges Faced

Future Scope

Contact

📖 About

The AI-Based Personal Finance Coach helps users make smarter financial decisions using AI-driven analytics. It automates tracking expenses, identifying anomalies, and providing personalized advice — powered by OpenAI models and secure backend APIs.

The system integrates:

Node.js and FastAPI microservices for backend orchestration

AWS for deployment and monitoring

Prometheus and CloudWatch for performance tracking

OAuth2 for user authentication and privacy

✨ Features

💬 Personalized financial insights and recommendations 📊 Real-time expense tracking and analytics 🧠 AI-based anomaly detection for unusual transactions 🔐 End-to-end encrypted user authentication (OAuth2) ⚡ Cloud-native backend with high availability and <200ms latency 📈 Monitoring with Prometheus & AWS CloudWatch

🧩 Architecture +-------------+ +-------------------+ +-------------------+ +------------------+ | Frontend | --> | API Gateway (Node) | --> | AI Engine (FastAPI) | --> | Analytics DB | +-------------+ +-------------------+ +-------------------+ +------------------+ ↑ | [User Financial Data]

🛠 Tech Stack

Frontend: React, Tailwind CSS, Vite Backend: Node.js, FastAPI, Express.js Database: PostgreSQL, MongoDB AI / NLP: OpenAI (GPT-3.5-turbo), Python-based models DevOps & Cloud: AWS ECS, Lambda, Docker, Kubernetes, GitHub Actions Monitoring: Prometheus, CloudWatch Version Control: Git, GitHub Python Version: 3.10+

🚀 Getting Started 1️⃣ Clone the Repository git clone https://github.com/aniketraj30/AI-Based-Personal-Finance-Coach cd AI-Based-Personal-Finance-Coach

2️⃣ Install Requirements pip install -r requirements.txt npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

OPENAI_API_KEY=your_openai_api_key AWS_ACCESS_KEY=your_aws_key AWS_SECRET_KEY=your_aws_secret

4️⃣ Run the Backend (FastAPI + Node.js) uvicorn app:app --reload node server.js

Visit API docs at: 👉 http://localhost:8000/docs

5️⃣ Run the Frontend npm run dev

🧠 How It Works

1️⃣ User Input: The user enters income, expenses, or asks for financial guidance. 2️⃣ Data Processing: Backend validates and categorizes financial data. 3️⃣ AI Analysis: OpenAI APIs analyze spending patterns and generate insights. 4️⃣ Response: Personalized recommendations and visual analytics are shown in the frontend dashboard.

📚 Dataset

Data is user-generated, securely stored, and processed in compliance with privacy policies. Training and insights are based on:

Publicly available financial behavior datasets

Synthetic user data for model fine-tuning

Encrypted storage formats (PostgreSQL + AWS S3)

⚠️ Challenges Faced

Balancing model accuracy with user privacy

Handling large-scale, real-time transaction streams

Reducing API latency under high load

Implementing robust anomaly detection with limited labeled data

🚧 Future Scope

💬 Conversational financial chatbot integration

🌐 Multi-currency and regional tax rule support

📱 Mobile-first frontend (Flutter or React Native)

🤝 Integration with bank APIs (Plaid, Razorpay, etc.)

🧩 Advanced visualization with AI-driven financial forecasting

📬 Contact

Aniket Raj 📞 +91 7979024295 📧 rjaniket30@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/aniket-raj-3a8410231/

💻 GitHub: https://github.com/aniketraj30
