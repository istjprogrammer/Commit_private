import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button,InputGroup } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일을 불러옴
import FileUpload from './fileupload.js';
import axios from 'axios';

const BoardEdit = () => {
  
  const navigate = useNavigate();
  const [board, setBoardEdit] = useState({});
  const { id } = useParams();

  // 게시판 제목, 내용, 카테고리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('전체글');

  // 선택한 게시물의 원본 내용 GET
  useEffect(() => {
    axios.get(`http://localhost:9999/Community/boardedit/${id}`).then((response) => {
      const { title, content, category } = response.data;
      setBoardEdit(response.data);
      setTitle(title);
      setContent(content);
      setCategory(category);
    });
  }, [id]);
  
  //글 제목 수정
  const changeTitle = (event) => {
		setTitle(event.target.value);
	}

  //글 내용 수정
	const changeContent = (content) => {
		setContent(content);
	}

  //글 카테고리 수정
  const changeCategory = (selected) => {
    setCategory(selected);
  };
  
  //글 수정 요청
  const boardedit = async () => {
    const req = {
			title: title, 
			content: content,
      category: category
		}

    try {
      const response = await axios.post(`http://localhost:9999/Community/boardedit/${id}`, req);
      if (response.status == 200) {
        alert("게시글을 성공적으로 수정했습니다.");
        navigate("/Community/boardlist");
      }
      console.log("글 수정 완료");
    } catch (error) {
      console.error("글 수정 실패", error);
    }
  };

  return (
    <Container>
      <main className="mt-5 pt-5">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h1>글 수정</h1>
        </Col>
      </Row>
      <hr />
      <br></br><br></br>
      <Form>
          <InputGroup>
            <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>카테고리</InputGroup.Text>
            <Form.Select value={board.category} onChange={changeCategory}>
              <option value="구인/구직">구인/구직</option>
              <option value="이직/신입">이직/신입</option>
              <option value="면접">면접</option>
              <option value="자소서">자소서</option>
              <option value="합격자조언">합격자조언</option>
            </Form.Select><br></br>
          </InputGroup> 
            <InputGroup>
              <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>제목</InputGroup.Text>
              <Form.Control type="text" onChange={changeTitle} value={title} />
            </InputGroup>

        <FileUpload />

        <Form.Group className="mb-4">
          <ReactQuill 
            style = {{ height: '400px'}}
            theme="snow" onChange={changeContent} value={content} />
        </Form.Group><br/>

        <Row className="justify-content-start">
          <Col>
             <div className="d-flex justify-content-end mt-3">
                    <Link to = '/Community/boardlist'>
                        <Button variant="primary" onClick={boardedit}>
                            수정완료
                        </Button>
                    </Link>
              </div>
          </Col>
        </Row>
      </Form>
      </main>
    </Container>
  );
};

export default BoardEdit;
