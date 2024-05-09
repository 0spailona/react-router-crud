import React from "react";
import Post from "./post.tsx";

type Props = {
    url: string,
}

export default class Posts extends React.Component<Props> {

    state = {
        posts: Array<{ id: number, content: string, created: string }>(),
    }

    async componentDidMount() {
        this.setState({posts: await this.loadPosts()})
    }

    async loadPosts() {
        const response = await fetch(`${this.props.url}/posts`);
        const json = response.json()
        return await json
    }

    render() {

        return (
            <>
                {this.state.posts.map(post => <Post key={post.id} id={post.id} created={post.created}
                                                    content={post.content}/>)}
            </>
        );
    }
}
