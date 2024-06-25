
export class GlobalConstants{


    public static token = localStorage.getItem("bearerToken")
    public static baseUrl: string = "http://127.0.0.1:8000/api/"
    public static isLoggedIn :boolean = localStorage.getItem("bearerToken") !== null

}