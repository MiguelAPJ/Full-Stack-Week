"use server"

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { TransactionCategory, TransactionType, TransactionPaymentMethod } from "@prisma/client"
import { addTransactionSchema } from "./schema"
import { revalidatePath } from "next/cache"


interface addTransactionParams {
  name: string,
  amount: number,
  type: TransactionType,
  category: TransactionCategory,
  paymentMethod: TransactionPaymentMethod,
  date: Date,
}

// Esse Omit é para que op front não passe o userId pq quem deve fazer isso é o back
export const addTransaction = async (params: addTransactionParams) => {
  //fazer a validação dos dados
  addTransactionSchema.parse(params)
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  await db.transaction.create({
    data: { ...params, userId }
  })
  // o next revalida essa pagina, recarregando ela
  revalidatePath('/transactions')
}