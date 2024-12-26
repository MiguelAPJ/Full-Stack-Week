import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";

const TransactionsPage = async () => {
  // Para verificar se esta logado e não deixar mudar a URL para acessar as paginas sem estar logado
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    }
  });
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6 overflow-hidden">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        {/* <DataTable columns={transactionColumns} data={JSON.parse(JSON.stringify(transactions))} /> */}
        <ScrollArea>
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;





