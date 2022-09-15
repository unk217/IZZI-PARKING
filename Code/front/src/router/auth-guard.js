import { current_user } from "@/global";
const isAuthenticatedGuard = async (to, from, next) => {
  return new Promise(() => {
    if (current_user.level_user == "ADMIN") {
      return next();
    } else {
      next({ path: "/home" });
    }
  });
};
export default isAuthenticatedGuard;
