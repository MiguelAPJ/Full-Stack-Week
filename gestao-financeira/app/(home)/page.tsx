import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

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
    redirect('?month=01')
  }

  return <>
    <Navbar />
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <TimeSelect />
      </div>
      <SummaryCards month={month} />
    </div>
  </>

}

export default Home;