import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	base: "/WebFrontLabWorks/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				about: "about.html",
				catalog: "catalog.html",
				blog: "blog.html",
			},
		},
	},
});
