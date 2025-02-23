import { Link } from "react-router-dom";

const MemeCard = ({ meme }) => {
  return (
    <Link to={`/meme/${meme.id}`}>
      <div className="relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
        <img
          src={meme.url}
          alt={meme.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2">
          {meme.name}
        </div>
      </div>
    </Link>
  );
};

export default MemeCard;
