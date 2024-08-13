import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import  ServiceItem  from "../../_components/service-item"
import PhoneItem from "../../_components/phone-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"

interface BarbershopPageProps {
  params: {
    id: string
  }
}
 
const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  //chamar banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  // Qaundo colocar a URL errada com o ID, aparecera o erro notfound
  if (!barbershop) {
    return notFound()
  }  

  return (
    <div>
      {/* Image */}
      <div className="relative w-full h-[250px]">
        <Image 
          alt={barbershop.name} 
          src={barbershop?.imageUrl} 
          fill 
          className="object-cover"
        />

        <Button size="icon" variant="secondary" className="absolute left-4 top-4" asChild>
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="absolute right-4 top-4">
              <MenuIcon></MenuIcon>
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>     

      </div>

      {/* Nome | Endereço */}
      <div className="p-5 border-b border-solid">
        <h1 className="font-bold  text-xl mb-3">{barbershop.name}</h1>
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="text-primary" size={18}  />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      {/*Descrição  */}
      <div className="p-5 border-b border-solid space-y-3">
        <h2 className=" text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>

      </div>

      {/* Serviços */}
      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">          
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />         
          ))}

        </div>
      </div>

      {/* Contatos */}
      <div className="p-5 space-y-3">
        {barbershop.phones.map(phone =>(
          <PhoneItem key={phone} phone={phone}/>
        ))}
      </div>

      {/* Footer  */}   
      

    </div>
  );
}
 
export default BarbershopPage;