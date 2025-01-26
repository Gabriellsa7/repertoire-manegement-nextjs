import { ProfileHeader } from "./components/profile-header";
import ProfileSection from "./components/profile-section";

export const Profile = () => {
  return (
    <div className="bg-primary-bg h-screen">
      <ProfileHeader />
      <ProfileSection />
    </div>
  );
};

export default Profile;
