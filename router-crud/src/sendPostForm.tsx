import React from "react";
import {Button, CloseButton} from "react-bootstrap";
import RouteWrapper from "./routeWrapper";

type Props = {
    url: string,
    navigate:Function
}

class SendPostForm extends React.Component<Props> {

    state = {
        inputDateValue: '',
    }

    async onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget);
        const content = Object.fromEntries(formdata).content.toString()
        console.log("onFormSubmit",1)
        if (!await this.postContent(content)) {
            return
        }
        console.log("onFormSubmit",3)
        this.props.navigate("/")
    }

    onChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({inputDateValue: e.target.value})
    }

    async postContent(content: string) {
        const response = await fetch(this.props.url + '/posts',
            {method: "POST", body: JSON.stringify({content})});
        if (response.status !== 204) {
            console.log("Error send new post", response.status)
            return false
        }
        return true
    }

    render() {
        return (
            <form className="block d-flex flex-column gap-2" onSubmit={this.onFormSubmit.bind(this)} autoComplete="off">
                <CloseButton className="align-self-end" type="button" onClick={()=>this.props.navigate("/")}/>
                <textarea className="w-100 block-shadow" name="content" value={this.state.inputDateValue}
                          onChange={this.onChangeInput.bind(this)} maxLength={200} required/>
                <Button className="align-self-end" variant="primary" type="submit">Send</Button>
            </form>
        )
    }
}

export default RouteWrapper(SendPostForm);