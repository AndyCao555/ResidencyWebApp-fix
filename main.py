import psycopg2

try:
    conn = psycopg2.connect(
        dbname="ResidencyISE",
        user="postgres",
        password="postgrespassword",
        host="localhost",
        port="5432",
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
