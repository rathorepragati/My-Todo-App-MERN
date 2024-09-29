import { useNavigate, useParams, useLocation } from "react-router-dom";

// Create a custom `withRouter` HOC for class components
const withRouter = (Component) => {
  function Wrapper(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    return (
      <Component
        {...props}
        navigate={navigate}
        params={params}
        location={location}
      />
    );
  }

  return Wrapper;
};

export default withRouter;
