import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image } from 'semantic-ui-react'
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard'
import { FETCH_POSTS_QUERY } from '../util/graphql';



export default function Home() {

    const { user } = useContext(AuthContext);

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
                {loading ? (
                    <h1>loading posts..</h1>
                ) : (
                    data && data.getPosts.map(post => (
                        <Grid.Column key={post.id} >
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}

            </Grid.Row>
        </Grid>
    )
}
