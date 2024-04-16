// options.ts
export const workloadOptions = ["1-3 hours", "4-6 hours", "7-9 hours", "10-12 hours", "12-15 hours", "16+ hours"]
    .map(option => ({ value: option, label: option }));

export const examsOptions = ["1", "2", "3", "4", "5"].map(option => ({ value: option, label: option }));

export const examFormatOptions = ["Multiple choice", "Open ended", "Essays"].map(option => ({ value: option, label: option }));

export const attendanceOptions = ["Mandatory", "Optional"].map(option => ({ value: option, label: option }));

export const ratingHelpText = {
    overall: { low: "Poor", high: "Excellent" },
    difficulty: { low: "Easy", high: "Hard" },
    professor: { low: "Unsatisfactory", high: "Outstanding" },
    content: { low: "Irrelevant", high: "Valuable" }
};

export const unitOptions = [
    { value: '0.5', label: '0.5' },
    { value: '1.0', label: '1.0' },
    { value: '2.0', label: '2.0' },
    { value: '3.0', label: '3.0' },
    { value: '4.0', label: '4.0' },
    { value: '5.0', label: '5.0' }
];

export const classLevelOptions = [
    { value: 'Lower Division', label: 'Lower Division' },
    { value: 'Upper Division', label: 'Upper Division' },
    { value: 'Graduate', label: 'Graduate' }
];
export const sortOptions = [
    { value: 'Overall', label: 'Sort by: Overall' },
    { value: 'Difficulty', label: 'Sort by: Difficulty' },
    { value: 'Professor', label: 'Sort by: Professor' },
    { value: 'Content', label: 'Sort by: Content' }
];
