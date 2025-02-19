"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  // console.log("user : ", user);
  return (
    <div className="max-w-md flex flex-col items-center justify-center gap-5">
      <Button>Click me</Button>
    </div>
  );
};

export default HomePage;
