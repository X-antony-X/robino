import HeroSection from "@/sections/HeroSection"
import Products from "@/sections/Products"
import WhyUs from "@/sections/WhyUs"

function Home(){
    return (
        <main className="mt-40">
            <HeroSection />
            <Products />
            <WhyUs />
        </main>
    )
}

export default Home