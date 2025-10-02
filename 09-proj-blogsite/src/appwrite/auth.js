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
    if (userAccount) {
      this.login({ email, password })
    }
    else
      return userAccount;
  }

  async login({ email, password }) {
    return await this.account.createEmailPasswordSession(email, password)
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    }
    catch (e) {
      console.log("error:", e)
    }
    return null
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log(error)
    }
  }

}

const authService = new AuthService()

export default authService