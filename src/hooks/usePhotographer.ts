import { useEffect, useState } from "react";
import { fetchPhotographer } from "../services/fetchPhotoprapher";

interface Photographer {
  genre: string;
  id: number;
  image: string;
  name: string;
}

export const usePhotographer = () => {
  const [photographer, setPhotographer] = useState<Photographer[]>([]);

  useEffect(() => {
    const photographer = async () => {
      try {
        const response = await fetchPhotographer();
        setPhotographer(response);
      } catch (error) {
        console.error(error);
      }
    };
    photographer();
  }, []);
  return photographer;
};
