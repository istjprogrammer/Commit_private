import React from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { PeopleFill, HeartFill, Chat } from "react-bootstrap-icons";

const BoardDetail = () => {
  return (
    <Container>
      <main className="mt-5 pt-5">
        <Container fluid className="px-4">
          <div className="text-center">
            <h1>커뮤니티</h1>
          </div>
          <hr />
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/">
              Community
            </Breadcrumb.Item>
            <Breadcrumb.Item active>구인/구직</Breadcrumb.Item>
          </Breadcrumb>

          <Card className="mb-4">
            <Card.Body>
              <Form method="post">
                {/* 제목 영역 */}
                <div>
                  <Container>
                    <Row>
                      <Col>
                        <Form.Label htmlFor="title" className="form-label"
                          style={{ fontWeight: 'bold' }}>
                          작성일 : 2024.01.01
                        </Form.Label>
                      </Col>
                      <Col className="text-end">
                        <Form.Label htmlFor="title" className="form-label"
                          style={{ fontWeight: 'bold' }}>
                          작성자: 이현재
                        </Form.Label>
                      </Col>
                    </Row>
                  </Container>                  
                </div>

                {/*제목 영역 */}
                <InputGroup className="mb-1">
                    <InputGroup.Text style={{ width: '100px', fontWeight: 'bold' }}>제목</InputGroup.Text>
                    <Form.Control value={'에이콘 가는길 어디에요? 뉴진스의 하입보이요'} disabled
                     style={{ backgroundColor: '#fff', color: '#000' }}  />
                </InputGroup>

                {/* 첨부 파일 영역 */}
                <InputGroup className="mb-3">
                <Button variant="primary" style={{ width: '100px'}}>다운로드</Button>
                  <Form.Control type="text" placeholder="첨부파일.txt" disabled 
                    style={{ backgroundColor: '#fff', color: '#000' }}/>
                </InputGroup>

                {/* 좋아요 수, 조회수, 댓글 수 영역 */}
                <PeopleFill className="me-2" />100&nbsp;
                <HeartFill style={{ color: "red" }}></HeartFill>100&nbsp;
                <Chat></Chat>100
                <br></br>
                <br></br>
                {/* 내용 영역 */}
                <div className="mb-4">
                  <Card>
                    <Card.Body style={{ height: '400px' }}>
                      Baby, got me looking so crazy<br></br>
                      빠져버리는 daydream<br></br>
                      Got me feeling you<br></br>
                      너도 말해줄래                      
                    </Card.Body>
                  </Card>
                </div>
                <br></br>
                <br></br>
                {/* 좋아요 및 신고 버튼 */}
                <div className="position-relative">
                  <div className="position-absolute bottom-0 end-0">
                    <Button variant="primary" className="mb-2">
                      좋아요
                    </Button>&nbsp;
                    <Button variant="danger" className="mb-2">
                      신고
                    </Button>&nbsp;
                    <Button variant="success" className="mb-2">
                      스크랩
                    </Button>
                  </div>
                </div>

                {/* 수정 및 삭제 버튼 */}
                <div className="position-relative">
                  <div className="position-absolute bottom-0 start-0">
                    <Link to='/boardedit' style={{ color: "black", textDecoration: "none" }}>
                      <Button variant="outline-primary" className="mb-2">
                        수정
                      </Button>&nbsp;
                    </Link>
                    <Button variant="outline-danger" className="mb-2">
                      삭제
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </Container>
  );
};

export default BoardDetail;
