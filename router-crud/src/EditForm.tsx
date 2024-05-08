import React from "react";
import {Button, CloseButton} from "react-bootstrap";
import RouteWrapper from "./routeWrapper";

type Props = {
    url: string,
    id:number,
    navigate:Function
}

class EditForm extends React.Component<Props> {

    state = {
        inputPostText: '',
    }
    async componentDidMount() {
        const text = await this.loadPost()
        this.setState({inputPostText: text.post.content})
    }

    async onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget);
        const content = Object.fromEntries(formdata).content.toString()
        if (!await this.postContent(content)) {
            return
        }
        this.props.navigate(-1)
    }

    onChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({inputPostText: e.target.value})
    }

    async loadPost() {
        const response = await fetch(`${this.props.url}/posts/${this.props.id}`);
        const json = response.json()
        console.log('json from server', json)
        return await json
    }

    async postContent(content: string) {
        const response = await fetch(`${this.props.url}/posts/${this.props.id}`,
            {method: "PUT", body: JSON.stringify({content})});
        if (response.status !== 204) {
            console.log("Error send new post", response.status)
            return false
        }
        return true
    }

    render() {
        return (
            <form className="block d-flex flex-column gap-2" onSubmit={this.onFormSubmit.bind(this)} autoComplete="off">
                <div className="d-flex justify-content-between">
                    <span className="editFormName">Edit form</span>
                  <CloseButton type="button" onClick={()=>this.props.navigate(-1)}/>
                </div>
                <textarea className="w-100 block-shadow" name="content" value={this.state.inputPostText}
                          onChange={this.onChangeInput.bind(this)} maxLength={200} required/>
                <Button className="align-self-end" variant="primary" type="submit">Save</Button>
            </form>
        )
    }
}

export default RouteWrapper(EditForm);