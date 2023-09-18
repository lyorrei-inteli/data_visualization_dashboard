"use client";
import { fetchInstance } from "@/config/fetch";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { Button } from "../Button";

export interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
}

export const TodoItem = ({ id, title, completed }: TodoItemProps) => {
    const [completedState, setCompletedState] = React.useState(completed);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [editState, setEditState] = React.useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title,
        },
    });

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        try {
            await fetchInstance(`/todos/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    completed: e.target.checked,
                }),
            });
            setCompletedState(e.target.checked);
            toast.success("Todo updated successfully");
        } catch (error) {
            toast.error("Error updating todo");
        }
        setLoading(false);
    };

    const handleDeleteTodo = async () => {
        setLoading(true);
        try {
            await fetchInstance(`/todos/${id}`, {
                method: "DELETE",
            });
            router.refresh();
            toast.info("Todo deleted successfully");
        } catch (error) {
            toast.error("Error deleting todo");
            setLoading(false);
        }
    };

    const handleEdit = async (data) => {
        if (data.title === title) return setEditState(false);
        if (!data.title) return toast.error("Title cannot be empty");

        setLoading(true);
        try {
            await fetchInstance(`/todos/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            setEditState(false);
            router.refresh();
            toast.success("Todo updated successfully");
        } catch (error) {
            toast.error("Error updating todo");
        }
        setLoading(false);
    };

    if (loading) return <BarLoader width={"100%"} color="#af7eea" />;

    if (editState) {
        return (
            <form className="flex gap-4" onSubmit={handleSubmit(handleEdit)}>
                <Input
                    className="border-primary border-2 grow"
                    register={register}
                    placeholder="New Title"
                    name="title"
                />
                <Button className="bg-red-600" type="button" onClick={() => setEditState(false)}>
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </form>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <input type="checkbox" onChange={handleCheckboxChange} className="mr-2" defaultChecked={completedState} />
            <p className={`text-xl mr-auto ${completedState && "line-through"}`}>{title}</p>
            <Edit
                className="text-cyan-700 cursor-pointer hover:scale-105 transition-all"
                onClick={() => setEditState(true)}
            />
            <Trash className="text-red-600 cursor-pointer hover:scale-105 transition-all" onClick={handleDeleteTodo} />
        </div>
    );
};
