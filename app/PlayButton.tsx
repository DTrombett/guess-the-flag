import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, type Dispatch } from "react";
import type json from "./data.json";

const PlayButton = ({
	setPoints,
	setFlags,
	flags,
}: {
	setPoints: Dispatch<number>;
	setFlags: Dispatch<typeof json>;
	flags: typeof json;
}) => (
	<button
		className="rounded-full p-8 border m-auto transition duration-200 hover:scale-105 active:scale-95"
		onClick={() => {
			setPoints(0);
			const newFlags = flags.slice();

			for (let j = newFlags.length - 1; j >= 0; j--) {
				const k = Math.floor(Math.random() * (j + 1));

				[newFlags[j], newFlags[k]] = [newFlags[k], newFlags[j]];
			}
			setFlags(newFlags);
		}}
	>
		<FontAwesomeIcon icon={faPlay} className="block w-12 h-12" />
	</button>
);

export default memo(PlayButton);
