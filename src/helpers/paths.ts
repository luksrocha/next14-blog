const paths = {
    home() {
        return "/";
    },
    topicShow(topicSlug: string) {
        return `/topics/${topicSlug}`;
    },
    postCreate(topicSlug: string) {
        return `/topics/${topicSlug}/posts/new`;
    },
    postShow(topicSLug: string, postId: string) {
        return `/topics/${topicSLug}/posts/${postId}`;
    },
};

export { paths };
