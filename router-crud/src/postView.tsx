import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Post from "./post.tsx";
import {Button} from "react-bootstrap";

type Props = {
    url: string,
}

export default function PostView({url}: Props) {
    const {id} = useParams()
    const [post, setPost] = useState({
        created: "",
        content: "",
        id: -1,
    })

    const navigate = useNavigate();

    const toDelete = () => {
        fetch(`${url}/posts/${id}`, {method: "DELETE"})
            .then(response => {
                if (Math.floor(response.status / 100) !== 2) {
                    console.log("Error! Post was not deleted")
                    return
                }
                navigate("/")
            })
    }

    useEffect(() => {
        fetch(`${url}/posts/${id}`)
            .then(response => response.json())
            .then(json => setPost(json.post))
    }, [id])

    return (
        <Post created={post.created} content={post.content} id={post.id} closeBtnLink="/">
            <div className="btnsWrp d-flex justify-content-end gap-2">
                <Button className="editBtns" variant="danger" onClick={() => toDelete()}>Delete</Button>
                <Button className="editBtns" variant="primary" onClick={() => navigate(`/put/${id}`)}>Edit</Button>
            </div>
        </Post>

    )
}