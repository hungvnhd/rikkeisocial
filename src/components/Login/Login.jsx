import React from "react";
import { Row, Col, Button, Typography } from "antd";
import firebase, { auth } from "../firebase/config";
import { addDocument, generateKeywords } from "../firebase/services";

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleFbLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    console.log(user);
    if (additionalUserInfo.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName.toLowerCase()),
        friends: [user.uid],
      });
    }
  };
  const handleGgLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(
      googleProvider
    );
    if (additionalUserInfo.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName.toLowerCase()),
        friends: [user.uid],
      });
    }
  };

  return (
    <div>
      <Row justify='center'>
        <Col span={8}>
          <Title>Rikkei</Title>
          <Button onClick={handleGgLogin}>dang nhap google</Button>
          <Button onClick={handleFbLogin}>dang nhap facebook</Button>
        </Col>
      </Row>
    </div>
  );
}
