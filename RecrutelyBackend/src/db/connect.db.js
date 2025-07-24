import pkg from "pg"

const {Pool} = pkg;

const pool = new Pool({

connectionString: process.env.DATABASE_URL
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
