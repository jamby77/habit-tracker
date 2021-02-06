import React from "react";
import ProfilePictureWidget from "~c/auth/ProfilePictureWidget";
import { Icon, Input, Label } from "~c/form";
import Form from "~c/form/Form";
import {
  Container,
  FormContainer,
  FormGroup,
  FormRow,
  Heading1,
  Panel,
} from "~c/index";
import { useUser } from "~l/auth";
import { useTitle } from "~l/layout";

const Profile = () => {
  useTitle("Edit profile");
  const { user } = useUser();
  if (!user) {
    return null;
  }
  console.log(user);
  return (
    <Container>
      <Panel className="h-full">
        <Heading1 className="ml-4 mt-4">User profile</Heading1>
        <Form onSubmit={(form) => console.log(form)}>
          <FormContainer className="max-w-lg mx-auto">
            <FormRow>
              <FormGroup>
                <Label htmlFor="profile_pic">Profile Picture</Label>
                <ProfilePictureWidget user={user} />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label htmlFor="firstName">First name *</Label>
                <div className="flex">
                  <Icon
                    icon="mdi-account-outline"
                    className="w-10 z-10 pl-1 text-center text-purple-500"
                  />
                  <Input
                    placeholder="Your first name"
                    id="firstName"
                    name="firstName"
                    defaultValue={user.firstName}
                  />
                </div>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label htmlFor="lastName">Last name *</Label>
                <div className="flex">
                  <Icon
                    icon="mdi-account-outline"
                    className="w-10 z-10 pl-1 text-center text-purple-500"
                  />
                  <Input
                    placeholder="Your last name"
                    id="lastName"
                    name="lastName"
                    defaultValue={user.lastName}
                  />
                </div>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <div className="flex">
                  <Icon
                    icon="mdi-email-outline"
                    className="w-10 z-10 pl-1 text-center text-purple-500"
                  />
                  <Input
                    placeholder="Your email"
                    id="email"
                    name="email"
                    disabled={!!user.email}
                    defaultValue={user.email}
                    className="disabled:cursor-not-allowed"
                  />
                </div>
              </FormGroup>
            </FormRow>
          </FormContainer>
        </Form>
      </Panel>
    </Container>
  );
};

export default Profile;
