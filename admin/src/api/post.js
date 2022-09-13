import { createFactory } from 'react';
import client from './client'

/* 게시물 가져오기 */
export const getPosts = async (pageNo, limit) => {
    try{
        const {data} = await client(`/post/posts?pageNo=${pageNo}&limit=${limit}`)
        return data;
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message}
    }
}

/* 게시물 삭제 */
export const deletePost = async (postId) => {
    try{
        const {data} = await client.delete(`/post/${postId}`);
        return data;
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error}
    }
}

/* 검색 */
export const searchPost = async (query) => {
    try{
        const {data} = await client(`/post/search?title=${query}`);
        return data;
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error}
    }
}

export const createPost = async (formData) => {
    try{
        const {data} = await client.post('/post/create', formData);
        return data;
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error}
    }
}