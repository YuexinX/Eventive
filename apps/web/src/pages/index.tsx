import { useAuthContext } from 'src/contexts/AuthContext';

const IndexPage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user?.email}
      <h1>Index Page</h1>
      {/* <Button onClick={() => r.mutate()}>Update</Button> */}
    </div>
  );
};

export default IndexPage;
