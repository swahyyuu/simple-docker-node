const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "Success",
      result: (await posts).length,
      data: {
        posts
      }
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.getOnePosts = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      result: (await posts).length,
      data: {
        posts
      }
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const posts = await Post.create(req.body);
    res.status(200).json({
      status: "Success",
      result: (await posts).length,
      data: {
        posts
      }
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "Success",
      result: (await posts).length,
      data: {
        posts
      }
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: "Success"
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail"
    });
  }
};