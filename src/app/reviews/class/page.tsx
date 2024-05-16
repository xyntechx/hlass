"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useFetchClasses } from '@/lib/supabase/fetch-classes';

interface Class {
    id: string;
    class_name: string;
    class_overview: string;
    prerequisites: string[];
    units: number;
    class_level: string;
    ratings: Rating[];
}

interface Rating {
    name: string;
    value: number;
}

const supabase = createSupabaseBrowserClient();

const ClassDetails = () => {
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchClassData = async (classId: string) => {
            const { data, error } = await supabase
                .from('classes')
                .select('*')
                .eq('id', classId)
                .single();

            if (error) {
                console.error('Error fetching class data:', error);
            } else {
                const classData = data as Class;
                setSelectedClass(classData);
            }
        };

        if (id) {
            fetchClassData(id);
        }
    }, [id]);

    if (!selectedClass) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">{selectedClass.class_name}</h1>
            {/* TODO: Add other class details here */}
        </div>
    );
};

const ReviewPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClassDetails/>
        </Suspense>
    );
};

export default ReviewPage;
