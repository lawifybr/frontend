"use client"
// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from 'next/navigation';
import LandingSection1 from "./components/LandingPage/LandingSection1";
import LandingSection2 from "./components/LandingPage/LandingSection2";

import React from 'react';
import LandingSection3 from "./components/LandingPage/LandingSection3";
import LandingSection4 from "./components/LandingPage/LandingSection4";

export default function Home() {
  // const {isLoaded, userId} = useAuth()
  // const router = useRouter()
  // if (isLoaded && userId) {
  //   // Use router.push() instead of revalidatePath()
  //   router.push('/document-analysis');
  // }
  return (
    <div>
      <LandingSection1 />
      <LandingSection3 />
      <LandingSection4 />
      <LandingSection2 />
    </div>
  );
}
