# Neural Drip – OXXO Store Optimization Platform 🧠🏪

This project is a web-based data exploration and prediction tool built for analyzing and optimizing the performance of OXXO stores using machine learning models and geospatial data.

## 🧩 Project Structure

Neural Drip/
│
├── documentos/ # Datasets, models, and Jupyter notebooks for training and evaluation
│ ├── *.csv
│ ├── *.pkl
│ └── *.ipynb
│
├── pagina/
│ ├── backend/ # Flask-based API for ML model inference
│ └── frontend/
│ └── neural-drip-main/
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── README.md <-- You are here!

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/neural-drip.git
cd neural-drip/pagina/frontend/neural-drip-main

2. Install Dependencies
Make sure you have Node.js installed, then:
npm install

3. Create a .env File
Inside neural-drip-main, create a file named .env with the following:
REACT_APP_API_URL=https://your-api1-url-from-railway.app
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
REACT_APP_FLASK_URL=https://your-api2-url-from-railway.app
REACT_APP_NEURAL_VENTAS_URL=https://your-api3-url-from-railway.app

4. Start the Frontend
npm run dev
The site will run at http://localhost:3000


🧠 Backend (Flask API)
The backend lives under /pagina/backend and expects:
CSV data preprocessing
xgboost models: xgb_reg_model2.pkl, xgboost_classifier.pkl
Inference endpoints like /mejor_ubicacion and /evaluar_ubicacion

You can deploy the backend using Railway or run locally with:
pip install -r requirements.txt
python app.py

📊 Features
Interactive Map with OXXO locations
Smart filters for plaza, segmento, entorno, etc.
Prediction of best location for new stores
Revenue forecasting and performance evaluation
Exploratory charts (histograms, boxplots, etc.)

📦 Dependencies
Frontend:
React + TailwindCSS
Mapbox GL JS
Chart.js

Backend:
Flask
XGBoost
Pandas, Scikit-Learn, NumPy





