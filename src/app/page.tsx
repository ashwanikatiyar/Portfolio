
import NetflixLogo3D from './Components/LandingPage/NetflixLogo3D';

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="w-full h-screen">
        <NetflixLogo3D />
      </div>
      <div className="absolute bottom-10 text-white text-lg z-10 font-[Alata]">
        Welcome to my Netflix-inspired page!
      </div>
    </main>
 
  );
}
