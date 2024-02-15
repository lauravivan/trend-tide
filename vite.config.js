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
      UIElements: fileURLToPath(
        new URL("./src/shared/UIElements", import.meta.url)
      ),
      util: fileURLToPath(new URL("./src/shared/util", import.meta.url)),
      icons: fileURLToPath(
        new URL("./src/shared/UIElements/material-icons", import.meta.url)
      ),
    },
  },
});
