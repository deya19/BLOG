import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import EditorToolbar, { modules, formats } from "../components/reactQuil";


const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  
  const navigate = useNavigate();

  
  //upload file
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); // the name "file" is the same name in backend in mullter upload "file"
      const res = await axios.post("http://localhost:8080/api/upload", formData,{withCredentials:true});
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };


  // create new bost and modifie the current post
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`http://localhost:8080/api/posts/${state.id}`, {
            title,
            desc: value,
            cat,
           img: file ? imgUrl : state.img,
          },{withCredentials:true})
        : await axios.post(`http://localhost:8080/api/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          },{withCredentials:true});
          navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        {state ? <title>{`Edit ${state.title}`}</title> :<title>Create a New Post</title>}
        <meta name="description" content={state? state.title:"write"}/>
      </Helmet>
      <div className="writeContainer">
        <main className="add">
          <section className="content">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
        
            <article className="editorContainer">
            <EditorToolbar toolbarId={'t1'} />
              <ReactQuill
                className="editor"
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules('t1')}
                formats={formats}
              />
            </article>
          </section>
        
          <section className="menu">
            <article className="item">
              <h1>Publish</h1>
              <span>
                <b>Status:</b> Draft
              </span>
              <span>
                <b>Visibility:</b> Public
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="file" htmlFor="file">
                Upload Image
              </label>
              <article className="buttons">
                <button>Save as a draft</button>
                <button onClick={handleClick}>Publish</button>
              </article>
            </article>
            <article className="item">
              <h1>Category</h1>
              <article className="cat">
                <input
                  type="radio"
                  checked={cat === "art"}
                  name="cat"
                  value="art"
                  id="art"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="art">Art</label>
              </article>
              <article className="cat">
                <input
                  type="radio"
                  checked={cat === "science"}
                  name="cat"
                  value="science"
                  id="science"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="science">Science</label>
              </article>
              <article className="cat">
                <input
                  type="radio"
                  checked={cat === "technology"}
                  name="cat"
                  value="technology"
                  id="technology"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="technology">Technology</label>
              </article>
              <article className="cat">
                <input
                  type="radio"
                  checked={cat === "cinema"}
                  name="cat"
                  value="cinema"
                  id="cinema"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="cinema">Cinema</label>
              </article>
              <article className="cat">
                <input
                  type="radio"
                  checked={cat === "design"}
                  name="cat"
                  value="design"
                  id="design"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="design">Design</label>
              </article>
              <article className="cat">
                <input
                  type="radio"
                  checked={cat === "food"}
                  name="cat"
                  value="food"
                  id="food"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="food">Food</label>
              </article>
            </article>
          </section>
        </main>
      </div>
    </>
  );
};

export default Write;


