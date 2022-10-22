import express from 'express';
import mongoose from "mongoose";

import PostContact from "../models/postContact.js";

const router = express.Router();

export const getPost = async (req,res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex =(Number(page) - 1) * LIMIT;
        const total = await PostContact.countDocuments({});

        const posts = await PostContact.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);


        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ contact: error.contact })
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query


    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostContact.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req,res) => {
    const post = req.body;

    const newPostContact = new PostContact({ ...post, name: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPostContact.save()

        res.status(201).json(newPostContact );
    } catch (error) {
        res.status(409).json({ contact: error.contact });
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Failed to post');

    
    const updatedPost = await PostContact.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost)
}

export const deletePost = async (req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Failed to post');

    await PostContact.findByIdAndRemove(id);

    console.log('DELETE!');

    res.json({ message: 'Delete successfull' })
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Failed to post');

    const post = await PostContact.findById(id);

    const index = index.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes(filter((id) => id !== String(req.userId)))
    }

    const updatedPost = await PostContact.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}


export default router;