import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <div className="header d-flex justify-content-end block">
            <NavLink to="/posts/new"><Button variant="primary">New post</Button></NavLink>
        </div>
    );
}