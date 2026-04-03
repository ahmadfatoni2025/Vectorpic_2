import { db } from "./db";
import { imageStacks as stacks } from "./db/schema";

async function probe() {
  try {
    const data = await db.select().from(stacks).limit(1);
    console.log("Table 'image_stacks' exists!");
  } catch (error: any) {
    console.error("Error probing table 'image_stacks':", error.message);
  }
}

probe();

