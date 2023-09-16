import urllib.request
import json
import os
import ssl

def allowSelfSignedHttps(allowed):
    # bypass the server certificate verification on client side
    if allowed and not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
        ssl._create_default_https_context = ssl._create_unverified_context

allowSelfSignedHttps(True) # this line is needed if you use self-signed certificate in your scoring service.

# Request data goes here
# The example below assumes JSON formatting which may be updated
# depending on the format your endpoint expects.
# More information can be found here:
# https://docs.microsoft.com/azure/machine-learning/how-to-deploy-advanced-entry-script
data =  {
  "Inputs": {
    "input1": [
      {
        "PatientID": 1,
        "Pregnancies": 9,
        "PlasmaGlucose": 104,
        "DiastolicBloodPressure": 51,
        "TricepsThickness": 7,
        "SerumInsulin": 24,
        "BMI": 27.36983156,
        "DiabetesPedigree": 1.3504720469999998,
        "Age": 43
      },
      {
        "PatientID": 3,
        "Pregnancies": 6,
        "PlasmaGlucose": 73,
        "DiastolicBloodPressure": 61,
        "TricepsThickness": 35,
        "SerumInsulin": 24,
        "BMI": 18.74367404,
        "DiabetesPedigree": 1.074147566,
        "Age": 75
      },
      {
        "PatientID": 2,
        "Pregnancies": 4,
        "PlasmaGlucose": 115,
        "DiastolicBloodPressure": 50,
        "TricepsThickness": 29,
        "SerumInsulin": 243,
        "BMI": 34.69215364,
        "DiabetesPedigree": 0.7411599259999999,
        "Age": 59
      }
    ]
  },
  "GlobalParameters": {
    "DataFormat": "CSV"
  }
}

body = str.encode(json.dumps(data))

url = 'http://6252b017-18f7-4a12-b5ce-2b69c7649eae.eastus.azurecontainer.io/score'
# Replace this with the primary/secondary key or AMLToken for the endpoint
api_key = 'dbUm47oZk8fR8hRHegikaHOtZXLF5ifm'
if not api_key:
    raise Exception("A key should be provided to invoke the endpoint")


headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}

req = urllib.request.Request(url, body, headers)

try:
    response = urllib.request.urlopen(req)

    result = response.read()
    print(result)
except urllib.error.HTTPError as error:
    print("The request failed with status code: " + str(error.code))

    # Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
    print(error.info())
    print(error.read().decode("utf8", 'ignore'))