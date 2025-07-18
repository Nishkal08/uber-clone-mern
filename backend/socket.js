const { server } = require("socket.io");
const socketIo = require("socket.io");
const captainModel = require("./models/captain.model"); 
const userModel = require("./models/user.model");
let io;
const initializeSocket = (server) => {
     io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });
    //socket represents the client connected
    io.on("connection",(socket) => {
       
        socket.on("join", async (data) => {
            const { userType , userId} = data
            if(userType === "captain"){
                const captain = await captainModel.findByIdAndUpdate(userId,{socketId:socket.id})
            
            }else if(userType === "user"){
                const user = await userModel.findByIdAndUpdate(userId,{socketId:socket.id})
            }
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected", socket.id);
        });

        socket.on("update-location-captain",async(data) => {
            const { userId , location } = data
            
            if(!userId || !location) {
                return socket.emit("error",{message: "User ID and location are required"});
            }
            const captain = await captainModel.findByIdAndUpdate(userId, {
                location:{
                    ltd: location.ltd,
                    lng: location.lng
                }
            }, { new: true });
            // console.log("Captain location updated", captain);
        })

    })
}

function sendMessageToUser(socketId,message){
    if(!socketId) throw new Error("Socket ID is required to send message");

    if(io)
    {
       
        io.to(socketId).emit(message.event, message.data);
    }
}
module.exports = { initializeSocket, sendMessageToUser };