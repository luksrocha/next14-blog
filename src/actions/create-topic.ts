"use server";

import { z } from "zod";
import type { Topic } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/helpers/paths";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/[a-z-]/, {
            message: "Must be lower case letters or dashes without spaces",
        }),

    description: z.string().min(10),
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const results = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    if (!results.success) {
        return {
            errors: results.error.flatten().fieldErrors,
        };
    }

    const session = await auth();

    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must be signed in to do this"],
            },
        };
    }

    let topic: Topic;

    try {
        topic = await db.topic.create({
            data: {
                slug: results.data.name,
                description: results.data.description,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        }

        return {
            errors: {
                _form: ["Something went wrong"],
            },
        };
    }

    revalidatePath(paths.home());
    // REDIRECT NEEDS TO BE OUT OF THE TRYCATCH BECAUSE IT REDIRECTS THROWING AN ERROR, SO IF ITS INSIDE THE TRY, I'LL NOT REDIRECT AT ALL
    // AND IT'LL ENTER AT THE CATCH, CAUSING UNEXPECTED BEHAVIOR
    redirect(paths.topicShow(topic.slug));
}
