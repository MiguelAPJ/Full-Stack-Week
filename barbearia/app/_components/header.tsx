import { Card, CardContent } from "./ui/card";
import Image  from "next/image"
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Image alt="Logo da da barbearia " src="/Logo.png" height={18} width={120}/>
        <Button size="icon" variant="outline">
          <MenuIcon></MenuIcon>
        </Button>
      </CardContent>
    </Card>
   );
}
 
export default Header;