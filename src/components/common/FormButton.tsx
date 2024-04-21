"use client";

import { Button } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: ReactNode;
}

const FormButton = ({ children }: FormButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" isLoading={pending}>
            {children}
        </Button>
    );
};

export { FormButton };
