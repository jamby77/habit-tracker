import React, { useRef, useState } from "react";
import { Button, WarningButton } from "~c/form";
import { AppUser, CloudinaryPic } from "~l/auth";
import UploadIcon from "~s/uploadIcon";

const cloudinaryUser = process.env.NEXT_PUBLIC_CLOUDINARY_USER;
const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PROFILE_PRESET;
const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${cloudinaryUser}/image/upload`;

const ProfilePictureWidget = ({
  user,
  handlePicChange,
}: {
  user: AppUser;
  handlePicChange: (pic: CloudinaryPic) => void;
}) => {
  const [pic, setPic] = useState(user?.profilePic?.secure_url || "");
  const imgRef = useRef<HTMLInputElement>();
  const handleImageUpload = async () => {
    const { files } = imgRef.current;
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", cloudinaryPreset);
    const options = {
      body: formData,
      method: "POST",
    };

    try {
      // upload image to cloudinary,
      const response = await fetch(cloudinaryEndpoint, options).then((res) =>
        res.json()
      );

      // set it as sub-object of the user,
      handlePicChange(response as CloudinaryPic);
      // display it, by using setPic
      setPic(response.secure_url);
    } catch (e) {
      console.info(e);
    }
  };
  const handleImageChange = () => {
    const { files } = imgRef.current;
    if (files[0] && window) {
      const s = window.URL.createObjectURL(files[0]);
      setPic(s);
    }
  };
  return (
    <div className="flex flex-row">
      <div className="flex-none w-44 flex justify-center items-center">
        <img
          alt={user.firstName}
          className="rounded-full object-cover w-40 h-40 border-8 border-indigo-600"
          src={pic || `https://unavatar.now.sh/${user.email}`}
        />
      </div>
      <div className="flex-auto flex flex-col justify-between items-center ">
        <div className="relative overflow-hidden w-60">
          <Button type="button">
            <span className="ml-2">Select a picture</span>
          </Button>
          <input
            className="cursor-pointer absolute block opacity-0 top-0 left-0 w-full h-full"
            ref={imgRef}
            type="file"
            name="profile_pic"
            id="profile_pic"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-60">
          <WarningButton
            type="button"
            onClick={handleImageUpload}
            className="inline-flex items-center justify-center"
          >
            <UploadIcon className="w-4 h-4" />
            Change profile picture
          </WarningButton>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureWidget;
