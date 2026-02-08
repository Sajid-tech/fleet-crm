import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import BASE_URL from "@/config/base-url";
import Cookies from "js-cookie";

import ProfileSetting from "@/components/settings/profile-setting";

const Settings = () => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const user = profileData?.profile;

  const [editProfile, setEditProfile] = useState({
    mobile: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    username: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    if (user) {
      setEditProfile({
        mobile: user.mobile || "",
        email: user.email || "",
      });
      setPasswordData(prev => ({
        ...prev,
        username: user.name || ""
      }));
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.put(`${BASE_URL}/api/panel-update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to update profile");
    },
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = {
      mobile: editProfile.mobile,
      email: editProfile.email,
    };
    updateProfileMutation.mutate(formData);
  };

  const changePasswordMutation = useMutation({
    mutationFn: async (passwordData) => {
      const response = await axios.post(
        `${BASE_URL}/api/panel-change-password`,
        {
          username: passwordData.username,
          old_password: passwordData.old_password,
          new_password: passwordData.new_password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.code === 201) {
        toast.success(data.message || "Password updated successfully!");
        setPasswordData(prev => ({
          ...prev,
          old_password: "",
          new_password: ""
        }));
      } else {
        toast.error(data.message || "Unexpected error occurred");
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Please enter valid old password");
    },
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwordData.old_password || !passwordData.new_password) {
      toast.error("Please fill in all password fields");
      return;
    }
    changePasswordMutation.mutate(passwordData);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-8">Loading...</div>;
  }

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <ProfileSetting
        user={user}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        handleProfileUpdate={handleProfileUpdate}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        handlePasswordChange={handlePasswordChange}
        updateProfileMutation={updateProfileMutation}
        changePasswordMutation={changePasswordMutation}
      />
    </div>
  );
};

export default Settings;