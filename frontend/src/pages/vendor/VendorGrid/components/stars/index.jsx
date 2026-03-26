import { StarEmpty, StarFilled } from "../icons";


export default function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {[1,2,3,4,5].map(i => (
        <span key={i}>{i <= Math.round(rating) ? <StarFilled/> : <StarEmpty/>}</span>
      ))}
      <span className="text-[13px] text-gray-500 ml-1">{rating.toFixed(2)} out of 5</span>
    </div>
  );
}