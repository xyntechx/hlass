"use client";

import { useEffect, useState } from 'react';
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

const ReviewPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [selectedClass, setselectedClass] = useState<Class | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<string | null>(id as string);
    const classOptions = useFetchClasses();

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
                setselectedClass(classData);
            }
        };

        if (selectedClassId) {
            fetchClassData(selectedClassId);
        }
    }, [selectedClassId]);

    if (!selectedClass) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{selectedClass.class_name}</h1>
        </div>
    );
};

export default ReviewPage;
