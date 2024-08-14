import BarbershopItem from "../_components/barbershop-item";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({searchParams}: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive"
      }
    }
  })

  return ( 
    <div>
      <h2 className="uppercase font-bold text-xs text-gray-400 mb-3 mt-6">
        Resultados para &quoto;{searchParams.search}&quoto;
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {barbershops.map((barbershops) => (
          <BarbershopItem key={barbershops.id} barbershop={barbershops} />
        ))}

      </div>
    </div>
   );
}
 
export default BarbershopsPage;