import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	try {
		await prisma.$connect();
		console.log("Successfully connected to the database");

		const userCount = await prisma.user.count();
		console.log(`Number of users in the database: ${userCount}`);
	} catch (error) {
		console.error("Error connecting to the database:", error);
	} finally {
		await prisma.$disconnect();
	}
}

main();
