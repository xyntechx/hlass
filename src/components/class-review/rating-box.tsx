interface RatingBoxProps {
    ratingName: string;
    ratingValue: number;
}

const RatingBox = ({ ratingName, ratingValue }: RatingBoxProps) => {

    let bgColor;
    if (ratingValue >= 3.5) {
        bgColor = 'bg-gradient-green-blue'; 
    } else if (ratingValue >= 2) {
        bgColor = 'bg-gradient-yellow-orange'; 
    } else {
        bgColor = 'bg-gradient-red-pink';
    }

    return (
        <div className={`w-32 h-32 ${bgColor} p-4 rounded shadow-md`}>
            <div className="text-md uppercase font-bold text-center pb-2">{ratingName}</div>
            <div className="text-6xl font-bold text-center">{ratingValue}</div>
        </div>
    );
};

export default RatingBox;