/* eslint-disable node/no-unpublished-import */
import { writeFile } from "fs/promises";
import { chromium, type Locator } from "playwright";

type Field = Record<string, unknown>;

console.time("Data loaded");
const resolveSrc = (src?: string | null) => {
	const split = src
		?.replace(/\/thumb/, "")
		.split("/")
		.slice(0, -1);

	if (split) split[0] = "https:";
	return split?.join("/");
};
const fields: ((cell: Locator) => Promise<Field> | Field)[] = [
	async (cell) => ({
		flag: resolveSrc(
			await cell
				.getByRole("img")
				.getAttribute("src")
				.catch(() => undefined)
		),
	}),
	async (cell) => ({
		map: resolveSrc(
			await cell
				.getByRole("img")
				.getAttribute("src")
				.catch(() => undefined)
		),
	}),
	async (cell) => ({
		name: (
			await cell
				.getByRole("link")
				.first()
				.textContent()
				.catch(() => null)
		)?.replace(/\*|(\[.*\])/g, ""),
	}),
	async (cell) => ({
		domesticNames: (
			await Promise.all(
				(
					await cell
						.locator("> span")
						.or(cell.locator("> i"))
						.all()
						.catch(() => [])
				).map(async (el) => {
					const [lang, text] = await Promise.all([
						el.getAttribute("lang"),
						el.textContent(),
					]);

					return { lang, text };
				})
			)
		).filter(({ lang, text }) => lang && text),
	}),
	async (cell) => ({
		capital: await cell
			.getByRole("link")
			.first()
			.textContent()
			.catch(() => undefined),
	}),
	async (cell) => ({
		population: parseInt(
			(await cell.textContent().catch(() => undefined))?.replaceAll(",", "") ??
				""
		),
	}),
	async (cell) => ({
		area: parseInt(
			(await cell.textContent().catch(() => undefined))?.replaceAll(",", "") ??
				""
		),
	}),
	async (cell) => ({
		currency: await cell
			.getByRole("link")
			.first()
			.textContent()
			.catch(() => undefined),
	}),
];
const browser = await chromium.launch();
const context = await browser.newContext({
	baseURL: "https://en.wikipedia.org/",
});
const results = (
	await Promise.all(
		[
			{
				continent: "Africa",
				url: "/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa",
			},
			{
				continent: "Europe",
				url: "/wiki/List_of_sovereign_states_and_dependent_territories_in_Europe",
			},
			{
				continent: "North America",
				url: "/wiki/List_of_sovereign_states_and_dependent_territories_in_North_America",
			},
			{
				continent: "South America",
				url: "/wiki/List_of_sovereign_states_and_dependent_territories_in_South_America",
			},
			{
				continent: "Asia",
				url: "/wiki/List_of_sovereign_states_and_dependent_territories_in_Asia",
			},
			{
				continent: "Oceania",
				url: "/wiki/List_of_sovereign_states_and_dependent_territories_in_Oceania",
			},
		].map(async ({ continent, url }) => {
			const page = await context.newPage();

			await page.goto(url);
			const rows = await page
				.locator("table")
				.filter({ hasText: "Flag " })
				.first()
				.locator("tbody > tr")
				.all();

			return Promise.all(
				rows.map(async (row) => {
					const cells = row.getByRole("cell");

					return Object.assign(
						{ continent },
						...(await Promise.all(
							fields.map((fun, i) =>
								fun(cells.nth(continent === "Oceania" && i ? i + 1 : i))
							)
						))
					) as Field;
				})
			);
		})
	)
)
	.flat(2)
	.filter((c, i, arr) => {
		for (i++; i < arr.length; i++) if (arr[i].name === c.name) return false;
		return true;
	});

console.log(results);
await writeFile("../../app/data.json", JSON.stringify(results));
// await page.pause();
await browser.close();
console.timeEnd("Data loaded");
