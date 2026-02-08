import React from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";

const ProfileSetting = ({
  user,
  editProfile,
  setEditProfile,
  handleProfileUpdate,
  passwordData,
  setPasswordData,
  handlePasswordChange,
  updateProfileMutation,
  changePasswordMutation,
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
      <div className="lg:col-span-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm">
        <div className="mb-2 pb-2 border-b border-gray-100 dark:border-gray-600">
          <h2 className="text-md font-medium text-gray-900 dark:text-white">Profile Information</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Your personal details</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
              <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-medium text-sm truncate">{user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-sm truncate">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500">Mobile</p>
                <p className="font-medium text-sm">{user?.mobile || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</p>
            <div className="flex gap-2 flex-wrap">
              {["default", "yellow", "green", "purple", "teal", "gray"].map((color) => {
                const colorsMap = {
                  default: "bg-blue-600",
                  yellow: "bg-yellow-500",
                  green: "bg-green-600",
                  purple: "bg-purple-600",
                  teal: "bg-teal-600",
                  gray: "bg-gray-600",
                };
                const isActive = theme === color;
                return (
                  <button
                    key={color}
                    onClick={() => setTheme(color)}
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200
                      ${colorsMap[color]} 
                      ${isActive ? "shadow-md ring-1 ring-offset-1 ring-blue-400 scale-110" : "opacity-80 hover:opacity-100"}`}
                  >
                    {isActive && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-3">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm">
          <div className="mb-2 pb-2 border-b border-gray-100 dark:border-gray-600">
            <h2 className="text-md font-medium text-gray-900 dark:text-white">Edit Profile</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Update your personal information</p>
          </div>
          
          <form onSubmit={handleProfileUpdate} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="mobile" className="text-sm">Mobile Number</Label>
                <Input
                  id="mobile"
                  value={editProfile.mobile}
                  onChange={(e) =>
                    setEditProfile((prev) => ({ ...prev, mobile: e.target.value }))
                  }
                  placeholder="Enter your mobile number"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={editProfile.email}
                  onChange={(e) =>
                    setEditProfile((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email address"
                  className="h-9 text-sm"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={updateProfileMutation.isLoading} 
              className="h-9 text-sm px-4 mt-2"
            >
              {updateProfileMutation.isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm">
          <div className="mb-2 pb-2 border-b border-gray-100 dark:border-gray-600">
            <h2 className="text-md font-medium text-gray-900 dark:text-white">Change Password</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Update your password securely</p>
          </div>
          
          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="old_password" className="text-sm">Old Password</Label>
                <Input
                  id="old_password"
                  type="password"
                  value={passwordData.old_password}
                  onChange={(e) =>
                    setPasswordData((prev) => ({ ...prev, old_password: e.target.value }))
                  }
                  placeholder="Old password"
                  required
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new_password" className="text-sm">New Password</Label>
                <Input
                  id="new_password"
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) =>
                    setPasswordData((prev) => ({ ...prev, new_password: e.target.value }))
                  }
                  placeholder="New password"
                  required
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username" className="text-sm">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={passwordData.username}
                  readOnly
                  className="h-9 text-sm bg-gray-50"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={changePasswordMutation.isLoading}
              className="h-9 text-sm px-4"
            >
              {changePasswordMutation.isLoading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;