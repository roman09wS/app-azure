from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from voz_a_texto import recognize_from_microphone
from reconocer_voz import hablar
from traductor import traducir
app = FastAPI()

class Item(BaseModel):
    numero: int

items_array = []
# Configuración de CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}





@app.post("/items/")
def crear_item(item: Item):
    respuesta = recognize_from_microphone()
    respuesta_ingles = traducir(respuesta,item.numero)
    hablar(respuesta_ingles,item.numero)
    return respuesta_ingles

