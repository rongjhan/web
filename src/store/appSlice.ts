import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import produce from "immer"

window.thunk = createAsyncThunk
// 首先, 创建 thunk

export const fetchInit = createAsyncThunk(
    'initApp',
    async (undefined, thunkAPI) => {
      const response = await fetch("../init")
      return response.json()
    }
  )
  
  // 接着, 在你的 reducers 中处理这些 actions:
  const appSlice = createSlice({
    name: 'init',
    initialState: { platform:undefined, user: {name:undefined,level:undefined}},
    reducers: {
      // 标准 reducer 逻辑, 带有每个 reducer 自动生成的 action types
    },
    extraReducers: {
      // 在这里添加处理额外 action types 的 reducers, 并且如果有需要的话，也在此处理加载状态
      [fetchInit.fulfilled]: (state, action) => {
        return produce(state,(draftState)=>{
          draftState.platform= action.payload.platform
          draftState.user = action.payload.user
        })
      }
    }
  })

  export default appSlice.reducer