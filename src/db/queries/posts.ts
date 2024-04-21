import type { Post } from "@prisma/client";
import { db } from "..";

export type PostWithDetails = Awaited<
    ReturnType<typeof fetchPostByTopicSlug>
>[number];

export function fetchPostBySearchTerm(
    term: string
): Promise<PostWithDetails[]> {
    return db.post.findMany({
        where: {
            OR: [
                { title: { contains: term } },
                { content: { contains: term } },
            ],
        },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
}

export function fetchPostByTopicSlug(slug: string) {
    return db.post.findMany({
        where: {
            topic: {
                slug,
            },
        },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
}

export function fetchTopPosts(): Promise<PostWithDetails[]> {
    return db.post.findMany({
        orderBy: [
            {
                comments: {
                    _count: "desc",
                },
            },
        ],
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } },
        },
        take: 5,
    });
}
