import About from "@/components/about";
import Blog from "@/components/Blog";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Image from "next/image";
import bannerImage from "@/public/assets/banner.png";
export default function Home() {
  return (
   <>
    <Hero />
    <About />
    <Properties />
    <Blog />
    <div className="max-padd-container py-16 max-md:py-8 overflow-x-hidden"> 
      <Image src={bannerImage} alt="" height={600} width={600} className="w-full h-full"/>
    </div>
   </>
  );
}
