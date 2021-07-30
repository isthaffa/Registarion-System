import db from './db'

import {GetItemCommand,PutItemCommand,DeleteItemCommand,UpdateItemCommand,ScanCommand} from "@aws-sdk/client-dynamodb"

import {marshall,unmarshall} from "@aws-sdk/util-dynamodb"



const getPost=async (event)=>{
    const ressponse ={statusCode:200}

    try {
        const params={
            TableName:process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({postId:event.pathParameters.postId}),

        }

        const {Item } =await db.send(new GetItemCommand(params))
        console.log(Item);
        ressponse.body=JSON.stringify({message:"successfully retrived post",data:(item) ? unmarshall(Item):{}})
    } catch (error) {
        console.log(error);
        response.statusCode=500
        response.body({message:"failed",error:error.message})
    }
    return response
}

const createPost=async (event)=>{
    const ressponse ={statusCode:200}

    try {
        const body=JSON.parse(event.body)
        const params={
            TableName:process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(body || {}),

        }

        const results =await db.send(new PutItemCommand(params))
        console.log(results);
        ressponse.body=JSON.stringify({message:"successfully created post",results:results})
    } catch (error) {
        console.log(error);
        response.statusCode=500
        response.body({message:"failed",error:error})
    }
    return response
}

const updatePost=async (event)=>{
    const ressponse ={statusCode:200}

    try {
        const body=JSON.parse(event.body)
        const objkeys=Object.keys(body)
        const params={
            TableName:process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({postId:event.pathParameters.postId}),
            UpdateExpression: `SET ${objkeys.map((_,index)=>`#key${index}=:values${index}`)}`,
            ExpressionAttributeNames:objkeys.reduce((acc,key,index)=>({
                ...acc,
                [`#key${index}`]:key,

            }),{}),
            ExpressionAttributeValues:marshall(objkeys.reduce((acc,key,index)=>({
                ...acc,
                [`:value${index}`]:body[key],
            }),{}))
        }

        const results =await db.send(new UpdateItemCommand(params))
        console.log(results);
        ressponse.body=JSON.stringify({message:"successfully updated post",results:results})
    } catch (error) {
        console.log(error);
        response.statusCode=500
        response.body({message:"failed",error:error})
    }
    return response
}

const deletePost=async (event)=>{
    const ressponse ={statusCode:200}

    try {
        const body=JSON.parse(event.body)
    
        const params={
            TableName:process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({postId:event.pathParameters.postId}),
        
        }

        const results =await db.send(new DeleteItemCommand(params))
        console.log(results);
        ressponse.body=JSON.stringify({message:"successfully deleted post",results:results})
    } catch (error) {
        console.log(error);
        response.statusCode=500
        response.body({message:"failed",error:error})
    }
    return response
}

const getAllPost=async (event)=>{
    const ressponse ={statusCode:200}

    try {
       
        const {Items} =await db.send(new ScanCommand({TableName:process.env.DYNAMODB_TABLE_NAME}))
        console.log(results);
        ressponse.body=JSON.stringify({message:"all posts",results:Items.map((item)=>unmarshall(item))})
    } catch (error) {
        console.log(error);
        response.statusCode=500
        response.body({message:"failed",error:error})
    }
    return response
}



module.exports={
    getPost,
    createPost,
    deletePost,
    updatePost,
    getAllPost
}