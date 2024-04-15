"use client";

interface IProps {
    message: string;
    type: "success" | "error" | "info";
    close: () => void;
}

const Alert = ({ message, type, close }: IProps) => {
    if (type === "success") {
        return (
            <div className="fixed top-0 flex w-screen items-center justify-between bg-green-200 p-4 text-center">
                <p>{message}</p>
                <button onClick={() => close()}>X</button>
            </div>
        );
    } else if (type === "error") {
        return (
            <div className="fixed top-0 flex w-screen items-center justify-between bg-red-200 p-4 text-center">
                <p>{message}</p>
                <button onClick={() => close()}>X</button>
            </div>
        );
    } else {
        return (
            <div className="fixed top-0 flex w-screen items-center justify-between bg-blue-200 p-4 text-center">
                <p>{message}</p>
                <button onClick={() => close()}>X</button>
            </div>
        );
    }
};

export default Alert;
