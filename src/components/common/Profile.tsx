"use client";

import { useSession } from "next-auth/react";

export const Profile = () => {
    const session = useSession();

    if (session.data?.user) {
        return <div>From client: User is signed in!</div>;
    }

    return <div>From client: User is NOT signed in!</div>;
};
