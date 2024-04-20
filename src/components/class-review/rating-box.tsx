interface RatingBoxProps {
    ratingName: string;
    ratingValue: number;
}

const RatingBox = ({ ratingName, ratingValue }: RatingBoxProps) => {
    let bgColor;
    if (ratingValue >= 3.5) {
        bgColor = "bg-gradient-green-blue";
    } else if (ratingValue >= 2) {
        bgColor = "bg-gradient-yellow-orange";
    } else {
        bgColor = "bg-gradient-red-pink";
    }

    return (
        <div className={`h-32 w-32 ${bgColor} rounded p-4 shadow-md`}>
            <div className="text-md pb-2 text-center font-bold uppercase">
                {ratingName}
            </div>
            <div className="text-center text-6xl font-bold">{ratingValue}</div>
        </div>
    );
};

export default RatingBox;
