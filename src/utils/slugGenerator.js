const slugify = require('slugify');

const generateSlug = (text, id = null) => {
    const slug = slugify(text, { lower: true, strict: true, locale: 'vi' });
    return id ? `${slug}-${id}` : `${slug}-${Date.now()}`;
};

module.exports = { generateSlug };
