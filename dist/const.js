var SHOW_DELETED;
(function (SHOW_DELETED) {
    SHOW_DELETED["TRUE"] = "true";
    SHOW_DELETED["FALSE"] = "false";
    SHOW_DELETED["ONLY_DELETED"] = "onlyDeleted";
})(SHOW_DELETED || (SHOW_DELETED = {}));
var POST_STATUS;
(function (POST_STATUS) {
    POST_STATUS["PUBLISHED"] = "published_at";
    POST_STATUS["DRAFT"] = "draft";
    POST_STATUS["ALL"] = "all";
})(POST_STATUS || (POST_STATUS = {}));
const constants = {
    SHOW_DELETED,
    POST_STATUS
};
export default constants;
export { SHOW_DELETED, POST_STATUS };
