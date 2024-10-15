import queryString from 'query-string';
import { Outlet } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const RouterLayout = () => {
  return (
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        searchStringToObject: queryString.parse,
        objectToSearchString: queryString.stringify,
      }}>
      <Outlet />
    </QueryParamProvider>
  );
};

export default RouterLayout;
