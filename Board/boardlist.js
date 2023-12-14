import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl, Dropdown, Container } from 'react-bootstrap';
import { PeopleFill, HeartFill, Chat } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import communityImage from './list_image.jpg';
import './boardlist.css'
import Pagination from 'react-bootstrap/Pagination';

const CommunityHeader = () => (
    <div className="text-center position-relative">
        <img src={communityImage} alt="Community" className="img-fluid" />
        <h1 className="overlay-text">전체글</h1>
        <br></br><br></br><br></br><br></br>
    </div>
);

class BoardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: '전체글',
        };
    }

    handleCategoryChange(selected) {
        this.setState({ selectedCategory: selected });
    }


    render() {
        const { selectedCategory } = this.state;
        return (
            <>
                <CommunityHeader />
                <Container>

                    <div>
                        <br></br>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {/* 카테고리 드롭다운 */}
                            <Dropdown onSelect={this.handleCategoryChange.bind(this)}>
                                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                    {selectedCategory}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="전체글">전체글</Dropdown.Item>
                                    <Dropdown.Item eventKey="구인/구직">구인/구직</Dropdown.Item>
                                    <Dropdown.Item eventKey="이직/신입">이직/신입</Dropdown.Item>
                                    <Dropdown.Item eventKey="면접">면접</Dropdown.Item>
                                    <Dropdown.Item eventKey="자소서">자소서</Dropdown.Item>
                                    <Dropdown.Item eventKey="합격자조언">합격자조언</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* 검색창 */}
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder="검색어를 입력하세요"
                                />
                                <Button variant="primary">검색</Button>
                            </InputGroup>
                        </div>


                        {/* 리스트 */}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ fontSize: '25px' }}>번호</th>
                                    <th className="text-center" style={{ fontSize: '25px' }}>제목</th>
                                    <th className="text-center" style={{ fontSize: '25px' }}>작성자</th>
                                    <th className="text-center" style={{ fontSize: '25px' }}>작성일</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="text-center" style={{ fontSize: '20px' }}>1</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>
                                        <Link to='/boarddetail' style={{ color: "black", textDecoration: "none", }}>
                                            에이콘가는길 어디에요? 뉴진스의 Hype Boy요
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <PeopleFill className="me-2" />100&nbsp;
                                            <HeartFill style={{ color: "red" }}></HeartFill>100&nbsp;
                                            <Chat></Chat>100
                                        </Link>
                                    </td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>이현재</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>24.01.01</td>
                                </tr>

                                <tr>
                                    <td className="text-center" style={{ fontSize: '20px' }}>2</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>
                                        <Link to='/boarddetail' style={{ color: "black", textDecoration: "none" }}>
                                            에이콘가는길 어디에요? 뉴진스의 hurt요
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <PeopleFill className="me-2" />100&nbsp;
                                            <HeartFill style={{ color: "red" }}></HeartFill>100&nbsp;
                                            <Chat></Chat>100
                                        </Link>
                                    </td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>이현재</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>24.01.01</td>
                                </tr>

                                <tr>
                                    <td className="text-center" style={{ fontSize: '20px' }}>3</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>
                                        <Link to='/boarddetail' style={{ color: "black", textDecoration: "none" }}>
                                            에이콘가는길 어디에요? 뉴진스의 Attetion이요
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <PeopleFill className="me-2" />100&nbsp;
                                            <HeartFill style={{ color: "red" }}></HeartFill>100&nbsp;
                                            <Chat></Chat>100
                                        </Link>
                                    </td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>이현재</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>24.01.01</td>
                                </tr>

                                <tr>
                                    <td className="text-center" style={{ fontSize: '20px' }}>4</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>
                                        <Link to='/boarddetail' style={{ color: "black", textDecoration: "none" }}>
                                            에이콘가는길 어디에요? 뉴진스의 Cookie요
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <PeopleFill className="me-2" />100&nbsp;
                                            <HeartFill style={{ color: "red" }}></HeartFill>100&nbsp;
                                            <Chat></Chat>100
                                        </Link>
                                    </td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>이현재</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>24.01.01</td>
                                </tr>

                                <tr>
                                    <td className="text-center" style={{ fontSize: '20px' }}>5</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>
                                        <Link to='/boarddetail' style={{ color: "black", textDecoration: "none" }}>
                                            에이콘가는길 어디에요? 아이브의 러브다이브요
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <PeopleFill className="me-2" />100&nbsp;
                                            <HeartFill style={{ color: "red" }}></HeartFill>100&nbsp;
                                            <Chat></Chat>100
                                        </Link>
                                    </td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>이현재</td>
                                    <td className="text-center" style={{ fontSize: '20px' }}>24.01.01</td>
                                </tr>

                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-end mt-3">
                            <Link to="/boardwrite">
                                <Button variant="primary">글쓰기</Button><br></br><br></br>
                            </Link>
                        </div>
                    </div>
                </Container>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>                        
                        <Pagination.Item>{4}</Pagination.Item>
                        <Pagination.Item>{5}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                </Pagination>
                </div>
            </>
        );
    }
}

export default BoardList;
