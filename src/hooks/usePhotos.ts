import { useEffect, useState } from "react";
import { fetchPhoto } from "../services/fetchPhoto";

interface Photo {
  id: number;
  url: string;
  type: string;
  photographerId: number;
}

const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetchPhoto();
        setPhotos(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadPhotos();
  }, []);

  return photos;
};

export default usePhotos;
