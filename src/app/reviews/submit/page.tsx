"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Rating from "react-stars";
import Select, { SingleValue } from "react-select";
import useSession from "@/lib/supabase/use-session";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import {
    workloadOptions,
    examsOptions,
    examFormatOptions,
    attendanceOptions,
    ratingHelpText,
} from "@/lib/options";

type OptionType = {
    value: string;
    label: string;
};

const ReviewForm = () => {
    const user = useSession()?.user;
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const [classOptions, setClassOptions] = useState<OptionType[]>([]);
    const [selectedClass, setSelectedClass] = useState<OptionType | null>(null);
    const [semesters, setSemesters] = useState<OptionType[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<OptionType | null>(
        null,
    );
    const [professorMapping, setProfessorMapping] = useState<
        Record<string, string[]>
    >({});
    const [professorOptions, setProfessorOptions] = useState<OptionType[]>([]);
    const [selectedProfessor, setSelectedProfessor] =
        useState<OptionType | null>(null);

    useEffect(() => {
        const fetchClasses = async () => {
            let { data, error } = await supabase
                .from("classes")
                .select("id, class_name");

            if (error) {
                return;
            }

            if (data) {
                const options: OptionType[] = data.map((c) => ({
                    value: c.id,
                    label: c.class_name,
                }));
                setClassOptions(options);
            }
        };

        fetchClasses();
    }, [supabase]);

    const handleClassChange = (selectedOption: OptionType | null) => {
        setSelectedClass(selectedOption);
        setSelectedSemester(null);
        setProfessorOptions([]);
        setSelectedProfessor(null);
    };

    useEffect(() => {
        const fetchClassInstances = async () => {
            if (selectedClass) {
                let { data, error } = await supabase
                    .from("class_instances")
                    .select("id, semester, professors");

                if (error) {
                    return;
                }
                if (data) {
                    const semesterOptions: OptionType[] = data.map((c) => ({
                        value: c.id,
                        label: c.semester,
                    }));
                    setSemesters(semesterOptions);

                    const newProfessorMapping: Record<string, string[]> = {};
                    data.forEach((instance) => {
                        newProfessorMapping[instance.id] = instance.professors;
                    });
                    setProfessorMapping(newProfessorMapping);
                }
            }
        };

        fetchClassInstances();
    }, [selectedClass, supabase]);

    const handleSemesterChange = (selectedOption: OptionType | null) => {
        setSelectedSemester(selectedOption);

        if (selectedOption) {
            const professors = professorMapping[selectedOption.value] || [];
            const profOptions: OptionType[] = professors.map((prof) => ({
                value: prof,
                label: prof,
            }));
            setProfessorOptions(profOptions);
        } else {
            setProfessorOptions([]);
        }

        setSelectedProfessor(null);
    };

    const handleProfessorChange = (selectedOption: OptionType | null) => {
        setSelectedProfessor(selectedOption);
    };

    const [ratings, setRatings] = useState({
        overall: 0,
        difficulty: 0,
        professor: 0,
        content: 0,
    });
    const [classInfo, setClassInfo] = useState({
        workload: null,
        numExams: null,
        examFormat: null,
        attendance: null,
    });
    const [prosCons, setProsCons] = useState({ pros: "", cons: "" });
    const [additionalComments, setAdditionalComments] = useState("");

    const handleRatingChange = (ratingType: string, value: number) => {
        setRatings({ ...ratings, [ratingType]: value });
    };

    const handleClassInfoChange = (
        name: string,
        selectedOption: SingleValue<OptionType>,
    ) => {
        const value = selectedOption ? selectedOption.value : "";
        setClassInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleProsConsChange = (field: string, value: string) => {
        setProsCons((prevProsCons) => ({
            ...prevProsCons,
            [field]: value,
        }));
    };

    const consolidateData = () => {
        return {
            profile_id: user?.id,
            class_id: selectedClass?.value,
            rating_difficulty: ratings.difficulty,
            rating_overall: ratings.overall,
            rating_professor: ratings.professor,
            rating_content: ratings.content,
            comments: additionalComments,
            semester: selectedSemester?.label,
            professor: selectedProfessor?.label,
            workload: classInfo.workload,
            num_exams: classInfo.numExams,
            exam_format: classInfo.examFormat,
            attendance_policy: classInfo.attendance,
            pros: prosCons.pros,
            cons: prosCons.cons,
        };
    };

    async function handleSubmit() {
        if (!user) {
            alert("You must log in to submit a review.");
            return;
        }
        const reviewData = consolidateData();
        try {
            const { error } = await supabase.from("reviews").insert(reviewData);
            if (error) throw error;
            router.push("/reviews/thank-you");
        } catch (error) {
            alert("Failed to submit review.");
        }
    }

    return (
        <>
            {/* Header & Selection*/}
            <section className="min-h-screen container mx-auto max-w-full p-10 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="p-10 text-center text-5xl font-bold">
                    Submit a Review
                </h1>
                <div className="p flex justify-between">
                    <div className="flex w-1/3 flex-col p-4">
                        <Select
                            options={classOptions}
                            onChange={handleClassChange}
                            value={selectedClass}
                            placeholder="Choose a Class"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: "1.25rem", // Bigger text size
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Drop shadow
                                }),
                            }}
                        />
                    </div>
                    <div className="flex w-1/3 flex-col p-4">
                        <Select
                            options={semesters}
                            onChange={handleSemesterChange}
                            value={selectedSemester}
                            placeholder="Select Semester"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: "1.25rem", // Bigger text size
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Drop shadow
                                }),
                            }}
                        />
                    </div>
                    <div className="flex w-1/3 flex-col p-4">
                        <Select
                            options={professorOptions}
                            onChange={handleProfessorChange}
                            value={selectedProfessor}
                            placeholder="Select Professor"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: "1.25rem", // Bigger text size
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Drop shadow
                                }),
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Rating Card */}
            <section className="h-128 container mx-auto max-w-full p-10 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                {/* Map through each rating type (overall, difficulty, etc.) and render Rating components */}
                <h1 className="pb-4 text-4xl font-bold">Rating</h1>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    {Object.entries(ratings).map(([key, value]) => (
                        <div key={key}>
                            <div className="flex flex-row items-center justify-stretch">
                                <label className="w-1/4 self-start pl-4 pt-4 text-xl font-bold">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                <div className="w-1/2 flex-col items-center">
                                    <div className="flex justify-around">
                                        <Rating
                                            count={5}
                                            value={value}
                                            onChange={(newValue) =>
                                                handleRatingChange(
                                                    key,
                                                    newValue,
                                                )
                                            }
                                            size={60}
                                        />
                                    </div>
                                    <div className="text-s flex w-full justify-around pb-2 md:text-sm">
                                        <span>
                                            1 -{" "}
                                            {
                                                ratingHelpText[
                                                    key as keyof typeof ratingHelpText
                                                ].low
                                            }
                                        </span>
                                        <span>
                                            5 -{" "}
                                            {
                                                ratingHelpText[
                                                    key as keyof typeof ratingHelpText
                                                ].high
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {key !== "content" && (
                                <div className="h-0.5 w-full bg-black"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Class Info Card */}
            <section className="h-128 container mx-auto max-w-full p-10 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="pb-4 text-4xl font-bold">Class Info</h1>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    {/* Workload Dropdown */}
                    <div className="flex flex-row items-center justify-between pb-12 pt-10">
                        <label className="pl-4 text-xl font-bold">
                            Workload
                        </label>
                        <Select
                            placeholder="Select hours per week"
                            value={workloadOptions.find(
                                (option) => option.value === classInfo.workload,
                            )}
                            onChange={(selectedOption) =>
                                handleClassInfoChange(
                                    "workload",
                                    selectedOption,
                                )
                            }
                            options={workloadOptions}
                        />
                    </div>
                    <div className="h-0.5 w-full bg-black"></div>

                    {/* Number of Exams Dropdown */}
                    <div className="flex flex-row items-center justify-between pb-12 pt-12">
                        <label className="pl-4 text-xl font-bold">
                            Number of Exams
                        </label>
                        <Select
                            placeholder="Select number of exams"
                            value={examsOptions.find(
                                (option) => option.value === classInfo.numExams,
                            )}
                            onChange={(selectedOption) =>
                                handleClassInfoChange(
                                    "numExams",
                                    selectedOption,
                                )
                            }
                            options={examsOptions}
                        />
                    </div>
                    <div className="h-0.5 w-full bg-black"></div>

                    {/* Exam Format Dropdown */}
                    <div className="flex flex-row items-center justify-between pb-12 pt-12">
                        <label className="pl-4 text-xl font-bold">
                            Exam Format
                        </label>
                        <Select
                            placeholder="Select exam format"
                            value={examFormatOptions.find(
                                (option) =>
                                    option.value === classInfo.examFormat,
                            )}
                            onChange={(selectedOption) =>
                                handleClassInfoChange(
                                    "examFormat",
                                    selectedOption,
                                )
                            }
                            options={examFormatOptions}
                        />
                    </div>
                    <div className="h-0.5 w-full bg-black"></div>

                    {/* Attendance Policy Dropdown */}
                    <div className="flex flex-row items-center justify-between pb-10 pt-12">
                        <label className="pl-4 text-xl font-bold">
                            Attendance Policy
                        </label>
                        <Select
                            placeholder="Select attendance policy"
                            value={attendanceOptions.find(
                                (option) =>
                                    option.value === classInfo.attendance,
                            )}
                            onChange={(selectedOption) =>
                                handleClassInfoChange(
                                    "attendance",
                                    selectedOption,
                                )
                            }
                            options={attendanceOptions}
                        />
                    </div>
                </div>
            </section>

            {/* Pros & Cons Section */}
            <section className="h-128 container mx-auto max-w-full p-10 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="pb-4 text-left text-4xl font-bold">
                    Pros and Cons
                </h1>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    {/* Pros Text Area */}
                    <label className="text-2l pb-8 font-bold">Pros</label>
                    <textarea
                        value={prosCons.pros}
                        onChange={(e) =>
                            handleProsConsChange("pros", e.target.value)
                        }
                        className="h-32 w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-gray-700 hover:border-gray-700"
                        rows={4}
                        placeholder="What did you like about the class?"
                    ></textarea>
                    <div className="p-4"></div>

                    {/* Cons Text Area */}
                    <label className="text-2l pb-8 font-bold">Cons</label>
                    <textarea
                        value={prosCons.cons}
                        onChange={(e) =>
                            handleProsConsChange("cons", e.target.value)
                        }
                        className="h-32 w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-gray-700 hover:border-gray-700"
                        rows={4}
                        placeholder="What could be improved?"
                    ></textarea>
                </div>
            </section>

            {/* Additional Comments Section */}
            <section className="h-128 container mx-auto max-w-full p-10 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="pb-4 text-left text-4xl font-bold">
                    Additional Comments
                </h1>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    {/* Additional Comments Text Area */}
                    <div>
                        <label className="text-2l pb-8 font-bold">
                            Overall Experience
                        </label>
                        <textarea
                            value={additionalComments}
                            onChange={(e) =>
                                setAdditionalComments(e.target.value)
                            }
                            className="h-32 w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-gray-700 hover:border-gray-700"
                            rows={4}
                            placeholder="Any additional thoughts or comments on the class?"
                        ></textarea>
                    </div>
                </div>
            </section>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="rounded-full border-2 border-primary-blue bg-primary-blue px-10 py-2 text-white transition-shadow hover:shadow-lg"
            >
                Submit
            </button>
            <div className="pb-10"></div>
        </>
    );
};

export default ReviewForm;
