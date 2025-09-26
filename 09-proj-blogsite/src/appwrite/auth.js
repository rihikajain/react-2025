import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite"


export class AuthService {
  client = new Client()
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(ID.unique(), email, password, name);
    if(userAccount){
      this.login({email,password})
    }
    else
    return userAccount;
  }

  async login({email,password}){
    return await this.account.createEmailPasswordSession(email,password)
  }

}

const authService = new AuthService()

export default authService