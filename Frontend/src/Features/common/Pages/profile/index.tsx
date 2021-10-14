import React from "react";
import "./style.scss";

interface ProfileProps {}

export const Profile = (props: ProfileProps) => {
    const thumbnail = "https://cdn.fakercloud.com/avatars/oktayelipek_128.jpg";
    return (
        <div className="profile">
            <div className="container">
                <div className="profile-header">
                    <div className="profile-header-avatar">
                        <img src={thumbnail} alt="" />
                    </div>
                    <div className="profile-header-nav">
                        <h2>Tamhuynh2605</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
