import React, { useState } from "react";
import QRCode from "qrcode";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

const Qrcodegen = () => {
  const [url, setUrl] = useState();
  const [qrCodeText, setQrCodeText] = useState("");

  const [qrCodeValue, setCodeValue] = useState("No qrcode scanned");

  const downloadQRCode = () => {
    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.error(err);
      console.log("url:", url);
      setQrCodeText(url);
    });
  };

  console.log("qrCodeText:", qrCodeText);

  return (
    <div className="qr-container">
      <div className="box">
        <div className="qr-gen">
          {qrCodeText != '' ? (
            <>
              <img src={qrCodeText} className="qr" />
              <br />
              <a href={qrCodeText} download={`${url}.png`} className="d-btn">
                Download
              </a>
            </>
          ) : (
            <>
              <h1>Input Employee ID to generate QR</h1>
            </>
          )}
        </div>
        <Row className="generator">
          <Col>
            <FloatingLabel controlId="floatingInput" label="QR CODE">
              <Form.Control
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                type="email"
                placeholder="name@example.com"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button
          type="button"
          download={qrCodeText}
          variant="primary"
          onClick={downloadQRCode}
          className="mt-4"
        >
          Generate QR Code
        </Button>
        {/* <span className="mt-4">Scan QR for testing: {qrCodeValue}</span> */}
      </div>
    </div>
  );
};

export default Qrcodegen;
