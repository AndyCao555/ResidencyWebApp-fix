import psycopg2

DB_NAME = "ResidencyISE"
DB_USER = "postgres"
DB_PASSWORD = "postgrespassword"
DB_HOST = "localhost"
DB_PORT = "5432"

try:
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        connect_timeout=1
    )
    cur = conn.cursor()
    cur.execute("SELECT version();")

    version = cur.fetchone()
    print("PostgreSQL version:", version)

    print("Connection success")

    cur.close()
    conn.close()

except Exception as error:
    print("Connection failed:", error)