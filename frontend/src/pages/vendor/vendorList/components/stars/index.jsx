import { StarIcon } from "../icons";


export default function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)}/>)}
      <span className="text-[13px] text-gray-500 ml-1.5">{rating.toFixed(2)} out of 5</span>
    </div>
  );
}