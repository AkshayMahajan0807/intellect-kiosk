const socket = io("http://localhost:4000");
console.log(socket);
const PRESCRIPTION = "newPrescription";
// client-side
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });


  socket.on(PRESCRIPTION, (message) => {
    const incomingMessage = {
      ...message,
      ownedByCurrentUser: message.senderId === socket.id,
    };

    console.log("Do Printing stuff Here");
    console.log(incomingMessage);
    
  
  });

  const sendPrescription = (messageBody) => {
   console.log("Sending Prescripton")
    socket.emit(PRESCRIPTION, {
      body: messageBody,
      senderId: socket.id,
    });
  };

 