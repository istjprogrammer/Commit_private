import React, { useState } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    // 파일 업로드 로직 추가
    console.log('Selected File:', file);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>첨부파일</InputGroup.Text>
      <FormControl
        type="file"
        onChange={handleFileChange}
        aria-describedby="inputGroupFileAddon01"
      />
      <Button variant="primary" onClick={handleUpload}>업로드</Button>
    </InputGroup>
  );
};

export default FileUpload;
