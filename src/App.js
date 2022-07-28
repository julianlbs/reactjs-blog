import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="post">
					<Route index element={<NewPost />} />
					<Route path="/post/:id" element={<PostPage />} />
				</Route>
				<Route path="edit/:id" element={<EditPost />} />
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}

export default App;
