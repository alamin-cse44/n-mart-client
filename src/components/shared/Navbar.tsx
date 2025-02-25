// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { LogOut } from "lucide-react";
// import { logout } from "@/services/AuthService";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { useUser } from "@/context/UserContext";
// import { usePathname, useRouter } from "next/navigation";
// import { protectedRoutes } from "@/constants";

// const Navbar = () => {
//   const { user, setIsLoading } = useUser();
//   // console.log(user);
//   const pathname = usePathname();
//   const router = useRouter();
//   const handleLogout = () => {
//     logout();
//     setIsLoading(true);
//     if (protectedRoutes.some((route) => pathname.match(route))) {
//       router.push("/");
//     }
//   };
//   return (
//     <div className="flex items-center justify-center gap-2">
//       <Link href={"/"}>
//         <Button>Home</Button>
//       </Link>
//       {!user ? (
//         <Link href={"/login"}>
//           <Button>Login</Button>
//         </Link>
//       ) : (
//         <div className="flex items-center gap-2">
//           <Link href={"/create-shop"}>
//             <Button>Create Shop</Button>
//           </Link>

//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <Avatar>
//                 <AvatarImage src="https://github.com/shadcn.png" />
//                 <AvatarFallback>user</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Profile</DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Link href="/user/dashboard">Dashboard</Link>{" "}
//               </DropdownMenuItem>
//               <DropdownMenuItem>My Shop</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={handleLogout}
//                 className="text-red-500 cursor-pointer"
//               >
//                 {" "}
//                 <LogOut /> <span>Logout</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bell, ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [active, setActive] = useState("Dashboard");
  const [cartQuantity, setCartQuantity] = useState(3);
  const [isOpen, setIsOpen] = useState(false); // Drawer state

  const menuItems = [
    "Home",
    "Quickstart",
    "JavaScript",
    "TypeScript",
    "License",
    "Changelog",
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-md rounded-xl relative">
        <div className="flex items-center justify-between px-6 py-3 container mx-auto ">
          {/* Left Section - Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 text-2xl font-bold">Flowbite</span>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? (
                <X className="text-gray-600 w-6 h-6" />
              ) : (
                <Menu className="text-gray-600 w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={cn(
                  "text-gray-600 hover:text-black relative font-medium",
                  active === item && "text-black"
                )}
              >
                {item}
                {active === item && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
                )}
              </button>
            ))}
          </div>

          {/* Right Section - Cart, Bell, Login, Avatar */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search"
                className="w-40 md:w-52"
              />
            </div>
            <div className="relative">
              <ShoppingCart className="text-gray-600 cursor-pointer" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartQuantity}
                </span>
              )}
            </div>
            <Bell className="text-gray-600 cursor-pointer" />
            <Button variant="outline">Login</Button>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-white shadow-md rounded-md">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {/* Background Overlay with Smooth Fade */}
      <div
        className={cn(
          "fixed inset-0 bg-black transition-opacity duration-300",
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sliding Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-blue-600 text-2xl font-bold">Flowbite</span>
          <button onClick={() => setIsOpen(false)}>
            <X className="text-gray-600 w-6 h-6" />
          </button>
        </div>

        {/* Drawer Menu Items */}
        <div className="flex flex-col space-y-2 p-6">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActive(item);
                setIsOpen(false);
              }}
              className="text-gray-700 text-lg hover:text-black"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
