const DAYS = 1;
const HOURS_PER_DAY = 24;
const MIN_PER_HOUR = 60;
const SEC_PER_MIN = 60;
const MILISEC_PER_SEC = 1000;
const MILLISECONDS_PER_DAY =
  HOURS_PER_DAY * MIN_PER_HOUR * SEC_PER_MIN * MILISEC_PER_SEC;
export const COOKIES_LIFE = DAYS * MILLISECONDS_PER_DAY;
