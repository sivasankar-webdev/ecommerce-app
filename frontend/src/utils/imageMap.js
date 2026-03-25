import Groc01 from "@/assets/images/grocery/01.jpg";
import Groc19 from "@/assets/images/grocery/19.jpg";
import Groc20 from "@/assets/images/grocery/20.jpg";
import Groc21 from "@/assets/images/grocery/21.jpg";
import Groc22 from "@/assets/images/grocery/22.jpg";
import Groc23 from "@/assets/images/grocery/23.jpg";
import Groc24 from "@/assets/images/grocery/24.jpg";

export const IMAGE_MAP = {
  "grocery/01.jpg": Groc01,
  "grocery/19.jpg": Groc19,
  "grocery/20.jpg": Groc20,
  "grocery/21.jpg": Groc21,
  "grocery/22.jpg": Groc22,
  "grocery/23.jpg": Groc23,
  "grocery/24.jpg": Groc24,
};

export const resolveImage = (key) =>
  IMAGE_MAP[key] ||
  "https://placehold.co/300x300/f5f5f5/999?text=Product";