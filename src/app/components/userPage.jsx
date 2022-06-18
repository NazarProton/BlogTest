import React from "react";
import PropTypes from "prop-types";
import BackHistoryButton from "../components/backButton";
// import UserCard from "../../ui/userCard";
// import QualitiesCard from "../../ui/qualitiesCard";
// import MeetingCard from "../../ui/meetingsCard";
// import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getUserById } from "../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    if (user) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                {/* <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div> */}
            </div>
        );
    } else {
        return (
            <h3 className=" d-flex justify-content-center">
                Загрузка данних о пользователе...
            </h3>
        );
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
