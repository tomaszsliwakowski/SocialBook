"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopularBlogs = exports.getBlogs = exports.getBlog = void 0;
const graphql_1 = require("graphql");
const blogType_1 = require("../types/blogType");
const mySqlConnect_1 = require("../../database/mySqlConnect");
//API ONE BLOG
exports.getBlog = {
    type: blogType_1.BlogType,
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mySqlConnect_1.pool.query(`SELECT * FROM blogs WHERE id = '${args.id}'`);
            return rows[0];
        });
    },
};
const MySqlGetBlogQuery = (args) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.type === "Watched") {
        return `SELECT * FROM blogs WHERE ${args.timeSpan !== "All"
            ? `(createdAt between now() - interval ${args.timeSpan} day and now() ) AND`
            : ""} (user_id IN (select followers_id from followers where user_id = '${args.userId}'))
    `;
    }
    else {
        if (args.timeSpan === "All") {
            return `SELECT * FROM blogs`;
        }
        else {
            return `SELECT * FROM blogs WHERE (createdAt between now() - interval ${args.timeSpan} day and now() )
      `;
        }
    }
});
function getStats(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryLikes = yield mySqlConnect_1.pool.query(`select count(*) as Likes from blogslikes where blog_id = '${item.id}'`);
        const queryCom = yield mySqlConnect_1.pool.query(`select count(*) as Comments from blogscomments where blog_id = '${item.id}'`);
        const queryUser = yield mySqlConnect_1.pool.query(`SELECT name from users WHERE id = '${item.user_id}'`);
        const likes = queryLikes[0][0] ? queryLikes[0][0].Likes : "0";
        const comments = queryCom[0][0] ? queryCom[0][0].Comments : "0";
        const userName = queryUser[0][0] ? queryUser[0][0].name : "";
        return Object.assign(Object.assign({}, item), { likes: likes, comments: comments, userName: userName });
    });
}
exports.getBlogs = {
    type: new graphql_1.GraphQLList(blogType_1.BlogsType),
    args: {
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        search: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        searchType: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        tag: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        timeSpan: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        pageMin: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        pageMax: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield MySqlGetBlogQuery(args);
            const blogsData = yield mySqlConnect_1.pool.query(query);
            let blogs = blogsData[0];
            if (!blogs)
                return;
            blogs = yield filterHandler(blogs, args);
            if (!blogs)
                return;
            const selectedBlogs = blogs.splice(args.pageMin, args.pageMax);
            const blogsAllData = selectedBlogs.map((item) => getStats(item)
                .then((res) => {
                return res;
            })
                .catch(() => {
                console.log("Get likes and commetnts fail");
                return item;
            }));
            return blogsAllData.reverse().slice(args.pageMin, args.pageMax);
        });
    },
};
const filterHandler = (blogs, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (blogs.length === 0)
        return null;
    return filterTag(blogs, args);
});
const filterTag = (blogs, args) => {
    if (args.tag === "All") {
        return filterSearch(blogs, args);
    }
    else {
        const blogsFilter = blogs.filter((item) => {
            const tags = JSON.parse(item.tags);
            const tagsToLowerCase = tags.map((item) => item.toLowerCase());
            return tagsToLowerCase.includes(args.tag.toLowerCase());
        });
        return filterSearch(blogsFilter, args);
    }
};
const filterSearch = (blogs, args) => {
    if (args.search === "")
        return blogs;
    if (args.searchType === "title") {
        return blogs.filter((item) => item.title.toLowerCase().includes(args.search.toLowerCase()));
    }
    else {
        return blogs.filter((item) => {
            const tags = JSON.parse(item.tags);
            const tagsToLowerCase = tags.map((item) => item.toLowerCase());
            return tagsToLowerCase.includes(args.search.toLowerCase());
        });
    }
};
//API POPULAR BLOGS
exports.getPopularBlogs = {
    type: new graphql_1.GraphQLList(blogType_1.BlogsType),
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogsData = yield mySqlConnect_1.pool.query(`SELECT * FROM blogs WHERE (createdAt between now() - interval 365 day and now() )`);
            let blogs = blogsData[0];
            if (!blogs)
                return;
            const blogsAllData = blogs.map((item) => getStats(item)
                .then((res) => {
                return res;
            })
                .catch(() => {
                console.log("Get likes and commetnts fail");
                return item;
            }));
            let blogsSelected = [];
            for (let index = 0; index < blogsAllData.length; index++) {
                const element = blogsAllData[index];
                yield element.then((res) => {
                    blogsSelected.push(res);
                });
            }
            return blogsSelected
                .sort(function (a, b) {
                return add(b.likes, b.comments) - add(a.likes, a.comments);
            })
                .slice(0, 9);
        });
    },
};
function add(a, b) {
    if (!a || !b)
        return 0;
    return parseInt(a) + parseInt(b);
}
