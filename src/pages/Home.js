
import React, { useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import { useQuery } from '@apollo/react-hooks'
import PostForm from '../components/PostForm';

import { AuthContext } from '../context/auth';

export default function Home() {

    const {user} = useContext(AuthContext);

    const {
        loading = true,
        data = {}
      }  = useQuery(FETCH_POSTS_QUERY);

    //if(data) {
        console.log(data);
    //}


    return (
        <Grid columns={2} >
            <Grid.Row >
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}

                {loading ? (
                    <h1>loading posts..</h1>
                ) : (
                    <Transition.Group>
                        {data && data.getPosts.map(post => (
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
