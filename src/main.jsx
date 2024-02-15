import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/css/main.css";
import "material-icons/iconfont/outlined.css";

const domNode = document.getElementById("root");

const root = createRoot(domNode);

root.render(<App />);
