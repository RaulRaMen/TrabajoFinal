import joblib
import numpy as np

from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from starlette.requests import Request
from fastapi.staticfiles import StaticFiles

# Temporal
import logging
logging.basicConfig(level=logging.INFO)
# 
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

modelCategorico = joblib.load(r"Modelos\modelo30Min_catboost.pkl")

# Iniciar la App
@app.get("/", response_class=HTMLResponse)
def home(request: Request):

    return templates.TemplateResponse(
        request,
        "index.html",
        {}
    )

# Endpoint prediccion 
@app.post("/predict")
async def predict(request: Request):
    data = await request.json()

    start = data["Start"]
    rental = data["Rental place"]
    return_place = data["Return place"]
    country = data["PAÍS"]
    day = data["Day"]
    month = data["Month"]

    total = 0

    for i in range(len(start)):

        row = np.array([[
            start[i],
            rental[i],
            return_place[i],
            country[i],
            day[i],
            month[i]
        ]])

        pred = modelCategorico.predict(row)[0]
        print(pred)
        total += float(pred)

    return JSONResponse({
        "prediction": round(total)
    })