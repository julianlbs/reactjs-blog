import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");
	const navigate = useNavigate();

	const { data, fetchError, isLoading } = useAxiosFetch(
		"http://localhost:3500/posts"
	);

	// useEffect(() => {
	// 	const fetchPosts = async () => {
	// 		try {
	// 			const response = await api.get("/posts");
	// 			setPosts(response.data);
	// 		} catch (err) {
	// 			if (err.response) {
	// 				// Not in the 200 response range
	// 				console.log(err.response.data);
	// 				console.log(err.response.status);
	// 				console.log(err.response.headers);
	// 			} else {
	// 				console.log(`Error: ${err.message}`);
	// 			}
	// 		}
	// 	};
	// 	fetchPosts();
	// }, []);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	useEffect(() => {
		const filteredResults = posts.filter(
			(post) =>
				post.body.toLowerCase().includes(search.toLowerCase()) ||
				post.title.toLowerCase().includes(search.toLowerCase())
		);

		setSearchResults(filteredResults.reverse());
	}, [posts, search]);

	return (
		<DataContext.Provider
			value={{
				posts,
				setPosts,
				search,
				setSearch,
				searchResults,
				setSearchResults,
				postTitle,
				setPostTitle,
				postBody,
				setPostBody,
				navigate,
				fetchError,
				isLoading,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;
