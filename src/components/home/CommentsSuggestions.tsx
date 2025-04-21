import SubTitle from "./SubTitle";
import SuggestForm from "./SuggestForm";
import lenz from "../../assets/lenz.jpg";

function CommentsSuggestions() {
  return (
    <div className="flex flex-col gap-8">
      <SubTitle title="نظر و پیشنهاد" />
      
      <div className="relative flex flex-col gap-8 py-5 rounded-md overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={lenz} 
            alt="Background" 
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="relative z-10">
          <SuggestForm />
        </div>
      </div>
    </div>
  );
}

export default CommentsSuggestions;
