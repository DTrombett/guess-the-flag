"use client";
import { useState } from "react";
import type data from "./data.json";
import Flag from "./Flag";
import InputRow from "./InputRow";
import PlayButton from "./PlayButton";
import ResultPopup from "./ResultPopup";

const Game = ({ json }: { json: typeof data }) => {
	const [flags, setFlags] = useState(json);
	const [points, setPoints] = useState<number>();
	const [correct, setCorrect] = useState<boolean>();
	const [i, setI] = useState(0);

	return (
		<>
			<div className="relative h-44 sm:h-64 xl:h-80 flex items-center justify-center mt-4 mb-8">
				{points == null ? (
					<PlayButton flags={flags} setFlags={setFlags} setPoints={setPoints} />
				) : (
					<>
						{correct != null && (
							<ResultPopup correct={correct} flag={flags[i]} />
						)}
						<Flag state={flags[i]} />
					</>
				)}
			</div>
			<div className="flex mb-6 relative">
				{points == null ? (
					<button className="px-4 py-3 text-xl sm:text-2xl 2xl:text-3xl 2xl:px-6 2xl:py-4 rounded-lg bg-zinc-600 bg-opacity-50 transition hover:scale-105 active:scale-100">
						Choose flags
					</button>
				) : (
					<InputRow
						flags={flags}
						i={i}
						setCorrect={setCorrect}
						setI={setI}
						correct={correct}
					/>
				)}
			</div>
		</>
	);
};

export default Game;
