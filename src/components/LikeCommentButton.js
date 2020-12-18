import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

function LikeCommentButton({ user, postId, commentData }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && commentData[1]) {
      const x = commentData[1].find((like) => like.username === user.username)
      if(x) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } else {
      setLiked(false);
    }

  }, [user, commentData, liked, commentData.length]);

  const [likeComment] = useMutation(LIKE_COMMENT_MUTATION, {

    update(proxy, result) {
      setLiked(!liked);
    },
    variables: { postId: postId, commentId: commentData[0] }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likeComment}>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
      <Label basic color="teal" pointing="left">
        {commentData[1].length}
      </Label>
    </Button>
  );
}

const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($postId: ID!, $commentId: ID!) {
    likeComment(postId: $postId, commentId: $commentId) {
      id
      username
      body
      likes {
        id
        username
      }
    }
  }
`;

export default LikeCommentButton;