import {useNavigate, useParams} from "react-router-dom";

export default function RouteWrapper(Component) {
    return function (props) {
        const {id} = useParams();
        return <Component {...props} navigate={useNavigate()} id={id}/>;
    };
}
