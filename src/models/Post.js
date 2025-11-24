class Post {
    constructor(id, categoryId, title, content, slug, views, createdAt) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.content = content;
        this.slug = slug;
        this.views = views || 0;
        this.createdAt = createdAt;
    }
}

module.exports = Post;

