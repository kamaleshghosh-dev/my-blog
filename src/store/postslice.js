import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name:'post',
    initialState:{
        posts:[],
        currentpost:null,
        loading:false,
        error:null
    },
    reducers:{
        setPosts:(state,action)=>{
            state.posts=action.payload
        },
      
        updatePost:(state,action)=>{
          const  updated=action.payload;
           state.posts=state.posts.map(post=>
                post.$id===updated.$id ? updated:post
           );
        },
        deletePost:(state,action)=>{
                const deleted = action.payload;
                state.posts=state.posts.filter(post=>
                    post.$id !== deleted
                );
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        clearerror:(state)=>{
            state.error=null
        }

    }
})

export const {setPosts,updatePost,deletePost,setLoading,clearerror} = postSlice.actions


export default postSlice.reducer 