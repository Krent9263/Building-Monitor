import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

const Qrcodegen = () => {
  const [url, setUrl] = useState()
  const [qrCodeText, setQrCodeText] = useState('');

  const downloadQRCode = () => {
    QRCode.toDataURL(url, (err, url) => {
      if(err)
      return console.error(err)
      console.log(url)
      setQrCodeText(url)
    })
  };
  

  return (
    <div>
      {qrCodeText &&  <> <img src={qrCodeText} /> <a href={qrCodeText} download={`${url}.png`} > download </a> </> }
     
  
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
    
    </div>
  );
};

export default Qrcodegen;