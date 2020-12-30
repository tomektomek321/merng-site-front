import React, { useContext } from 'react'

import { FETCH_USER_POSTS_QUERY,
    FETCH_USER_LIKED_POSTS_QUERY, FETCH_MY_POSTS_QUERY } from '../util/graphql'

import { CardContent, Grid, GridColumn } from 'semantic-ui-react'
//import PostCard from '../components/PostCard'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
export default function Profile() {

    const pathname = window.location.pathname;
    //console.log(pathname);
    const userId33 = pathname.substr(9);


    const {user} = useContext(AuthContext);
    console.log(user);

    const resp = useQuery(FETCH_USER_POSTS_QUERY, {
        variables: {
            userId: userId33
        }
    });
    console.log(resp);


    const resp2 = useQuery(FETCH_USER_LIKED_POSTS_QUERY, {
        variables: {
            userId: userId33
        }
    });
    console.log(resp2);

    return (
        <Grid columns={2} >
            {/* <Grid.Row>
            <div class="ui piled segment">
                <h2 class="ui header">
                    <img alt="nic" src="https://react.semantic-ui.com/images/avatar/large/molly.png" class="ui circular image" />
                    Patrick
                </h2>
            </div>
            </Grid.Row> */}
            <Grid.Row>
                <div className="ui card">
                    <div className="image">
                        <img alt="nic" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                    </div>
                    <div className="content">
                        <a href="/" className="header">{user.username}</a>
                        <div className="meta">
                        <span className="date">Joined in 2013</span>
                        </div>
                        <div className="description">
                        Kristy is an art director living in New York.
                        </div>
                    </div>
                    <div className="extra content">
                        <a href="/">
                        <i className="user icon"></i>
                        {resp.data && resp.data.getPostsOfUser.length} Post(s)
                        </a>
                    </div>
                </div>
            </Grid.Row>
            <Grid.Row >
                {resp.loading ? (
                    <h1>loading your posts..</h1>
                ) : (
                    <div>
                        <h2 className="ui header">
                            <img alt="nic" src="https://semantic-ui.com/images/icons/plugin.png" />
                            <div className="content">
                                Twoje posty
                                <div className="sub header">
                                {resp.data && resp.data.getPostsOfUser.length} Post(s)
                                </div>
                            </div>
                        </h2>

                        {resp.data && resp.data.getPostsOfUser.map(post => (
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
                    ))}
                    </div>
                )}
            </Grid.Row>
            <Grid.Row >
                {resp2.loading ? (
                    <h1>loading Liked posts..</h1>
                ) : (
                    <div>
                        <h2 className="ui header">
                            <img alt="nic" src="https://semantic-ui.com/images/icons/plugin.png" />
                            <div className="content">
                                Polubione posty
                                <div className="sub header">
                                {resp2.data && resp2.data.getLikedPostsOfUser.length} Post(s)
                                </div>
                            </div>
                        </h2>

                        {resp2.data && resp2.data.getLikedPostsOfUser.map(post => (

                       <Grid.Column key={post.id} >
                           <PostCard post={post} />
                        </Grid.Column>
                    ))}
                    </div>
                )}
            </Grid.Row>
        </Grid>
    )
}
