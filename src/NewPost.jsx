import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";

const NewPost = () => {
	const { posts, navigate, setPosts } = useContext(DataContext);

	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), "MMM dd, yyyy pp");
		const newPost = { id, title: postTitle, datetime, body: postBody };
		try {
			const response = await api.post("/posts", newPost);
			const allPosts = [...posts, response.data];
			setPosts(allPosts);
			setPostTitle("");
			setPostBody("");
			navigate("/");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	return (
		<main className="NewPost">
			<h2>New Post</h2>
			<form action="" className="newPostForm" onSubmit={handleSubmit}>
				<label htmlFor="postTitle">Title:</label>
				<input
					type="text"
					className="postTitle"
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
					required
				/>
				<label htmlFor="postBody">Post:</label>
				<textarea
					id="postBody"
					value={postBody}
					onChange={(e) => setPostBody(e.target.value)}
					required
				></textarea>
				<button type="submit">Submit</button>
			</form>
		</main>
	);
};

export default NewPost;
