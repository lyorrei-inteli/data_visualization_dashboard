import React from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({title,subtitle}) => {
    return (
        <>
            {subtitle && <h2 className="text-xl font-medium mb-4">{subtitle}</h2>}
            <h1 className="text-4xl font-medium mb-10">{title}</h1>
        </>
    );
};
