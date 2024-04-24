"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import useSession from "@/lib/supabase/use-session";
import Logout from "@/components/buttons/logout";
import ClassCard from "@/components/class-review/class-card";
import Image from "next/image";

interface IReviews {
    id: string;
    class_name: string;
    class_overview: string;
    rating_overall: number;
    rating_difficulty: number;
    rating_professor: number;
    rating_content: number;
}

interface IRating {
    name: string;
    value: number;
}

interface IClass {
    id: string;
    class_name: string;
    class_overview: string;
    prerequisites: string[];
    units: number;
    class_level: string;
    ratings: IRating[];
}

export default function Account() {
    const user = useSession()?.user;
    const supabase = createSupabaseBrowserClient();

    const [gradYear, setGradYear] = useState<number>(new Date().getFullYear());
    const [bookmarkedClassIDs, setBookmarkedClassIDs] = useState<string[]>([]);
    const [bookmarked, setBookmarked] = useState<IClass[]>([]);
    const [usersReviews, setUsersReviews] = useState<IReviews[]>([]);

    useEffect(() => {
        const getUserData = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("grad_year, bookmarked_class_ids")
                .eq("id", user!.id);

            if (!error) {
                setGradYear(data[0].grad_year && data[0].grad_year);
                setBookmarkedClassIDs(
                    data[0].bookmarked_class_ids
                        ? data[0].bookmarked_class_ids
                        : [],
                );
            }
        };

        if (user) getUserData();
    }, [user]);

    useEffect(() => {
        const getUsersReviews = async () => {
            const { data, error } = await supabase
                .from("reviews")
                .select(
                    "id, class_id, rating_overall, rating_difficulty, rating_professor, rating_content",
                )
                .eq("profile_id", user!.id);

            if (!error) {
                const reviews: IReviews[] = [];

                for (const review of data) {
                    const class_data = await getClassData(review.class_id);

                    reviews.push({
                        id: review.id,
                        class_name: class_data && class_data.class_name,
                        class_overview: class_data && class_data.class_overview,
                        rating_overall: review.rating_overall,
                        rating_difficulty: review.rating_difficulty,
                        rating_professor: review.rating_professor,
                        rating_content: review.rating_content,
                    });
                }

                setUsersReviews(reviews);
            }
        };

        if (user) getUsersReviews();
    }, [user]);

    useEffect(() => {
        const getBookmarkedData = async () => {
            const tempBookmarked: IClass[] = [];

            for (const id of bookmarkedClassIDs) {
                const d = await getClassData(id);

                tempBookmarked.push({
                    id: d.id,
                    class_name: d.class_name,
                    class_overview: d.class_overview,
                    prerequisites: d.prerequisites,
                    units: d.units,
                    class_level: d.class_level,
                    ratings: [
                        { name: "Overall", value: d.avg_rating_overall },
                        { name: "Difficulty", value: d.avg_rating_difficulty },
                        { name: "Professor", value: d.avg_rating_professor },
                        { name: "Content", value: d.avg_content_rating },
                    ],
                });
            }

            setBookmarked(tempBookmarked);
        };

        getBookmarkedData();
    }, [bookmarkedClassIDs]);

    const handleUpdateGradYear = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .update({ grad_year: Number(gradYear) })
            .eq("id", user?.id);
    };

    const getClassData = async (class_id: string) => {
        const { data, error } = await supabase
            .from("classes")
            .select()
            .eq("id", class_id);

        if (!error) return data[0];
    };

    if (user) {
        return (
            <section className="flex min-h-screen w-full flex-col items-center justify-start gap-y-20 px-4 pb-1">
                <h1 className="pt-10 text-center text-4xl font-bold">
                    My Account
                </h1>

                <div className="flex w-full flex-col items-center justify-center gap-y-2 md:w-1/2">
                    <div className="flex w-full flex-row items-center justify-start">
                        <p className="w-[200px] text-dim">Full Name</p>
                        <p>{user?.user_metadata?.full_name}</p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-start">
                        <p className="w-[200px] text-dim">Berkeley Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-start">
                        <p className="w-[200px] text-dim">Graduation Year</p>
                        <input
                            type="text"
                            value={gradYear}
                            onChange={(e) =>
                                setGradYear(Number(e.currentTarget.value))
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleUpdateGradYear()
                            }
                            onBlur={() => handleUpdateGradYear()}
                            className="w-[60px] rounded-md border p-1 text-center outline-none focus:border-black"
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-y-4 md:w-1/2">
                    <h1 className="w-full text-left text-xl font-semibold tracking-wide">
                        BOOKMARKED CLASSES
                    </h1>
                    <div className="flex w-full flex-col items-center justify-center gap-y-4">
                        {bookmarked.map((c) => (
                            <ClassCard
                                key={c.id}
                                id={c.id}
                                name={c.class_name}
                                ratings={c.ratings}
                                overview={c.class_overview}
                                linkComponent={
                                    // TODO: update href with indiv review page url
                                    <a href="/reviews/#">
                                        <Image
                                            src="/open-link.svg"
                                            alt="View Review"
                                            width={30}
                                            height={30}
                                        />
                                    </a>
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-y-4 md:w-1/2">
                    <h1 className="w-full text-left text-xl font-semibold tracking-wide">
                        MY REVIEWS
                    </h1>
                    <div className="flex w-full flex-col items-center justify-center gap-y-4">
                        {usersReviews.map((r) => (
                            <ClassCard
                                key={r.id}
                                id={r.id}
                                name={r.class_name}
                                ratings={[
                                    {
                                        name: "Overall",
                                        value: r.rating_overall,
                                    },
                                    {
                                        name: "Difficulty",
                                        value: r.rating_difficulty,
                                    },
                                    {
                                        name: "Professor",
                                        value: r.rating_professor,
                                    },
                                    {
                                        name: "Content",
                                        value: r.rating_content,
                                    },
                                ]}
                                overview={r.class_overview}
                                linkComponent={
                                    // TODO: update href with indiv review page url
                                    <a href="/reviews/#">
                                        <Image
                                            src="/open-link.svg"
                                            alt="View Review"
                                            width={30}
                                            height={30}
                                        />
                                    </a>
                                }
                            />
                        ))}
                    </div>
                </div>

                <Logout />
            </section>
        );
    } else {
        return (
            <section className="flex h-full w-full flex-col items-center justify-center">
                <p>No user found</p>
            </section>
        );
    }
}
