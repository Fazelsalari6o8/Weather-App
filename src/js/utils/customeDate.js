"use strict";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDate = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};
// در بالا برای گرفتن روز هفته، ما تایمی که از سایت گرفتیم رو * در 1000 کردیم تا روزهای هفته به درستی نشون داده بشن، چون خودش تایمی که نشون میداد خیلی کوتاه بود و زمان رو اشتباه نشون میداد

export { getDate };
