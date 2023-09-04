import React, { useState } from 'react'
// import useWebSocket, { ReadyState, sendJsonMessage } from 'react-use-websocket'

const Chatbot = () => {
    const [messages, setMessages] = useState<any>([]);
  
    const socketURL = `ws://localhost:8000/api/products/1/chatFun/`

//     const { readyState } = useWebSocket(socketURL, {
//     onMessage: (e:any) => {
//       const data = JSON.parse(e.data)
//       setMessages(...messages, data.message);
//     }
//   });
  const handleMessageSubmit = async(e:any) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    setMessages([...messages, message]);
    // await new Promise((resolve) => setTimeout(resolve, 7000));
    

    // sendJsonMessage({
    //   message
    // })


    // const p_id = toString(props._id)
    // dispatch(listProductsDetailss(props?.id ?? 1, message, () => {
    //   const revert = productDetailss.product.reply
    //   setMessages([...messages, message, revert]);
    // }))
    //console.log("message", reply)
    // const revert = reply;
    // const revert = "Response"
    
    // console.log("message", product, product.reply)
    // setMessages([...messages, revert]);
    e.target.elements.message.value = '';
  };
  return (
    <div className='cbot'>
      <div className="chat-window">
        {messages.map((message:any, index:any) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input type="text" name="message" placeholder="Type your message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chatbot
