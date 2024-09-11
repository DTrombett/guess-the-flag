import Image from "next/image";
import { memo } from "react";
import type json from "./data.json";

const Flag = ({ state: { flag } }: { state: (typeof json)[number] }) => (
	<Image
		alt="flag"
		src={flag}
		width={768}
		height={512}
		className="mx-auto w-11/12 h-auto max-h-44 sm:h-64 sm:w-auto sm:max-h-none xl:h-80 rounded-lg"
	/>
);

export default memo(Flag);
