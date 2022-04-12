import {GraphQLClient, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function handle(req, res) {
    const {name, email, slug, comment} = req.body;
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });

    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            CreateComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}
        }
    `;

    const result = await graphQLClient.request(query, {
        name, email, slug, comment
    });

    return res.status(200).send(result);
}