"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import Image from "next/image";
import ClassCard from "@/components/class-review/class-card";
import { unitOptions, classLevelOptions, sortOptions } from "@/lib/options";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import useSession from "@/lib/supabase/use-session";
import { useFetchClasses } from "@/lib/supabase/fetch-classes";
import SortButton from "@/components/buttons/sort";
import InfiniteScroll from "react-infinite-scroll-component";
import Popup from "@/components/popup";
import { useRouter } from "next/navigation";

interface Rating {
    name: string;
    value: number;
}

interface Class {
    id: string;
    class_name: string;
    class_overview: string;
    prerequisites: string[];
    units: number;
    class_level: string;
    ratings: Rating[];
}

type OptionType = {
    value: string;
    label: string;
};

const supabase = createSupabaseBrowserClient();

const ClassReviewPage = () => {
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    const handleClassClick = (classData: Class) => {
        setSelectedClass(classData);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setSelectedClass(null);
    };

    const handleViewClass = () => {
        if (selectedClass) {
            router.push(`/reviews/class?id=${selectedClass.id}`);
        }
    };
    const user = useSession()?.user;
    const [bookmarkedClassIDs, setBookmarkedClassIDs] = useState<string[]>([]);

    const classOptions = useFetchClasses();
    const [sortBy, setSortBy] = useState<SingleValue<OptionType>>({
        value: "Overall",
        label: "Sort by: Overall",
    });
    const [sortOrder, setSortOrder] = useState("desc");
    const [classReviews, setClassReviews] = useState<Class[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPrerequisites, setSelectedPrerequisites] = useState<
        MultiValue<OptionType>
    >([]);
    const [selectedUnits, setSelectedUnits] = useState<MultiValue<OptionType>>(
        [],
    );
    const [selectedClassLevel, setSelectedClassLevel] = useState<
        MultiValue<OptionType>
    >([]);
    const [classCount, setClassCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const handlePrerequisitesChange = (newValue: MultiValue<OptionType>) => {
        setSelectedPrerequisites(newValue || []);
    };
    const handleUnitsChange = (newValue: MultiValue<OptionType>) => {
        setSelectedUnits(newValue || []);
    };
    const handleClassLevelChange = (newValue: MultiValue<OptionType>) => {
        setSelectedClassLevel(newValue || []);
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    };

    const handleSortBy = (selectedOption: SingleValue<OptionType>) => {
        if (selectedOption === null) {
            setSortBy({ value: "overall", label: "Overall" });
        } else {
            setSortBy(selectedOption);
        }
    };

    const clearAllFilters = () => {
        setClassReviews([]);
        setSearchQuery("");
        setSelectedPrerequisites([]);
        setSelectedUnits([]);
        setSelectedClassLevel([]);
    };

    const fetchClasses = useCallback(
        async (index: number) => {
            let query = supabase
                .from("classes")
                .select("*", { count: "exact" })
                .range(index * 10, (index + 1) * 10 - 1);

            if (searchQuery) {
                query = query.ilike("class_name", `%${searchQuery}%`);
            }

            if (selectedPrerequisites.length > 0) {
                const prerequisiteIds = selectedPrerequisites.map((pr) => pr.value);
                console.log("Prerequisite IDs:", prerequisiteIds);
                query = query.overlaps("prerequisites", prerequisiteIds);


                /* const prerequisiteIds = `{${selectedPrerequisites.map((pr) => pr.value).join(",")}}`;
                query = query.filter("prerequisites", "cs", prerequisiteIds); */
            }

            if (selectedUnits.length > 0) {
                const unitsValues = selectedUnits.map((u) => u.value);
                query = query.in("units", unitsValues);
            }

            if (selectedClassLevel.length > 0) {
                const classLevelValues = selectedClassLevel.map(
                    (cl) => cl.value,
                );
                query = query.in("class_level", classLevelValues);
            }

            const { data, count, error } = await query;

            if (count !== null) {
                setClassCount(count);
            }

            if (error) {
                console.error("Error fetching data:", error);
                return;
            }

            const transformedData = data.map((d) => ({
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
            }));

            if (index === 0) {
                setClassReviews(transformedData);
            } else {
                setClassReviews((prev) => [...prev, ...transformedData]);
            }
            setPageIndex(index);
            setHasMore(data.length === 10);
        },
        [searchQuery, selectedClassLevel, selectedPrerequisites, selectedUnits],
    );

    const resetAndFetchClasses = useCallback(() => {
        setPageIndex(0);
        setClassReviews([]);
        fetchClasses(0);
    }, [fetchClasses]);

    const fetchMoreClasses = useCallback(() => {
        const newIndex = pageIndex + 1;
        fetchClasses(newIndex);
    }, [fetchClasses, pageIndex]);

    useEffect(() => {
        resetAndFetchClasses();
    }, [resetAndFetchClasses]);

    useEffect(() => {
        if (!sortBy) return;

        const sortedReviews = [...classReviews].sort((a, b) => {
            // Dynamically fetch the rating values from the ratings array
            const valueA =
                a.ratings.find((r) => r.name == sortBy.value)?.value ?? 0;
            const valueB =
                b.ratings.find((r) => r.name == sortBy.value)?.value ?? 0;

            // Sorting logic remains the same
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        });

        // Use a function in setState to guarantee the new state is set
        console.log(sortedReviews);
        setClassReviews(() => sortedReviews);
    }, [sortBy, sortOrder]);

    useEffect(() => {
        const getBookmarkedClasses = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("bookmarked_class_ids")
                .eq("id", user!.id);

            if (!error) {
                setBookmarkedClassIDs(
                    data[0].bookmarked_class_ids
                        ? data[0].bookmarked_class_ids
                        : [],
                );
            }
        };

        if (user) getBookmarkedClasses();
    }, [user]);

    const handleBookmark = async (classID: string) => {
        let newBookmarks = [];

        if (bookmarkedClassIDs.includes(classID)) {
            newBookmarks = bookmarkedClassIDs.filter((c) => c !== classID);
        } else {
            newBookmarks = [...bookmarkedClassIDs, classID];
        }

        const { data, error } = await supabase
            .from("profiles")
            .update({ bookmarked_class_ids: newBookmarks })
            .eq("id", user!.id);

        setBookmarkedClassIDs(newBookmarks);
    };

    return (
        <div className="flex w-screen flex-row gap-x-16 p-10">
            <div className="fixed flex w-1/3 justify-end pr-16">
                {/* Sidebar Filter */}
                <div className="max-h-sm w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                    <div className="flex flex-row justify-between">
                        <h2 className="mb-4 text-lg font-bold">Filter</h2>
                        <button
                            onClick={clearAllFilters}
                            className="mb-4 text-secondary-blue hover:text-primary-blue"
                        >
                            Clear
                        </button>
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <div className="relative flex items-center pb-4">
                            <div
                                style={{
                                    position: "absolute",
                                    marginLeft: "10px",
                                    height: "20px",
                                    width: "20px",
                                }}
                            >
                                <Image
                                    src="/search_icon.png"
                                    alt="Search Icon"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search for a Class..."
                                className="w-full rounded border border-slate-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-2 focus:outline-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block pb-2 text-sm font-bold text-gray-700">
                                Prerequisites
                            </label>
                            <Select
                                isMulti
                                name="prerequisites"
                                options={classOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Select prerequisites..."
                                value={selectedPrerequisites}
                                onChange={handlePrerequisitesChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block pb-2 text-sm font-bold text-gray-700">
                                Units
                            </label>
                            <Select
                                isMulti
                                name="units"
                                options={unitOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Select units..."
                                value={selectedUnits}
                                onChange={handleUnitsChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block pb-2 text-sm font-bold text-gray-700">
                                Class Level
                            </label>
                            <Select
                                isMulti
                                name="class-level"
                                options={classLevelOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Select class level..."
                                value={selectedClassLevel}
                                onChange={handleClassLevelChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="ml-1/3 w-2/3">
                {" "}
                {/* Review Cards Container */}
                <div className="flex w-full items-center justify-between px-4">
                    <span>{classCount} Results</span>
                    <div className="flex flex-row gap-x-2">
                        <SortButton
                            sortOrder={sortOrder}
                            onToggle={() =>
                                setSortOrder(
                                    sortOrder === "asc" ? "desc" : "asc",
                                )
                            }
                        />
                        <Select
                            value={sortBy}
                            onChange={handleSortBy}
                            options={sortOptions}
                        />
                        <a
                            href="/reviews/submit"
                            className="rounded-md border-2 border-primary-blue bg-primary-blue px-4 py-1 text-white transition-shadow hover:shadow-lg"
                        >
                            + Review
                        </a>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={classReviews.length}
                    next={fetchMoreClasses}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {classReviews.map((classReview) => (
                        <div key={classReview.id} className="p-4">
                            <ClassCard
                                id={classReview.id}
                                name={classReview.class_name}
                                ratings={classReview.ratings}
                                overview={classReview.class_overview}
                                linkComponent={
                                    <button
                                        onClick={() =>
                                            handleBookmark(classReview.id)
                                        }
                                    >
                                        <Image
                                            src={
                                                bookmarkedClassIDs.includes(
                                                    classReview.id,
                                                )
                                                    ? "/bookmark-full.svg"
                                                    : "/bookmark-empty.svg"
                                            }
                                            alt="View Review"
                                            width={30}
                                            height={30}
                                        />
                                    </button>
                                }
                                onClick={() => handleClassClick(classReview)}
                            />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
            <Popup show={showPopup} onClose={handlePopupClose} onViewClass={handleViewClass}>
                {selectedClass && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                    {selectedClass.class_name}
                    </h2>
                    <p className="mb-4">{selectedClass.class_overview}</p>
                </div>
                )}
            </Popup>
        </div>
    );
};

export default ClassReviewPage;
