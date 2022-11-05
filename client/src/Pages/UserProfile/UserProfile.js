import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import moment from "moment";
import Avatar from "../../Components/Avatar/Avatar";
import "./UsersProfile.css";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import axios from "axios";

const API_endpoint = `https://api.bigdatacloud.net/data/reverse-geocode-client?`;

function UserProfile() {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);

  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  const [responseData, setResponseData] = React.useState("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((positon) => {
      console.log(positon.coords);
      setLatitude(positon.coords.latitude);
      setLongitude(positon.coords.longitude);
    });

    let finalAPIEndPoint = `${API_endpoint}&latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    axios.get(finalAPIEndPoint).then((response) => {
      setResponseData(response.data);
    });
  }, [latitude, longitude]);

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id &&
              ((
                <p className="location">
                  {responseData.locality +
                    "," +
                    " " +
                    responseData.principalSubdivision +
                    "," +
                    " " +
                    responseData.countryName}
                </p>
              ),
              (
                <button
                  type="button"
                  onClick={() => setSwitch(true)}
                  className="edit-profile-btn"
                >
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </button>
              ))}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
