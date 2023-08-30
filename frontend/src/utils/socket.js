// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const useSocket = () => {
//   const [datas, setDatas] = useState([]);
//   const socket = io("http://127.0.0.1:9000", {
//     transports: ["polling", "websocket"],
//   });
//   console.log(datas);
//   useEffect(() => {
//     socket.on("crypto", (data) => {
//       console.log("connected");
//       setDatas(data);
//     });

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return datas;
// };

// export default useSocket;
