import Api from '@/services/Api'

export default {
    joinChat(userData) {
        return Api().post('join', userData)
    }
}