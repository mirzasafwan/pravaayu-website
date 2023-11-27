import React, {useState, useEffect} from "react";

const BlogSearch = ({getBlogBySearch, tagName, categoryName, newName, isSearch}) => {
  const [name, setName] = useState("");
  useEffect(() => {
    if (tagName !== undefined) {
      setName("Tag");
    } else if (categoryName !== undefined) {
      setName("Category");
    }
  }, [tagName, categoryName]);
  useEffect(()=>{
    console.log(isSearch,'isSearch');
    if(isSearch){
      setName('Search Result')
    }
  },[isSearch]);
  return (
    <>
      <div id="search-for-blogs">
        {newName !== undefined && name !== "" ? (
          <span id="ist-heading-blog-info">
            {name}: {!isSearch ? newName : ''}
          </span>
        ) : (
          <span id="ist-heading-blog-info">Latest Blogs</span>
        )}
        <div id="search-blog">
          <img
            src="https://media.bookeventz.com/html/ui_website/blog-section/blog_search.svg"
            alt="Blog search Icon"
          />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => getBlogBySearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default BlogSearch;
