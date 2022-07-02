import { Card } from "react-bootstrap"

export const MessageBox = ({message, children})=>{
   return <Card>
       <h5>{message}</h5>
       {children}
   </Card>
}