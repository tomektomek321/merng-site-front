import React, { useContext } from 'react'

import { FETCH_USER_POSTS_QUERY, FETCH_MY_POSTS_QUERY } from '../util/graphql'

import { CardContent, Grid } from 'semantic-ui-react'
//import PostCard from '../components/PostCard'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
export default function Profile() {

    const pathname = window.location.pathname;
    console.log(pathname);
    const userId33 = pathname.substr(9);
    console.log(userId33);

    const {user} = useContext(AuthContext);
    let quer;

    const resp = useQuery(FETCH_USER_POSTS_QUERY, {
        variables: {
            userId: userId33
        }
    });

    return (
        <Grid columns={2} >
            <Grid.Row >
                {resp.loading ? (
                    <h1>loading posts..</h1>
                ) : (
                    resp.data && resp.data.getPostsOfUser.map(post => (
                        <Grid.Column key={post.id} >
                            <Card fluid >
                                <Card.Content stackable="true">
                                <Image
                                    floated='right'
                                    size='mini'
                                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                />

                                <Card.Header>{post.username}</Card.Header>

                                <Card.Description>
                                    {post.body}
                                </Card.Description>

                                </Card.Content>
                                <CardContent extra>
                                    {user && user.username === post.username && <DeleteButton postId={post.id} />}
                                </CardContent>

                            </Card>
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}
