import { Button } from "./_components/ui/button";
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { SearchIcon } from "lucide-react";
import Image  from "next/image"
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item";



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

      {/* Agendamento */}

      <h2 className="uppercase font-bold text-xs text-gray-400 mb-3 mt-6">
        Agendamento
      </h2>

      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia Miguel</p>

            </div>

          </div>

          <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>

      </Card>

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
    {/* Footer  */}   
    <footer>
      <Card className="">
        <CardContent className="px-6 py-6">
          <p className="text-sm text-gray-400">© 2023 Copyright <span className="font-bold">FSW Barber</span></p>
        </CardContent>
      </Card>
    </footer>
  </div>
  ) 
  
}

export default Home;