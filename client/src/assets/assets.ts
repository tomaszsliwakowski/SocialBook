import { FollowerObjectType } from "../context/Auth";

type TimerType = {
  minutes: number;
  hours: number;
  days: number;
};

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
  const difference: number = date.getTime() - createTime;
  let timer: TimerType = {
    minutes: Math.floor((difference / 1000 / 60) % 60),
    hours: Math.floor((difference / 1000 / 60 / 60) % 60),
    days: Math.floor(difference / 1000 / 60 / 60 / 24),
  };
  if (timer.minutes < 1 && timer.hours === 0) return `now`;
  if (timer.minutes < 60 && timer.hours === 0)
    return `${timer.minutes} minutes ago`;
  if (timer.hours >= 1 && timer.hours < 24 && timer.days === 0)
    return `${timer.hours} hours ago`;
  if (timer.days > 0 && timer.days <= 7) return `${timer.days} days ago`;
  if (timer.days > 7) return `${new Date(createTime).toLocaleDateString()}`;
};

export const idGenerator = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function followCheck(
  followers: FollowerObjectType[],
  Id: string
): boolean {
  const check = followers.filter((item) => item.followers_id === Id);
  return check.length > 0;
}

export const handleAddFollow = async (
  follow: Function,
  refetchUser: Function
) => {
  await follow()
    .then(() => {
      refetchUser();
    })
    .catch((res: Error) => console.log(res));
};
export const handleDeleteFollow = async (
  unFollow: Function,
  refetchUser: Function
) => {
  await unFollow()
    .then(() => {
      refetchUser();
    })
    .catch((res: Error) => console.log(res));
};
