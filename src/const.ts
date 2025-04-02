enum SHOW_DELETED  {
    TRUE = 'true',
    FALSE = 'false',
    ONLY_DELETED = 'onlyDeleted'
}

enum POST_STATUS {
    PUBLISHED = 'published_at',
    DRAFT = 'draft',
    ALL = 'all'
}


const constants = {
    SHOW_DELETED,
    POST_STATUS
}

export default constants
export { SHOW_DELETED, POST_STATUS }