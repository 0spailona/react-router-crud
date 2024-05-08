import {Route, Routes} from 'react-router-dom';
import Header from "./header.tsx";
import Posts from "./posts.tsx";
import SendPostForm from "./sendPostForm.tsx";
import PostView from "./postView.tsx";
import EditForm from "./EditForm.tsx";


function App() {
    const url = import.meta.env.VITE_URL
    return (
        <>
            <Header/>
            <div className="page d-flex flex-column flex-grow-1 gap-2 overflow-y-hidden">
                <Routes>
                    <Route path="/" element={<Posts url={url}/>}/>
                    <Route path="/posts/new" element={<SendPostForm url={url}/>}/>
                    <Route path="/posts/:id" element={<PostView url={url}/>}/>
                    <Route path="/put/:id" element={<EditForm url={url}/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
