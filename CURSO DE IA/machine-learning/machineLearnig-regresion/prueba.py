import urllib.request
import json
import os
import ssl

def allowSelfSignedHttps(allowed):
    if allowed and not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
        ssl._create_default_https_context = ssl._create_unverified_context
allowSelfSignedHttps(True)

id_paciente = float(input("id_paciente: "))
Embarazos = float(input("Embarazos: "))
Nivel_d_Azucar = float(input("Nivel_d_Azucar: "))
PresionArterial = float(input("PresionArterial: "))
GrosorTriceps = float(input("GrosorTriceps: "))
Nivel_d_Insulina = float(input("Nivel_d_Insulina: "))
imc = float(input("imc: "))
probabilidadFamiliar = float(input("probabilidadFamiliar: "))
edad = float(input("edad: "))
data =  {
  "Inputs": {
    "input1": [
      {
        "PatientID": id_paciente,
        "Pregnancies": Embarazos,
        "PlasmaGlucose": Nivel_d_Azucar,
        "DiastolicBloodPressure": PresionArterial,
        "TricepsThickness": GrosorTriceps,
        "SerumInsulin": Nivel_d_Insulina,
        "BMI": imc,
        "DiabetesPedigree": probabilidadFamiliar,
        "Age": edad
      },
    ]
  },
  "GlobalParameters": {
    "DataFormat": "CSV"
  }
}

body = str.encode(json.dumps(data))

url = 'http://6252b017-18f7-4a12-b5ce-2b69c7649eae.eastus.azurecontainer.io/score'
# Reemplazar esto con la clave primaria/secundaria o AMLToken para el endpoint
api_key = 'dbUm47oZk8fR8hRHegikaHOtZXLF5ifm'
if not api_key:
    raise Exception("Debe proporcionarse una clave para invocar el endpoint")

headers = {'Content-Type': 'application/json', 'Authorization': ('Bearer ' + api_key)}

req = urllib.request.Request(url, body, headers)

try:
    response = urllib.request.urlopen(req)
    result = response.read()
    print(result)
except urllib.error.HTTPError as error:
    print("La solicitud falló con el código de estado: " + str(error.code))

    # Imprimir los encabezados - incluyen el ID de solicitud y la marca de tiempo, que son útiles para depurar el fallo
    print(error.info())
    print(error.read().decode("utf8", 'ignore'))
