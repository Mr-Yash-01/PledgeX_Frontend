'use client';
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/signin");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
}
