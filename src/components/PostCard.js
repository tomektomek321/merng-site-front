import React from 'react'
import { Button, Card,/* Icon, Label,*/ Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';


export default function PostCard(props) {
    const {body, createdAt, id, username, likeCount, commentCount = 0} = props.post;

    function likePost() {}
    function commentOnPost() {}

    return (
        <Card fluid>
            <Card.Content>

                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />

                <Card.Header>{username}</Card.Header>

                <Card.Meta as={Link} to={`/posts/${id}`} >{moment(createdAt).fromNow(true)}</Card.Meta>

                <Card.Description>
                    {body}
                </Card.Description>

            </Card.Content>

            <Card.Content extra>

                <Button basic onClick={likePost}
                    color='teal'
                    content='Like'
                    icon='heart'
                    label={{ basic: true, color: 'teal', pointing: 'left', content: likeCount }}
                />

                <Button basic onClick={commentOnPost}
                    color='blue'
                    content='Like'
                    icon='comments'
                    label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
                />
            </Card.Content>
    </Card>
    )
}
