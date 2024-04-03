'use client';

import React, { useEffect, useState } from 'react';
import Rating from 'react-stars';
import Select, { SingleValue } from 'react-select';
import useSession from '@/lib/supabase/use-session';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-client';


const workloadOptions = ["1-3 hours", "4-6 hours", "7-9 hours", "10-12 hours", "12-15 hours", "16+ hours"]
  .map(option => ({ value: option, label: option }));
const examsOptions = ["1", "2", "3", "4", "5"].map(option => ({ value: option, label: option }));
const examFormatOptions = ["Multiple choice", "Open ended", "Essays"].map(option => ({ value: option, label: option }));
const attendanceOptions = ["Mandatory", "Optional"].map(option => ({ value: option, label: option }));

type OptionType = {
    value: string;
    label: string;
};

const ratingHelpText = {
  overall: { low: "Poor", high: "Excellent" },
  difficulty: { low: "Easy", high: "Hard" },
  professor: { low: "Unsatisfactory", high: "Outstanding" },
  content: { low: "Irrelevant", high: "Valuable" }
};

const ReviewForm = () => {
    const user = useSession()?.user;
    const supabase = createSupabaseBrowserClient();
    useEffect(() => {
        //TEMP FIX: user isn't initialized(session state isn't established) and goes in loop without timeout
        const checkSessionTimeout = setTimeout(() => {
            if (!user) {
                supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: `${location.origin}/account`,
                    },
                });
            }
        }, 1000);

        return () => clearTimeout(checkSessionTimeout);
    }, [user, supabase]);

    const [ratings, setRatings] = useState({ overall: 0, difficulty: 0, professor: 0, content: 0 });
    const [classInfo, setClassInfo] = useState({ workload: '', numExams: '', examFormat: '', attendance: '' });
    const [prosCons, setProsCons] = useState({ pros: '', cons: '' });
    const [additionalComments, setAdditionalComments] = useState('');


    const handleRatingChange = (ratingType: string, value: number) => {
        setRatings({ ...ratings, [ratingType]: value });
    };

    const handleClassInfoChange = (name: string, selectedOption: SingleValue<OptionType>) => {
        const value = selectedOption ? selectedOption.value : '';
        setClassInfo(prev => ({ ...prev, [name]: value }));
    };
    
    const handleProsConsChange = (field: string, value: string) => {
      setProsCons(prevProsCons => ({
          ...prevProsCons,
          [field]: value
      }));
    };


    function handleSubmit(event: any): void {
        throw new Error('Function not implemented.');
    }

    return (
        <>
            {/* Header & Selection*/}
            <section className="container mx-auto p-10 h-128 max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="text-5xl font-bold p-10 text-center">Submit a Review</h1>
                <div className="flex justify-between p">
                    <div className="flex flex-col w-1/3 p-4">
                        {/* TODO: Fill in select options + values with data from supabase*/}
                        <Select
                        placeholder="Choose a Class"
                        isClearable={true}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                fontSize: '1.25rem', // Bigger text size
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Drop shadow
                            }),
                        }}
                        />
                    </div>
                    <div className="flex flex-col w-1/3 p-4">
                        <Select
                        placeholder="Select Semester"
                        isClearable={true}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                fontSize: '1.25rem', // Bigger text size
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Drop shadow
                            }),
                        }}
                        />
                    </div>
                    <div className="flex flex-col w-1/3 p-4">
                        <Select
                        placeholder="Select Professor"
                        isClearable={true}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                fontSize: '1.25rem', // Bigger text size
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Drop shadow
                            }),
                        }}
                        />
                    </div>
                </div>
            </section>

            {/* Rating Card */}
            <section className="container mx-auto p-10 h-128 max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                {/* Map through each rating type (overall, difficulty, etc.) and render Rating components */}
                <h1 className="text-4xl font-bold pb-4">Rating</h1>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg">
                    {Object.entries(ratings).map(([key, value]) => (
                        <div key={key}>
                            <div className="flex flex-row items-center justify-stretch">
                                <label className="text-xl font-bold pt-4 pl-4 w-1/4 self-start">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                <div className="flex-col items-center w-1/2">
                                    <div className="flex justify-around">
                                      <Rating
                                          count={5}
                                          value={value}
                                          onChange={(newValue) => handleRatingChange(key, newValue)}
                                          size={60}
                                      />
                                    </div>
                                    <div className="flex justify-around text-s md:text-sm w-full pb-2">
                                        <span>1 - {ratingHelpText[key as keyof typeof ratingHelpText].low}</span>
                                        <span>5 - {ratingHelpText[key as keyof typeof ratingHelpText].high}</span>
                                    </div>
                                </div>
                            </div>
                            {key !== "content" && (
                                <div className="bg-black h-0.5 w-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Class Info Card */}
            <section className="container mx-auto p-10 h-128 max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="text-4xl font-bold pb-4">Class Info</h1>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg">
                  {/* Workload Dropdown */}
                  <div className="flex flex-row items-center justify-between pt-10 pb-12">
                      <label className="text-xl font-bold pl-4">Workload</label>
                      <Select
                          placeholder="Select hours per week"
                          value={workloadOptions.find(option => option.value === classInfo.workload)}
                          onChange={(selectedOption) => handleClassInfoChange('workload', selectedOption)}
                          options={workloadOptions}
                      />
                  </div>
                  <div className="bg-black h-0.5 w-full"></div>

                  {/* Number of Exams Dropdown */}
                  <div className="flex flex-row items-center justify-between pt-12 pb-12">
                      <label className="text-xl font-bold pl-4">Number of Exams</label>
                      <Select
                          placeholder="Select number of exams"
                          value={examsOptions.find(option => option.value === classInfo.numExams)}
                          onChange={(selectedOption) => handleClassInfoChange('numExams', selectedOption)}
                          options={examsOptions}
                      />
                  </div>
                  <div className="bg-black h-0.5 w-full"></div>

                  {/* Exam Format Dropdown */}
                  <div className="flex flex-row items-center justify-between pt-12 pb-12">
                      <label className="text-xl font-bold pl-4">Exam Format</label>
                      <Select
                          placeholder="Select exam format"
                          value={examFormatOptions.find(option => option.value === classInfo.examFormat)}
                          onChange={(selectedOption) => handleClassInfoChange('examFormat', selectedOption)}
                          options={examFormatOptions}
                      />
                  </div>
                  <div className="bg-black h-0.5 w-full"></div>

                  {/* Attendance Policy Dropdown */}
                  <div className="flex flex-row items-center justify-between pt-12 pb-10">
                      <label className="text-xl font-bold pl-4">Attendance Policy</label>
                      <Select
                          placeholder="Select attendance policy"
                          value={attendanceOptions.find(option => option.value === classInfo.attendance)}
                          onChange={(selectedOption) => handleClassInfoChange('attendance', selectedOption)}
                          options={attendanceOptions}
                      />
                  </div>
                </div>

            </section>

            {/* Pros & Cons Section */}
            <section className="container mx-auto p-10 h-128 max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="text-left text-4xl font-bold pb-4">Pros and Cons</h1>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg">
                  {/* Pros Text Area */}
                  <label className="text-2l font-bold pb-8">Pros</label>
                  <textarea 
                      value={prosCons.pros} 
                      onChange={(e) => handleProsConsChange('pros', e.target.value)} 
                      className="border border-gray-500 rounded-md text-gray-700 h-32 w-full px-4 py-2 bg-white hover:border-gray-700"
                      rows={4}
                      placeholder="What did you like about the class?">
                  </textarea>
                  <div className='p-4'></div>

                  {/* Cons Text Area */}
                  <label className="text-2l font-bold pb-8">Cons</label>
                  <textarea 
                      value={prosCons.cons} 
                      onChange={(e) => handleProsConsChange('cons', e.target.value)} 
                      className="border border-gray-500 rounded-md text-gray-700 h-32 w-full px-4 py-2 bg-white hover:border-gray-700"
                      rows={4}
                      placeholder="What could be improved?">
                  </textarea>
                </div>
            </section>

            {/* Additional Comments Section */}
            <section className="container mx-auto p-10 h-128 max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="text-left text-4xl font-bold pb-4">Additional Comments</h1>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg">
                  {/* Additional Comments Text Area */}
                  <div>
                      <label className="text-2l font-bold pb-8">Overall Experience</label>
                      <textarea 
                          value={additionalComments} 
                          onChange={(e) => setAdditionalComments(e.target.value)} 
                          className="border border-gray-500 rounded-md text-gray-700 h-32 w-full px-4 py-2 bg-white hover:border-gray-700"
                          rows={4}
                          placeholder="Any additional thoughts or comments on the class?">
                      </textarea>
                  </div>
                </div>
            </section>

            {/* Submit Button */}
            <button onClick={handleSubmit} className='rounded-full border-2 border-primary-blue bg-primary-blue px-10 py-2 text-white transition-shadow hover:shadow-lg'>Submit</button>
            <div className='pb-10'></div>
        </>
    );
};

export default ReviewForm;
