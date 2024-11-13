import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";


const Home = async () => {
  // Se não estiver logado redirecionar para a tela de login
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }

  return (
    <div className="h-full flex items-center justify-center ">
      <Navbar />
      <UserButton showName />
    </div>


  )

}

export default Home;