import closeSquare from "../assets/close-square.svg";

interface Props {
  image:string,
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: Props) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
      <div className="relative max-h-[80vh] max-w-[90vw] ">
        <button
          onClick={onClose}
          className="absolute top-10 left-5 md:top-6 md:left-6 bg-opacity-50 rounded-full p-1 hover:bg-opacity-80"
        >
          <img src={closeSquare} alt="close" className="w-10 h-10" />
        </button>

        <div className="rounded-xl overflow-hidden shadow-lg w-[80vw] h-[50vh] md:w-[60vw] md:h-[70vh]">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
