import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type OptionType = {
    value: string;
    label: string;
};

export function useFetchClasses() {
    const [classOptions, setClassOptions] = useState<OptionType[]>([]);
    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        async function fetchClasses() {
            let { data, error } = await supabase
                .from("classes")
                .select("id, class_name");

            if (error) {
                console.error('Error fetching classes:', error);
                return;
            }

            if (data) {
                const options: OptionType[] = data.map(c => ({
                    value: c.id,
                    label: c.class_name,
                }));
                setClassOptions(options);
            }
        }

        fetchClasses();
    }, [supabase]);

    return classOptions;
}
