"use server";
import { db } from "@/src/app/db";

export async function getSfaForm(sfaFormId: string) {
    return await db.sFAForm.findUnique({
        where: { id: parseInt(sfaFormId) }
    });
}

export async function updateSfaForm(sfaFormId: string, data: any) {
    return await db.sFAForm.update({
        where: { id: parseInt(sfaFormId) },
        data
    });
}