import { useContext } from "react";
import DataContext from "./context/DataContext";
import Feed from "./Feed";

const Home = () => {
	const { searchResults, fetchError, isLoading } = useContext(DataContext);
	return (
		<main className="Home">
			{/* {posts.length ? (
				<Feed posts={posts} />
			) : (
				<p style={{ marginTop: "2rem" }}>No posts to display</p>
			)} */}
			{isLoading && <p className="statusMsg">Loading posts...</p>}
			{!isLoading && fetchError && (
				<p className="statusMsg" style={{ color: "red" }}>
					{fetchError}
				</p>
			)}
			{!isLoading &&
				!fetchError &&
				(searchResults ? (
					<Feed posts={searchResults} />
				) : (
					<p className="statusMsg">No posts to display</p>
				))}
		</main>
	);
};

export default Home;
