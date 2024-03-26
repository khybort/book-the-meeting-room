import { useMutation } from "react-query";
import { UserServiceAPI } from "../../services/user-services";

export const useDeleteUserMutation = (onSuccess?: any, onError?: any) => {
  return useMutation("delete-user", UserServiceAPI.deleteUser, {
    onSuccess: onSuccess,
    onError: onError
  });
};
