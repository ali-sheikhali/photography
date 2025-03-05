import NavBarHome from '../components/home/NavBarHome'
import HeroHeader from '../components/home/HeroHeader'
import Services from '../components/home/Services'

function Home() {
  return (
    <div className='bg-[#1D1818]'>
        <NavBarHome />
        <main className='w-11/12 mx-auto flex flex-col gap-8 '>
            <HeroHeader />
            <Services />
        </main>
    </div>
  )
}

export default Home