"use client"

import Image  from "next/image"
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";

import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";


const SidebarSheet = () => {
  
  // PEgar os dados do login
  const { data } = useSession()

  //Login google 
  const handleLoginWithGoogleClick = async () => signIn("google")

  // Deslogar do google
  const handleLogoutClick = () => signOut()
 
  
  return (   
      
    <SheetContent className="overscroll-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>              
      </SheetHeader>

      {/* Avatar */}
      <div className="py-5 border-b border-solid flex items-center gap-3 justify-between">
        
       {data?.user ? ( 
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage className="object-fill" src={data.user.image ?? ""}/>
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ):(
          <>
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
                <Button 
                  variant="outline" 
                  className="gap-2 font-bold" 
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image alt="Fzer login com o google" src="/Google.svg" width={18} height={18} />
                  Google
                </Button>
              </DialogContent>
            </Dialog>            
          </>
        )}

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
        <Button 
          className="justify-start gap-2" 
          variant="ghost"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18}/>                
          Sair da Conta
        </Button>                          
      </div>

    </SheetContent>
     
   );
}
 
export default SidebarSheet;