import RatingBox from '@/components/class-review/rating-box';

interface Rating {
    name: string;
    value: number;
}

interface ClassCardProps {
    id: string;
    className: string;
    ratings: Rating[];
    overview: string;
}

const ClassCard = ({ id, className, ratings, overview }: ClassCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg max-w-3xl">
            <h2 className="text-3xl font-bold text-center p-6">{className}</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {ratings.map((rating) => (
                    <RatingBox
                        key={`${id}-${rating.name}`} 
                        ratingName={rating.name}
                        ratingValue={rating.value}
                    />
                ))}
            </div>
            <h3 className="text-lg uppercase font-bold text-left p-8">Class Overview:</h3>
            <p className=" pl-8 pb-8">{overview}</p>
        </div>
    );
};

export default ClassCard;