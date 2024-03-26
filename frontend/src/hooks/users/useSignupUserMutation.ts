import { useMutation } from "react-query";
import { UserServiceAPI } from "../../services/user-services";

export const useSignupUserMutation = (onSuccess?: any, onError?: any) => {
  return useMutation("signup-user", UserServiceAPI.signup, {
    onSuccess: onSuccess,
    onError: onError,
  });
};
