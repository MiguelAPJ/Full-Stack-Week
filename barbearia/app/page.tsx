import { Button } from "./_components/ui/button";
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { SearchIcon } from "lucide-react";
import Image  from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"; 
import Search from "./_components/search";


// TODO: receber agendaemnto como props


const Home = async () => {
  // chamando o banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    }
  })
  return (
  <div>
    {/* header */}
    <Header />
    <div className="p-5">
      <h2 className="text-xl font-bold">Olá, Miguel</h2>
      <p>Terça, 06 de agosto</p>
     
      {/* Busca */}
      <div className="mt-6">
        <Search />
      </div>
      

      {/* Categorias -  Busca rapida */}

      <div className="flex gap-3 my-6 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map(option => 
          <Button className="gap-2" variant="secondary" key={option.title}>
            <Image 
              alt={option.title} 
              src={option.imageUrl}
              width={16} 
              height={16}
            />
            {option.title}
          </Button> )}    
        
      </div>



      <div className="relative w-full h-[150px] mt-6 ">
        <Image 
          alt="Agende nos melhores com barber" 
          src="/Banner.png" 
          fill 
          className="object-cover rounded-xl" />
      </div>

      {/* Agendamento */}
      
     <BookingItem />

      {/* Recomendados */}

      <h2 className="uppercase font-bold text-xs text-gray-400 mb-3 mt-6">
        Recomendados
      </h2>

      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
          
        ))}
      </div>     
      {/* Populares */}

      <h2 className="uppercase font-bold text-xs text-gray-400 mb-3 mt-6">
        Populares
      </h2>

      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {popularBarbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
          
        ))}
      </div>
             

    </div>
    
  </div>
  ) 
  
}

export default Home;