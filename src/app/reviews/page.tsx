'use client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import Image from 'next/image';
import ClassCard from '@/components/class-review/class-card';
import {
    unitOptions,
    classLevelOptions,
    sortOptions,
} from '@/lib/options';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { useFetchClasses } from '@/lib/supabase/fetch-classes';
import SortButton from '@/components/buttons/sort';

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
    const classOptions = useFetchClasses();
    const [sortBy, setSortBy] = useState<SingleValue<OptionType>>({ value: 'Overall', label: 'Sort by: Overall' });
    const [sortOrder, setSortOrder] = useState('desc');
    const [classReviews, setClassReviews] = useState<Class[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPrerequisites, setSelectedPrerequisites] = useState<MultiValue<OptionType>>([]);
    const [selectedUnits, setSelectedUnits] = useState<MultiValue<OptionType>>([]);
    const [selectedClassLevel, setSelectedClassLevel] = useState<MultiValue<OptionType>>([]);

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
            setSortBy({ value: 'overall', label: 'Overall' });
        } else {
            setSortBy(selectedOption);
        }
    }

    const clearAllFilters = () => {
        setClassReviews([]);
        setSearchQuery('');
        setSelectedPrerequisites([]);
        setSelectedUnits([]);
        setSelectedClassLevel([]);
    };

    const fetchClasses = useCallback(async () => {

        let query = supabase
            .from('classes')
            .select('*')

        if (searchQuery) {
            query = query.ilike('class_name', `%${searchQuery}%`);
        }
        
        if (selectedPrerequisites.length > 0) {
            const prerequisiteIds = `{${selectedPrerequisites.map(pr => pr.value).join(',')}}`;
            query = query.filter('prerequisites', 'cs', prerequisiteIds);
        }

        if (selectedUnits.length > 0) {
            const unitsValues = selectedUnits.map(u => u.value);
            query = query.in('units', unitsValues);
        }

        if (selectedClassLevel.length > 0) {
            const classLevelValues = selectedClassLevel.map(cl => cl.value);
            query = query.in('class_level', classLevelValues);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        const transformedData = data.map(d => ({
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
            ]
        }));

        setClassReviews(transformedData);
        
    }, [searchQuery, selectedClassLevel, selectedPrerequisites, selectedUnits]);

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]); 

    useEffect(() => {
        if (!sortBy) return;

        const sortedReviews = [...classReviews].sort((a, b) => {
            // Dynamically fetch the rating values from the ratings array
            const valueA = a.ratings.find(r => r.name == sortBy.value)?.value ?? 0;
            const valueB = b.ratings.find(r => r.name == sortBy.value)?.value ?? 0;

            // Sorting logic remains the same
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        });

        // Use a function in setState to guarantee the new state is set
        console.log(sortedReviews)
        setClassReviews(() => sortedReviews);
    }, [sortBy, sortOrder]);


    return (
        <div className="flex flex-row p-10 gap-x-16 w-screen">
            <div className="w-1/3 flex justify-end fixed pr-16"> {/* Sidebar Filter */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-lg max-w-sm max-h-sm">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-lg mb-4">Filter</h2>
                        <button onClick={clearAllFilters} className="text-secondary-blue hover:text-primary-blue mb-4">Clear</button>
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <div className="relative flex items-center pb-4">
                            <div style={{ position: 'absolute', marginLeft: '10px', height: '20px', width: '20px' }}>
                                <Image src="/search_icon.png" alt="Search Icon" width={20} height={20} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search for a Class..."
                                className="pl-10 pr-3 py-2 w-full border border-slate-300 rounded focus:outline-blue-500 focus:outline-2 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 pb-2">Prerequisites</label>
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
                            <label className="block text-sm font-bold text-gray-700 pb-2">Units</label>
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
                            <label className="block text-sm font-bold text-gray-700 pb-2">Class Level</label>
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

            <div className="w-2/3 ml-1/3"> {/* Review Cards Container */}
                <div className="flex justify-between items-center pl-4 max-w-3xl">
                    <span>{classReviews.length} Results</span>
                    <div className='flex flex-row gap-x-2'>
                        <SortButton 
                            sortOrder={sortOrder} 
                            onToggle={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        />
                        <Select
                            value={sortBy}
                            onChange={handleSortBy}
                            options={sortOptions}
                        />
                    </div>
                </div>
                {classReviews.map(classReview => (
                    <div key={classReview.id} className="p-4">
                        <ClassCard
                            id={classReview.id}
                            className={classReview.class_name}
                            ratings={classReview.ratings}
                            overview={classReview.class_overview}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassReviewPage;
