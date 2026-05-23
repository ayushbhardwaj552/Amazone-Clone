const { Client } = require("pg");

const client = new Client({
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 5432,
  user: "postgres.hiqtdukddfhjzuapgcvr",
  password: "um(p3kx(rT*2wD9",
  database: "postgres",
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to database successfully!");

    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Tables in 'public' schema:", res.rows);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await client.end();
  }
}

run();
