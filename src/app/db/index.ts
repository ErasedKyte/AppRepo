import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

db.documents.create({
    data:{
        Docs: "ok"
    }
})