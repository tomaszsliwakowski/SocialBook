export const HOME_ROUTE = "/SocialBook/";
export const BLOGS_PAGE_ROUTE = "/SocialBook/blogs";
export const POSTS_PAGE_ROUTE = "/SocialBook/posts";
export const AUTH_PAGE_ROUTE = "/SocialBook/auth/:action";
export const BLOGS_ROUTE =
  "/SocialBook/blogs?sorting=Latest&tag=All&timespan=All&type=For+You&pageMin=0&pageMax=9";
export const LOGIN_ROUTE = "/SocialBook/auth/login";
export const REGISTER_ROUTE = "/SocialBook/auth/register";
export const PROFILE_ROUTE = "/SocialBook/profile";
export const POSTS_ROUTE = "/SocialBook/posts?nav=all";
export const SINGLE_BLOG_ROUTE = "/SocialBook/blog/:id";
export const BLOG_CREATOR_ROUTE = "/SocialBook/creator/blog";

//blog route builder
export function BlogRouteBuilder(id: string) {
  return `/SocialBook/blog/${id}`;
}

//blogs tag route

function blogsTagRouteBuilder(tag: string) {
  return `/SocialBook/blogs?sorting=Latest&tag=${tag}&timespan=All&type=For+You&pageMin=0&pageMax=9`;
}

export const FoodTagRoute = blogsTagRouteBuilder("Food");
export const TravelTagRoute = blogsTagRouteBuilder("Travel");
export const LifeStyleTagRoute = blogsTagRouteBuilder("LifeStyle");
export const FashionTagRoute = blogsTagRouteBuilder("Fashion");
export const BuisnessTagRoute = blogsTagRouteBuilder("Buisness");
export const SportsTagRoute = blogsTagRouteBuilder("Sports");
export const CarsTagRoute = blogsTagRouteBuilder("Cars");
export const FitnessTagRoute = blogsTagRouteBuilder("Fitness");
export const AnimalsTagRoute = blogsTagRouteBuilder("Animals");
