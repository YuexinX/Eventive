import type { NavigateProps} from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";

interface RedirectProps extends Omit<NavigateProps, "to"> {
  keepSearchParams?: boolean;
  pathname: string;
}

const Redirect: React.FC<RedirectProps> = ({
  keepSearchParams = false,
  pathname,
  ...props
}) => {
  const { search } = useLocation();

  return (
    <Navigate
      {...props}
      replace
      to={{
        pathname,
        search: keepSearchParams ? search : undefined,
      }}
    />
  );
};

export default Redirect;
