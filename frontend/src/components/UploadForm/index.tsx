"use client";
import { fetchInstance } from "@/config/fetch";
import { use, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Input } from "../Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { apiRoutes, routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";

const schema = yup.object({
    name: yup.string().required("Esse campo é obrigatório."),
});

export const UploadForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver<any>(schema),
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const onDrop = useCallback(
        (acceptedFiles) => {
            setUploadedFile(acceptedFiles[0]);
        },
        [setUploadedFile]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "application/octet-stream": [".parquet"],
        },
        multiple: false,
    });

    const onSubmit = async (data) => {
        if (!uploadedFile) return toast.error("Por favor, faça upload de um arquivo .parquet antes de enviar.");
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("file", uploadedFile);

        try {
            await fetchInstance(apiRoutes.flight.create, {
                method: "POST",
                body: formData,
            });

            toast.success("Arquivo enviado com sucesso!");
            router.push(routes.flight.base);
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return <ClockLoader color="#00a0e6" />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[60%]">
            <Input
                className="w-full border-2 rounded border-primary"
                errors={errors}
                label="Nome"
                type="text"
                placeholder="Nome identificador da predição"
                name="name"
                register={register}
            />
            <div {...getRootProps()} className="min-x-[80%] p-20 border-dashed border-2 border-gray-400 cursor-pointer">
                <input {...getInputProps()} {...register("file")} />
                {uploadedFile
                    ? uploadedFile.name
                    : "Arraste e solte um arquivo .parquet aqui, ou clique para selecionar um."}
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};
