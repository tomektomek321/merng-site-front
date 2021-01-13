
import React, { useContext, useState } from 'react';
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import { useQuery } from '@apollo/react-hooks'
import PostForm from '../components/PostForm';

import { AuthContext } from '../context/auth';


/*
* Email integration (forgot password, confirm account)
* Profile View (user's can click on each others profiles and maybe "follow" them)
* Profile Edits (users can upload information about themselves: email, website, "about me", etc.)
* Edit posts (users can delete their post, but not edit them. Add an "edit" feature.)
* File uploads (allow users to upload images, maybe videos, etc.)
* Change the styling, make it your own */
export default function Home() {

    const {user} = useContext(AuthContext);

    const [testProp, setTestProp] = useState(1);

    const resp = useQuery(FETCH_POSTS_QUERY);
    console.log(resp);




    console.log(window.innerWidth);
    let col;
    if(window.innerWidth < 600) {
        col = 1;
    } else {
        col = 2;
    }

    return (
        <Grid columns={col} >
            <Grid.Row >
                {user && (
                    <Grid.Column>
                        <PostForm ttestProp={setTestProp} ttestPropValue={testProp} />
                    </Grid.Column>
                )}

                {resp.loading ? (
                    <h1>loading posts..</h1>
                ) : (
                    <Transition.Group>
                        {resp.data && resp.data.getPosts.map(post => (
                            <Grid.Column key={post.id} >
                                <PostCard post={post} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}

            </Grid.Row>
        </Grid>
    )
}
