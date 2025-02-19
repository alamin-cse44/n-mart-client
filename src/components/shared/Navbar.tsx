"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { logout } from "@/services/AuthService";
import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const {user, setIsLoading} = useUser();
  console.log(user);
  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };
  return (
    <div className="flex items-center justify-center gap-2">
      {!user ? (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            <DropdownMenuItem>My Shop</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
              {" "}
              <LogOut /> <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Navbar;
