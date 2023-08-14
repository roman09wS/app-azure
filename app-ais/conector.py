import mysql.connector

# Conectar a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="tu_base_de_datos"
)

cursor = db.cursor()

# Función para crear un nuevo registro
def crear_registro(nombre, edad):
    query = "INSERT INTO personas (nombre, edad) VALUES (%s, %s)"
    valores = (nombre, edad)
    cursor.execute(query, valores)
    db.commit()

# Función para leer registros
def leer_registros():
    query = "SELECT * FROM personas"
    cursor.execute(query)
    resultados = cursor.fetchall()
    for fila in resultados:
        print(f"ID: {fila[0]}, Nombre: {fila[1]}, Edad: {fila[2]}")

# Función para actualizar un registro
def actualizar_registro(id, nueva_edad):
    query = "UPDATE personas SET edad = %s WHERE id = %s"
    valores = (nueva_edad, id)
    cursor.execute(query, valores)
    db.commit()

# Función para eliminar un registro
def eliminar_registro(id):
    query = "DELETE FROM personas WHERE id = %s"
    valor = (id,)
    cursor.execute(query, valor)
    db.commit()

# Ejemplo de uso
crear_registro("Ejemplo", 25)
leer_registros()
actualizar_registro(1, 26)
eliminar_registro(1)

# Cerrar la conexión a la base de datos
db.close()