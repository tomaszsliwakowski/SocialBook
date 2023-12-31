export const HOME_ROUTE = "/";
export const BLOGS_ROUTE =
  "/blogs?sorting=Latest&tag=All&timespan=All&type=For+you";
export const CHATS_ROUTE = "/chats";
export const LOGIN_ROUTE = "/auth/login";
export const REGISTER_ROUTE = "/auth/register";
export const PROFILE_ROUTE = "/profile";
export const POSTS_ROUTE = "/posts?nav=all";

//blogs tag route

function blogsTagRouteBuilder(tag: string) {
  return `/blogs?sorting=Latest&tag=${tag}&timespan=All&type=For+you`;
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
