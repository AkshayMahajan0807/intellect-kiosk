const{ remote } = require("electron");
const { PosPrinter } = remote.require("electron-pos-printer");
const path = require("path");


let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters(); //list the printers
console.log(printers);
let printerName="POS Printer 203DPI  Series";
  let widthPage="220px";


function print(message) {
console.log(message);
  console.log(printerName, widthPage);

  const options = {
    preview: true, 
    width: widthPage, 
    margin: "0 0 0 0", 
    copies: 1, 
    printerName: printerName, 
    timeOutPerLine: 400,
    silent: true,
  };

  
  const d = [...message];

  if (printerName && widthPage) {
    PosPrinter.print(d, options)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Select the printer and the width");
  }
}

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
    const newMsg=JSON.parse(JSON.stringify(message));
    console.log(newMsg);
     print(newMsg.body);
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

