import Dots from "./Dots";

function PromoBanner(props: Props) {
  return (
    <div className="flex flex-col gap-4 p rounded-md p-2 mx-1 bg-[#0000004d] ">
      <div className=" p-3 title w-full flex justify-center items-center">
        <span className="sm:flex hidden">MEJOR JUEGOS DE CASINO</span>
        <span className="flex flex-col sm:hidden">
          <span>TOP RATED GAMES</span>
          <Dots number={6} />
        </span>
      </div>
      <div className="sm:flex gap-4 grid grid-cols-2">
        {props.images.map((image) => {
          return (
            <img
              key={image}
              className="w-full"
              src={`src/assets/images/${image}.png`}
              alt={`Banner image ${image}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PromoBanner;
interface Props {
  images: string[];
}
