import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

const Qrcodegen = () => {
  const [url, setUrl] = useState()
  const [qrCodeText, setQrCodeText] = useState('');

  const[qrCodeValue, setCodeValue] = useState('No qrcode scanned')

  const downloadQRCode = () => {
    QRCode.toDataURL(url, (err, url) => {
      if(err)
      return console.error(err)
      console.log('url:' , url)
      setQrCodeText(url)
    })
  };

  console.log('qrCodeText:' , qrCodeText)


  

  return (
    <div>
      <div style={{textAlign:'center'}} > 
      {qrCodeText &&  <> <img src={qrCodeText} style={{height:'20%', width:'20%'}} /> <a href={qrCodeText} download={`${url}.png`} > download </a> </> }
      </div>
     
  
        <Modal.Body>
          <Row className="mt-3">
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="QR CODE"
              >
                <Form.Control  onChange={(e) => setUrl(e.target.value)} value={url} type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" download={qrCodeText} variant="primary" onClick={downloadQRCode}>Download QR Code</Button>
        </Modal.Footer>
      QRCODE: {qrCodeValue}
    </div>
  );
};

export default Qrcodegen;