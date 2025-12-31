import HeroSection from "@/sections/HeroSection"
import Products from "@/sections/Products"
import WhyUs from "@/sections/WhyUs"
import Footer from "@/sections/Footer"
import Me from "@/sections/Me"

function Home(){
    return (
        <main className="mt-40">
            <HeroSection />
            <Products />
            <WhyUs />
            <Footer />
            <Me />
        </main>
    )
}

export default Home