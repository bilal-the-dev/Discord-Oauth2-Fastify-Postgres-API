import server from "./server.js";

const { PORT = 3000 } = process.env;

await server.listen({ port: Number(PORT) });

console.log(`Server listening at http://localhost:${PORT}`);
