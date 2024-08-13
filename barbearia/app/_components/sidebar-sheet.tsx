
import Image  from "next/image"
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";

import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const SidebarSheet = () => {
  return (   
      
    <SheetContent className="overscroll-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>              
      </SheetHeader>

      {/* Avatar */}
      <div className="py-5 border-b border-solid flex items-center gap-3 justify-between">
        <h2 className="font-bold">Olá, faça seu login</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>
            <Button variant="outline" className="gap-2 font-bold">
              <Image alt="Fzer login com o google" src="/Google.svg" width={18} height={18} />
              Google
            </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
          <AvatarImage className="object-fill" src="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </Avatar>
        <div>
          <p className="font-bold">Miguel Junior</p>
          <p className="text-xs">migueljuju@gmail.com</p>
        </div> */}
      </div>



      {/* botão inicio e agendamento */}
      <div className="py-5 flex flex-col gap-4 border-b border-solid">
        <SheetClose asChild>
          <Button className="gap-2 justify-start" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size="18"/>
              Inicio
            </Link>
          </Button>
        </SheetClose>
        <Button className="gap-2 justify-start" variant="ghost">
          <CalendarIcon size="18" />
          Agendamento
        </Button>              
      </div>

      {/*Botões serviços */}
      <div className="py-5 flex flex-col gap-4 border-b border-solid">
        {quickSearchOptions.map(option =>(
          <Button className="gap-2 justify-start" variant="ghost" key={option.title}>
            <Image alt={option.title} src={option.imageUrl} height={18} width={18}/>
            {option.title}
          </Button>
        ))}         
                    
      </div>

      {/* Botão sair */}
      <div className="py-5 flex flex-col gap-4 border-b border-solid">
        <Button className="justify-start gap-2" variant="ghost">
          <LogOutIcon size={18}/>                
          Sair da Conta
        </Button>                          
      </div>

    </SheetContent>
     
   );
}
 
export default SidebarSheet;