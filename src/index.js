//import {GraphQLServer} from 'graphql-yoga'
import '@babel/polyfill'
import GraphQL from 'graphql-yoga';
const GraphQLServer = GraphQL.GraphQLServer;



//import {GraphQLServer} from 'graphql-yoga'

//Demo Data

const users = [{
    id: '1',
    name: 'Ritesh',
    email: 'daydreamingguy941@gmail.com',
    age: 18
},{
    id: '2',
    name: 'Param Sid',
    email: 'param123@gmail.com',
    age: 10
},{
    id: '3',
    name: 'Manvendra',
    email: "manvendra234@gmail.com",
    age: 34

},{
    id: '4',
    name: 'Ankita',
    email: 'ankita234@gmail.com',
    age: 20
},{
    id: '5',
    name: 'Sushant',
    email: 'sushant123@gmail.com',
    age: 18

}

]

const posts = [{
    id: '1',
    title: "GraphQL Tutorial",
    body: "Welcome to gql tutorial,lets learn the differences between REST Api and GraphQL",
    published: true,
    author: "1"
   

},{
    id: '2',
    title: "Prometheus Tutorials",
    body: "Welcome to Monitoring,Learn Prometheus and Gafana using Docker",
    published: false,
    author: "2"
},{
    id: '3',
    title: "Docker and Kubernetes",
    body: "Learning Docker Virtulization and Container Ochestration Tool using Kubernetes and AWS EKS",
    published: true,
    author: "3"
},{
    id: '4',
    title: 'Automation Using Ansible and Terraform',
    body: 'Automating the process using ansible and making container deployment easier',
    published: false,
    author: '4'
},{
    id: '5',
    title: 'Web Dev using React.js',
    body: 'Web development using React and using Redux hooks and REST Api',
    published: true,
    author: '5'
}

]

//Type Def {schema}
const typeDefs = `

type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int

}

`
//Resolvers
const resolvers = {
    Query: {

        posts(parent,args,ctx,info){
            
            if(!args.query){
                return posts
            }
            return posts.filter((post) =>{
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })


        },

        users(parent,args,ctx,info) {
            if(!args.query){
                return users
            }

            return users.filter((user) =>{
                return user.name.toLowerCase().includes(args.query.toLowerCase())

            })

        },

        me() {
            return {
                id: '12345',
                name: 'Mike',
                email: 'daydreamingguy@gmail.com',
                age: 15
            }
    
        },

        post() {
            return {
                id: '2345',
                title: 'GraphQL-Tutorials',
                body: 'GraphQL is an Alternative to REST API',
                published: false
            }
        }

        

    },
    Post: {
        author(parent,args,ctx,info) {
            return users.find((user) =>{
                return user.id === parent.author

            })

        }
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start ({port: process.env.PORT || 4000 },() => {
    console.log('Server is Up')
})