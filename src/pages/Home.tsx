import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import GamesSection from "../components/GamesSection";
import PromoBanner from "../components/PromoBanner";
import { GameDetailObj } from "../types/home";
import GameDetail from "../components/GameDetail";

function Home() {
  const promoImages = ["PromoTile1", "PromoTile2", "PromoTile3", "PromoTile4"];
  const gameDetails: GameDetailObj[] = [
    {
      title: "CASA DE APUESTAS OFICIAL",
      content:
        "¡Bienvenido a la mejor casa de apuestas en línea de Argentina! Hace tiempo venimos disfrutando juntos de un mundo de entretenimientos y ahora te brindamos la posibilidad de que te diviertas de manera online.",
      buttonText: "APOSTA EN VIVO",
      image: "gameDetails1",
    },
    {
      title: "CASINO EN VIVO",
      content:
        "¡Bienvenido a la mejor casa de apuestas en línea de Argentina! Hace tiempo venimos disfrutando juntos de un mundo de entretenimientos y ahora te brindamos la posibilidad de que te diviertas de manera online.",
      buttonText: "VER MAS",
      image: "gameDetails2",
    },
    {
      title: "TODOS LOS DEPORTES",
      content:
        "¡Bienvenido a la mejor casa de apuestas en línea de Argentina! Hace tiempo venimos disfrutando juntos de un mundo de entretenimientos y ahora te brindamos la posibilidad de que te diviertas de manera online.",
      buttonText: "VER MAS",
      image: "gameDetails3",
      icons: [
        { image: "icon-futbol", text: "FUTBOL" },
        { image: "icon-baloncesto", text: "BALOINCESTO" },
        { image: "icon-tenis", text: "TENIS" },
        { image: "icon-boxeo", text: "BOXEO" },
      ],
    },
  ];

  return (
    <div className="home">
      <Navbar />
      <Banner />
      <div className="flex flex-col gap-2 py-3 justify-center items-center sm:px-24">
        <GamesSection />
        <PromoBanner images={promoImages} />
        <GameDetail gameDetails={gameDetails} />
      </div>
    </div>
  );
}

export default Home;
