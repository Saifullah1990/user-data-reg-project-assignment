import { TokenDecode } from "../utilities/tokenUtility.js"

export default (req, res, next) =>{

    let token = req.headers['token']
    let decoded = TokenDecode(token) 
    if (decoded === null){
        res.status(401).send({status: "fail", message: "Unauthorized"})
    }
    else{
        // picking user id, email from the decoded token 
        let email = decoded.email;
        let user_id = decoded.user_id; 

        // then adding them to request header 
        req.headers.email = email; 
        req.headers.user_id = user_id;
        
        next()
    }

}