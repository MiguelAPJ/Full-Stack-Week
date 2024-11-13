import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";


const Home = async () => {
  // Se não estiver logado redirecionar para a tela de login
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }

  return <Navbar />

}

export default Home;