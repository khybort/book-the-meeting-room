import { useMutation } from "react-query";
import { UserServiceAPI } from "../../services/user-services";

export const useUpdateCredsMutation = (onSuccess?: any, onError?: any) => {
  return useMutation("updatecreds", UserServiceAPI.updateCreds, {
    onSuccess: onSuccess,
    onError: onError,
  });
};
