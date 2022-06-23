import { Col, Row } from "react-bootstrap";
import RingLoader from "react-spinners/RingLoader";

const AppLoader = ({ message }) => {
  return (
    <Row>
      <Col md={4}>
      </Col>
      <Col md={4}>  <div style={{ height: "60rem", marginTop: "200px", marginLeft: '50px' }}>
        <RingLoader color='red' loading={true} size={150} />
        <h4>{message}</h4>
      </div></Col>
      <Col md={4}></Col>
    </Row>

  )
}

export default AppLoader