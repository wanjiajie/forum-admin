import { getCategory } from '@/api/article'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    categoryName: '', // 分类名
    categoryNameId: '', // id

  },
  mutations: {
    setCategoryName (state, categoryName) {
      state.categoryName = categoryName
    },
  },
  getters: {
  },
  actions: {
    /**
     * 获取分类
     * @param state
     * @param commit
     * @returns {Promise<any>}
     */
    getCategory ({state, commit}) {

      return new Promise((resolve, reject)=>{
        try {
          getCategory(getToken('token')).then(res=>{
            commit('setCategoryName',res.data)
            resolve(res)

          })
        } catch (e) {
          reject(e)
        }
      })
    },
  }
}
