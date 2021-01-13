import React, { useContext } from 'react'

import { FETCH_USER_POSTS_QUERY, FETCH_USER_COMMENTED_POSTS_QUERY,
    FETCH_USER_LIKED_POSTS_QUERY } from '../util/graphql'

import { CardContent, Grid } from 'semantic-ui-react'
//import PostCard from '../components/PostCard'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import { Card, Image } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

import './profile.css';

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


    const resp3 = useQuery(FETCH_USER_COMMENTED_POSTS_QUERY, {
        variables: {
            userId: userId33
        }
    });
    console.log(resp3);


    let wid;
    if(window.innerWidth < 700) {
        wid = 1;
    } else {
        wid = 2;
    }

    return (
        <Grid columns={wid} >

                <h3 className="ui attached center segment topheadek">
                    Top Attached
                </h3>

            <div className="ui attached segment">
                <p>
                    lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem
                    lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem
                    lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem
                    lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem loerm lorem
                </p>
            </div>

            <h2 className="ui center aligned icon header">
                <i className="circular users icon"></i>
                Friends
            </h2>


            {/* <Grid.Row>
            <div class="ui piled segment">
                <h2 class="ui header">
                    <img alt="nic" src="https://react.semantic-ui.com/images/avatar/large/molly.png" class="ui circular image" />
                    Patrick
                </h2>
            </div>
            </Grid.Row> */}
            <Grid.Row>
                <div className="ui card cardik">
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
            <Grid.Row columns={wid} className="myPostsWrapper" >
                {resp.loading ? (
                    <h1>loading your posts..</h1>
                ) : (
                    <>
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
                        <Grid.Column column={8} key={post.id} >
                            <Card fluid>
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
                    </>
                )}
            </Grid.Row>
            <Grid.Row className="myLikedPostsWrapper">
                {resp2.loading ? (
                    <h1>loading Liked posts..</h1>
                ) : (
                    <>
                        <Grid.Column className="sixteen wide">
                            <h2 className="ui header">
                                <img alt="nic" src="https://semantic-ui.com/images/icons/plugin.png" />
                                <div className="content">
                                    Polubione posty
                                    <div className="sub header">
                                    {resp2.data && resp2.data.getLikedPostsOfUser.length} Post(s)
                                    </div>
                                </div>
                            </h2>
                        </Grid.Column>


                        {resp2.data && resp2.data.getLikedPostsOfUser.map(post => (

                            <Grid.Column key={post.id} >
                                <PostCard fluid post={post} />
                            </Grid.Column>
                        ))}
                    </>
                )}
            </Grid.Row>
            <Grid.Row >
                {resp3.loading ? (
                    <h1>loading Commented posts..</h1>
                ) : (
                    <div>
                        <h2 className="ui header">
                            <img alt="nic" src="https://semantic-ui.com/images/icons/plugin.png" />
                            <div className="content">
                                Komentowane posty
                                <div className="sub header">
                                {resp3.data && resp3.data.getCommentedPostsOfUser.length} Post(s)
                                </div>
                            </div>
                        </h2>

                        {resp3.data && resp3.data.getCommentedPostsOfUser.map(post => (

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
