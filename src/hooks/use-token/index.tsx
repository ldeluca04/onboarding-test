import React from "react";
import { useMsal } from "@azure/msal-react";
import { AuthenticationResult, InteractionRequiredAuthError } from "@azure/msal-browser";

import { loginRequest } from "../../authConfig";

type OnSuccessFunction = (_params: AuthenticationResult) => void;
interface IUseTokenArgs {
  /** The key with which the token will be stored in the localStorage */
  key?: string;
  /** The type of login when require interaction */
  onInteractionRequired?: "loginRedirect" | "loginPopup";

  /** Function that call when sso is successfull, receives all response from instance.ssoSilent */
  onSuccess?: OnSuccessFunction;
}

const defaultSuccess: OnSuccessFunction = ({ idToken }) => {
  localStorage.setItem("token", idToken);
};
/**
 * Hook to get token and resolve simil SSO
 */
const useToken = ({
  onInteractionRequired = "loginRedirect",
  onSuccess = defaultSuccess,
}: IUseTokenArgs) => {
  const { accounts, instance } = useMsal();

  React.useEffect(() => {
    if (instance) {
      (async function () {
        try {
          const result = await instance.ssoSilent({ account: accounts?.[0] });

          onSuccess?.(result);
        } catch (err) {
          if (err instanceof InteractionRequiredAuthError) {
            instance[onInteractionRequired](loginRequest);
          }
        }
      })();
    }
  }, [instance, accounts, onInteractionRequired, onSuccess]);

  return null;
};

export default useToken;
