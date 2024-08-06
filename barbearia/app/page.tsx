import { Button } from "./_components/ui/button";
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { SearchIcon } from "lucide-react";
import Image  from "next/image"


const Home = () => {
  return (
  <div>
    {/* header */}
    <Header />
    <div className="p-5">
      <h2 className="text-xl font-bold">Olá, Miguel</h2>
      <p>Terça, 06 de agosto</p>
      <div className="flex items-center gap-2 mt-6">
        <Input placeholder="Buscar...." />
        <Button>
          <SearchIcon />
        </Button>
      </div>

      <div className="relative w-full h-[150px] mt-6 ">
        <Image 
          alt="Agende nos melhores com barber" 
          src="/Banner.png" 
          fill 
          className="object-cover rounded-xl" />
      </div>

    </div>
  </div>
  ) 
  
}

export default Home;