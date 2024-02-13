import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      components: fileURLToPath(
        new URL("./src/shared/components", import.meta.url)
      ),
      context: fileURLToPath(new URL("./src/shared/context", import.meta.url)),
      hooks: fileURLToPath(new URL("./src/shared/hooks", import.meta.url)),
      layouts: fileURLToPath(new URL("./src/shared/layouts", import.meta.url)),
      util: fileURLToPath(new URL("./src/shared/util", import.meta.url)),
      svg: fileURLToPath(
        new URL("./src/shared/assets/img/svg", import.meta.url)
      ),
      icons: fileURLToPath(
        new URL("./src/shared/assets/img/material-icons", import.meta.url)
      ),
    },
  },
});
