import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashBoard } from "../_data/get-dashboard";
import ExpensePerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface HomeProps {
  searchParams: {
    month: string;
  }
}


const Home = async ({ searchParams: { month } }: HomeProps) => {
  // Se não estiver logado redirecionar para a tela de login
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }

  // verificar se o mês esta errado na URL
  const monthIsInvalid = !month || !isMatch(month, 'mm')
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }

  const dashboard = await getDashBoard(month)

  return <>
    <Navbar />
    <div className="flex flex-col p-6 space-y-6 overflow-hidden ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards month={month} {...dashboard} />
          <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">

            <TransactionsPieChart {...dashboard} />
            <ExpensePerCategory expensesPerCategory={dashboard.totalExpensePerCategory} />
          </div>
        </div>

        <LastTransactions lastTransactions={dashboard.lastTransactions} />

      </div>

    </div >
  </>

}

export default Home;