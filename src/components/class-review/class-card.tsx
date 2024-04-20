import RatingBox from "@/components/class-review/rating-box";
import { ReactNode } from "react";

interface Rating {
    name: string;
    value: number;
}

interface ClassCardProps {
    id: string;
    name: string;
    ratings: Rating[];
    overview: string;
    linkComponent?: ReactNode;
}

const ClassCard = ({
    id,
    name,
    ratings,
    overview,
    linkComponent,
}: ClassCardProps) => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-y-8 rounded-lg border border-gray-200 bg-white p-10 shadow-lg">
            <h2 className="text-center text-3xl font-bold">{name}</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {ratings.map((rating) => (
                    <RatingBox
                        key={`${id}-${rating.name}`}
                        ratingName={rating.name}
                        ratingValue={rating.value}
                    />
                ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center">
                <h3 className="w-full text-left text-lg font-bold uppercase">
                    Class Overview
                </h3>
                <p className="w-full text-left">{overview}</p>
            </div>

            {linkComponent}
        </div>
    );
};

export default ClassCard;
