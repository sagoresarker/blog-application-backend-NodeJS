import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const getAllBlogs = async(req, res, next) => {
    let blogs;

    try{
        blogs = await Blog.find();
    }
    catch(err){
        console.log(err);
    }

    if (!blogs){
        return res.status(400).json({message:"No Blogs Found"});
    }

    return res.status(200).json({blogs});
};

export const addBlog = async(req, res, next) => {
    const {title, description, image, user} = req.body; 

    let exisitngUser;

    try{
        exisitngUser = await User.findById(user)
    }catch(err){
        return console.log(err)
    }

    if (!exisitngUser){
        return res.status(400).json({message:"Unable to find user by id. "})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        exisitngUser.blogs.push(blog);
        await exisitngUser.save({session});
        await session.commitTransaction();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: err});
    }

    return res.status(201).json({blog});

}

export const updateBlog = async(req, res, next) => {
    const {title, description} = req.body;
    const blogId = req.params.id;

    let blog;

    try{
        blog = await Blog.findByIdAndUpdate(blogId, {title, description})
    }
    catch(err){
        return console.log(err);
    }

    if (!blog){
        return res.status(500).json({message:"Unable to update the blog! "});
    }

    return res.status(200).json({blog});

}

export const getById = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;

    try{
        blog = await Blog.findById(blogId);
    }
    catch(err){
        return console.log(err);
    }

    if (!blog){
        return res.status(404).json({message: "Blog Not found"});
    }

    return res.status(200).json({blog});
    
};

export const deleteBlog = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;

    try{
        blog = await Blog.findByIdAndDelete(blogId);
    }
    catch(err){
        return console.log(err);
    }

    if (!blog){
        return res.status(404).json({message: "Blog Not found"});
    }

    return res.status(200).json({blog});
}