import mysql.connector
import pandas as pd

# Configurar la conexión a la base de datos
db_config = {
    'host': '193.203.175.106',
    'user': 'u838681352_flora',
    'password': 'Flora2025',
    'database': 'u838681352_flora'
}

# Leer el archivo Excel
file_path = 'ruta_a_tu_archivo/preciosFlora.xlsm'
excel_data = pd.ExcelFile(file_path)

# Conectar a la base de datos
try:
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    print("Conexión a la base de datos exitosa.")
except mysql.connector.Error as err:
    print(f"Error al conectar a la base de datos: {err}")
    exit()

# Iterar sobre cada hoja del archivo Excel
for sheet_name in excel_data.sheet_names:
    # Leer la hoja actual como DataFrame
    df = excel_data.parse(sheet_name, usecols="A:D", names=["producto", "costo_unit", "precio_sugerido", "precio_final"])
    
    # Limpiar los datos eliminando filas vacías
    df = df.dropna()
    
    # Agregar el nombre de la hoja como categoría
    df['categoria'] = sheet_name

    # Insertar los datos en la tabla 'productos'
    for _, row in df.iterrows():
        try:
            insert_query = """
                INSERT INTO productos (producto, precio_costo, precio_sugerido, precio_venta, categoria)
                VALUES (%s, %s, %s, %s, %s)
            """
            data = (
                row['producto'],
                row['costo_unit'],
                row['precio_sugerido'],
                row['precio_final'],
                row['categoria']
            )
            cursor.execute(insert_query, data)
        except mysql.connector.Error as err:
            print(f"Error al insertar datos: {err}")

# Confirmar los cambios y cerrar la conexión
conn.commit()
cursor.close()
conn.close()

print("Migración de datos completada.")
