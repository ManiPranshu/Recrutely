import pkg from "pg"

const {Pool} = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
})

const connectedDb = async ()=>{
  try {
    const connectionInstance = await pool.connect()
    console.log("\n Db connected !! Db Host: ",connectionInstance.database)
  } catch (error) {
    console.log("database is not connected, Err: ",error);
    process.exit(1);
  }
}

export {pool,connectedDb};
