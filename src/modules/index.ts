import { Pages } from "@core/interfaces/Pages";

const pages: Pages[] = [
  {
    name: "AdminManager",
    child: ["Member", "Product", "Design"],
  },
  {
    name: "Authentication",
    child: ["Login"],
  },
  {
    name: "StoreManager",
    child: ["Product", "Preferences"],
  },
];

export default pages;
