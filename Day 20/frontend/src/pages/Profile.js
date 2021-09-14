import React, { useState, useContext, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";

import EditBio from "../component/EditBio";

function Profile() {
  const [showEditBio, setShowEditBio] = useState(false);

  const authData = useContext(AuthContext);

  const formateDate = str => {
    const date = dayjs(str);
    return date.format("h:m A DD MMM YY");
  };

  useEffect(() => {
    console.log(authData);
  }, []);

  return (
    <>
      <EditBio
        bio={authData.userProfile.bio}
        show={showEditBio}
        handleClose={() => setShowEditBio(false)}
        isLoading={authData.isBioLoading}
        errorMessage={authData.bioErrorMessage}
        onSubmit={authData.changeBio}
      />
      <Card className="mb-4 mt-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            My Profile
          </Card.Title>
        </Card.Body>
        <div className="p-4 pt-0">
          <ListGroup>
            <ListGroup.Item>
              <span className="text-muted">Name:</span>{" "}
              {authData.userProfile.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text-muted">Email:</span>{" "}
              {authData.userProfile.email}
            </ListGroup.Item>
            {authData.userProfile.createdAt && (
              <ListGroup.Item>
                <span className="text-muted">CreatedAt:</span>{" "}
                {formateDate(authData.userProfile.createdAt)}
              </ListGroup.Item>
            )}
            <ListGroup.Item style={{ whiteSpace: "pre-line" }}>
              <span className="text-muted">Bio:</span>{" "}
              {authData.userProfile.bio}
            </ListGroup.Item>
          </ListGroup>

          <Button
            onClick={() => setShowEditBio(true)}
            variant="primary"
            className="mt-2"
          >
            Edit Bio
          </Button>
        </div>
      </Card>
    </>
  );
}

export default Profile;
