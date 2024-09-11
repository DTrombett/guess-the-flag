import { memo } from "react";
import type json from "./data.json";

const ResultPopup = ({
	correct,
	flag,
}: {
	correct: boolean;
	flag: (typeof json)[number];
}) => (
	<div className="absolute flex w-full h-full top-0 left-0 bg-zinc-800 bg-opacity-95">
		<div className="m-auto flex flex-col text-center">
			<span
				className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl py-1 sm:py-2 ${
					correct ? "text-green-500" : "text-red-500"
				}`}
			>
				{correct ? "Correct!" : "Wrong!"}
			</span>
			<span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl py-1 sm:py-2">
				{flag.name}
			</span>
			{flag.domesticNames[0] && (
				<span className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl py-1 sm:py-2">
					({flag.domesticNames.map((n) => n.text).join(", ")})
				</span>
			)}
		</div>
	</div>
);

export default memo(ResultPopup);
