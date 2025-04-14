import client from "../config/redis.js"

export const createData = async (key, field, value) => {
    try {
        await client.hSet(key, field, JSON.stringify(value));
        await client.expire(key, 3600);  
        console.log("Data cached successfully :)")
    } catch (error) {
        console.log("Error while creating the cache", error)
    }
}


export const readData = async (key, field) => {
    try {
        const data = await client.hGet(key, field);
        if (!data) {
            return null;
        }
        return JSON.parse(data);
    } catch (error) {
        console.log("Error while reading from cache:", error);
        return null;
    }
};



export const deleteData = async (key) => {
    try {
        await client.del(key);
        console.log("Cached  deleted successfully.");
    } catch (err) {
        console.error("Error deleting data:", err);
    }
}

