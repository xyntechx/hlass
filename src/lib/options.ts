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
