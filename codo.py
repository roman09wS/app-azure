import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from google.colab import files

# Mostrar el diálogo de carga de archivos
uploaded = files.upload()

# Obtener el nombre del archivo cargado
file_name = list(uploaded.keys())[0]

# Cargar el archivo CSV
data = pd.read_csv(file_name)

# Excluir columnas no numéricas (por ejemplo, columnas de fechas o texto)
data_numeric = data.select_dtypes(include=['number'])

# Estandarizar los datos (es importante para KMeans)
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data_numeric)

# Resto del código igual
