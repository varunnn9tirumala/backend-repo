import express from "express"

const router = express.Router()

router.post("/sara-ai", async (req,res)=>{

const { message, trip } = req.body

try{

const response = await fetch("https://api.deepseek.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.DEEPSEEK_API_KEY}`
},
body:JSON.stringify({
model:"deepseek-chat",
messages:[
{
role:"system",
content:"You are SARA, TripCraft travel assistant. Improve travel packages without increasing price."
},
{
role:"user",
content:`Trip from ${trip.departure} to ${trip.destination}. User message: ${message}`
}
]
})
})

const data = await response.json()

res.json({
reply:data.choices[0].message.content
})

}catch(err){

console.error(err)

res.status(500).json({
error:"AI server error"
})

}

})

export default router