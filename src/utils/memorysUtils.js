import storageUtils from "./storageUtils"

export default{
    user:storageUtils.getUser(),//用于存储登录用户的信息，初始值为local中读取的user
    
}