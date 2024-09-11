import { Agbalumo } from "next/font/google";
import Game from "./Game";
import json from "./data.json";

const font = Agbalumo({ weight: "400", subsets: ["latin"], display: "swap" });

const Home = () => (
	<>
		<h1
			className={`${font.className} text-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 sm:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8`}
		>
			Guess the Flag
		</h1>
		<Game json={json} />
	</>
);

export default Home;
