import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

const config: UserConfigExport = {
    base: "./",
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: [
            { find: "@", replacement: __dirname + "/src/" }
        ],
    },
};

// https://vitejs.dev/config/
export default defineConfig(config);
