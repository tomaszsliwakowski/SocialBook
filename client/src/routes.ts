export const HOME_ROUTE = "/";
export const BLOGS_PAGE_ROUTE = "/blogs";
export const POSTS_PAGE_ROUTE = "/posts";
export const AUTH_PAGE_ROUTE = "/auth/:action";
export const BLOGS_ROUTE =
  "/blogs?sorting=Latest&tag=All&timespan=All&type=For+You";
export const LOGIN_ROUTE = "/auth/login";
export const REGISTER_ROUTE = "/auth/register";
export const PROFILE_ROUTE = "/profile";
export const POSTS_ROUTE = "/posts?nav=all";
export const SINGLE_BLOG_ROUTE = "/blog/:id";
export const BLOG_CREATOR_ROUTE = "/creator/blog";

//blog route builder
export function BlogRouteBuilder(id: string) {
  return `/blog/${id}`;
}

//blogs tag route

function blogsTagRouteBuilder(tag: string) {
  return `/blogs?sorting=Latest&tag=${tag}&timespan=All&type=For+You`;
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
