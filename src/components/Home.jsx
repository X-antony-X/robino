import HeroSection from "@/sections/HeroSection"
import Products from "@/sections/Products"
import WhyUs from "@/sections/WhyUs"
import FeedBacks from "@/sections/FeedBacks"

function Home(){
    return (
        <main className="mt-40">
            <HeroSection />
            <Products />
            <WhyUs />
            <FeedBacks />
        </main>
    )
}

export default Home