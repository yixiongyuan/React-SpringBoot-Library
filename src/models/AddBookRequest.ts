import { ADDRCONFIG } from "dns";

class AddBookRequest{

    title:string;
    author:string;
    description:string;
    copies:number;
    category:string;
    img?:string;

    constructor( title:string,author:string,description:string,copies:number,category:string,img?:string){
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.category = category;
    }
}

export default AddBookRequest;