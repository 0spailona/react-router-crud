import {Button, CloseButton, Image} from "react-bootstrap";
import {ReactNode} from "react";
import moment from "moment";
// @ts-ignore
import ru from "moment/dist/locale/ru";
import {useNavigate} from "react-router-dom";

type Props = {
    user?: {
        avatar?: string,
        name: string
    },
    created: string,
    content: string,
    id: number,
    closeBtnLink?: string,
    children?: ReactNode | undefined
}

export default function Post({children, user, created, content, id, closeBtnLink}: Props) {

    console.log("post content", content)

    moment.locale("ru", ru);
    const time = moment(created).fromNow();
    const navigate = useNavigate()
    return (
        <div className="post w-100 d-flex p-2 block flex-column gap-4">

            <div className="d-flex flex-column gap-4" >
                <div className="d-flex justify-content-between">
                    <div className="avatarAndUserName d-flex align-items-center gap-3 border-2">
                        <Image className="avatar" src={user?.avatar ? user.avatar : "/img.jpg"} roundedCircle/>
                        <div className="nameAndPublicTime">
                            <div className="userName">{user ? user.name : "Anonymous"}</div>
                            <div className="publicTime">{time}</div>
                        </div>
                    </div>
                    {closeBtnLink ?
                        <CloseButton className="align-self-start" type="button" onClick={() => navigate(closeBtnLink)}/> : null}
                </div>
                <div className="content block - shadow" title={closeBtnLink? "" : "Go to post"} onClick={() => !closeBtnLink? navigate(`/posts/${id}`) : null}>{content}</div>
            </div>
            <div className="btnsWrp d-flex justify-content-evenly">
                <Button className="w-25" variant="primary">Like</Button>
                <Button className="w-25" variant="primary">Add comment</Button>
            </div>
            {children}
        </div>
    );
}
