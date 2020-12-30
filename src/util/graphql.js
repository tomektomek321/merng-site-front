import gql from 'graphql-tag';


export  const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id body createdAt username likeCount commentCount

            likes {
                username
            }



            comments {
                id username createdAt body

                likes {
                    username
                }
            }

        }
    }

`;


/*
export  const FETCH_USER_POSTS_QUERY = gql`
    query($userName: String!) {
        getPostsOfUser(userName: $userName) {
            id body createdAt username likeCount commentCount
        }
    }
`;*/

export  const FETCH_MY_POSTS_QUERY = gql`
    query {
        getMyPosts {
            id body createdAt username likeCount commentCount
        }
    }

`;


export const FETCH_USER_POSTS_QUERY = gql`

    query($userId: ID!) {
        getPostsOfUser(userId: $userId) {
            id
            body
        }
    }

`;


/*
            likes {
                username
            }



            comments {
                id username createdAt body

                likes {
                    username
                }
            }
            */