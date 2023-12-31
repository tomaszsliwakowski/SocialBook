type TimerType = {
  minutes: number;
  hours: number;
  days: number;
};

export const DOMAIN = "localhost";

export const getCookie = (name: string) => {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
};
export const deleteCookie = (name: string, path: string, domain: string) => {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

export const timeExpiredFrom = (createdAt: string) => {
  const createTime = parseInt(createdAt);
  const date = new Date();
  const expired = date.getTime() - createTime;
  let timer: TimerType = {
    minutes: Math.floor((expired / 1000 / 60) % 60),
    hours: Math.floor((expired / 1000 / 60 / 60) % 60),
    days: Math.floor(((expired / 1000 / 60 / 60) % 60) / 24),
  };
  if (timer.minutes < 1 && timer.hours === 0) return `now`;
  if (timer.minutes < 60 && timer.hours === 0)
    return `${timer.minutes} minutes ago`;
  if (timer.hours >= 1 && timer.hours < 24 && timer.days === 0)
    return `${timer.hours} hours ago`;
  if (timer.days > 0 && timer.days <= 7) return `${timer.days} days ago`;
  if (timer.days > 7) return `${new Date(createTime).toLocaleDateString()}`;
};

export const PopularTags: string[] = [
  "All",
  "Cars",
  "Sports",
  "Food",
  "Travel",
  "LifeStyle",
  "Fitness",
  "Fashion",
  "Buisness",
  "Animals",
];

export const TimeSpanList: string[] = [
  "All",
  "Last 365days",
  "Last 30days",
  "Last 7days",
  "Today",
];
export const sortOptionList: string[] = ["Latest", "Most popular"];
export const typeList: string[] = ["For you", "Watched"];
