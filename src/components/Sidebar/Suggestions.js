import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import Skeleton from "react-loading-skeleton ";
import { getSuggestedProfiles } from "../../services/Firebase";
import SuggestedProfile from "./SuggestedProfile";

const Suggestions = ({ userId, following, loggedInUserId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfile = async () => {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
      console.log("res", response);
      //   console.log(profiles);
    };
    if (userId) {
      suggestedProfile();
    }
    // suggestedProfile();
  }, [userId, following]);

  return !profiles ? (
    // <Skeleton count={2} height={150} className="mt-5" />
    <p>loading ...</p>
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2 ">
        <p className="font-bold text-gray-base">Suggestion for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserId: PropTypes.string,
};
export default Suggestions;