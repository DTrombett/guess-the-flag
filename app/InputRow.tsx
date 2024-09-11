import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	memo,
	useEffect,
	useMemo,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";
import type json from "./data.json";

const InputRow = ({
	correct,
	setCorrect,
	setI,
	i,
	flags,
}: {
	correct?: boolean;
	setCorrect: Dispatch<boolean | undefined>;
	setI: Dispatch<SetStateAction<number>>;
	i: number;
	flags: typeof json;
}) => {
	const [input, setInput] = useState("");
	const [selected, setSelected] = useState<number>();
	// The Node type is to avoid typescript errors
	const timeout = useRef<NodeJS.Timeout>();
	const elements = useMemo(() => {
		const arrayInput = input.trim().toLowerCase().split(/\s+/);

		return arrayInput[0]
			? flags
					.filter((r) => {
						if (input === r.name) return false;
						const s = [
							...r.name.toLowerCase().split(/\s+/),
							...r.domesticNames
								.map((n) => n.text.toLowerCase().split(/\s+/))
								.flat(),
						];

						return arrayInput.every((j) => s.some((a) => a.includes(j)));
					})
					.slice(0, 4)
			: [];
	}, [input, flags]);
	const handleEnter = () => {
		if (!timeout.current && correct == null) {
			const string = input.trim().toLowerCase();

			setCorrect(
				string === flags[i].name.toLowerCase() ||
					flags[i].domesticNames.some((n) => n.text.toLowerCase() === string)
			);
			setInput("");
			timeout.current = setTimeout(
				setI.bind(null, i === flags.length - 1 ? 0 : i + 1),
				7500
			);
		} else {
			clearTimeout(timeout.current);
			timeout.current = undefined;
			setCorrect(undefined);
			setI(i === flags.length - 1 ? 0 : i + 1);
		}
	};

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				event.preventDefault();
				handleEnter();
			}
		};

		window.addEventListener("keydown", listener);
		return window.removeEventListener.bind(
			window,
			"keydown" as keyof WorkerGlobalScopeEventMap,
			listener
		);
	});
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.key === "ArrowUp") {
				setSelected((s) =>
					s == null ? 0 : s === elements.length - 1 ? 0 : s + 1
				);
				event.preventDefault();
			} else if (event.key === "ArrowDown") {
				setSelected((s) => (s ? s - 1 : undefined));
				event.preventDefault();
			}
		};

		window.addEventListener("keydown", listener);
		return window.removeEventListener.bind(
			window,
			"keydown" as keyof WorkerGlobalScopeEventMap,
			listener
		);
	}, [elements.length]);
	return (
		<>
			{input && (
				<div className="absolute flex flex-col bg-zinc-700 bg-opacity-80 rounded-t-lg top-0 left-0 w-full">
					<div
						className="absolute flex flex-col-reverse left-0 w-full"
						style={{ top: -elements.length * 48 }}
					>
						{elements.map((s, j) => (
							<button
								className={`text-left text-nowrap text-xl px-4 py-2 border-zinc-200 border-b first:border-b-0 first:rounded-b-lg last:rounded-t-lg border-opacity-50 h-12 bg-opacity-95 ${
									j === selected
										? "bg-zinc-900 hover:bg-zinc-800 hover:bg-opacity-95"
										: "bg-zinc-700 hover:bg-zinc-600 hover:bg-opacity-95"
								}`}
								key={s.name}
								tabIndex={-1}
								onClick={(event) => {
									event.preventDefault();
									setInput(s.name);
									setSelected(undefined);
								}}
							>
								{s.name}
							</button>
						))}
					</div>
				</div>
			)}
			<input
				className="w-60 sm:w-auto px-4 py-3 2xl:px-6 2xl:py-4 text-xl sm:text-2xl 2xl:text-3xl rounded-lg bg-zinc-600 bg-opacity-50 outline-none transition"
				placeholder="Write the country name..."
				type="text"
				onChange={(event) => {
					setInput(event.target.value);
				}}
				value={input}
				autoFocus
				onKeyDown={(event) => {
					if (event.key === "Enter" && selected != null) {
						event.stopPropagation();
						setInput(elements[selected].name);
						setSelected(undefined);
					}
				}}
			/>
			<button
				className="ml-2 sm:ml-4 px-4 py-3 2xl:px-6 2xl:py-4 rounded-lg bg-zinc-600 bg-opacity-50 transition hover:scale-105 active:scale-100"
				onClick={handleEnter}
			>
				<FontAwesomeIcon
					icon={faCheck}
					className="w-5 h-5 sm:w-6 sm:h-6 2xl:h-8"
				/>
			</button>
		</>
	);
};

export default memo(InputRow);
