import { paths } from "@/helpers/paths";
import { redirect } from "next/navigation";
import PostList from "@/components/posts/PostList";

import { fetchPostBySearchTerm } from "@/db/queries/posts";

interface SearchPageProps {
    searchParams: {
        term: string;
    };
}

export default function SeachPage({ searchParams }: SearchPageProps) {
    const { term } = searchParams;

    if (!term) {
        redirect(paths.home());
    }

    return (
        <div>
            <PostList fetchData={() => fetchPostBySearchTerm(term)} />
        </div>
    );
}
