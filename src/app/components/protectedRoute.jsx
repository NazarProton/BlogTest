import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/users";

const ProtectedRoute = ({ children }) => {
    let navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login", {
                replace: true,
                state: location.pathname
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
