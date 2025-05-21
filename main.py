import psycopg2

conn = psycopg2.connect(
    dbname="ResidencyISE",
    user="postgres",
    password="postgrespassword",
    host="localhost",
    port="5432"
)

cur = conn.cursor()
cur.execute("SELECT version();")  # Example query

version = cur.fetchone()
print(version)

