# GraphQL-API
***A Basic GraphQL API written in JS and uses GraphQL-Yoga***

<p align="center">
  <img width="900" height="500" src="gql.png">
</p>


**Sample GraphQL API queries**

```

query{
  posts(){
    id
    title
    published
    body
    author{
      name
    }
  }
  me{
    id
    email
    name
  }
  post{
    id
    published
  }
  users{
    name
    id
    email
    age
  }
}

```

**Use filter in Query to Get Response**

```
query{
  posts(query: "g"){
    id
    title
    published
    body
    author{
      name
    }
  }
  me{
    id
    email
    name
  }
  post{
    id
    published
  }
  users{
    name
    id
    email
    age
  }
}

```




