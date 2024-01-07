import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl, Dropdown, Container, Pagination } from 'react-bootstrap';
import { PeopleFill, HeartFill, Chat } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import './boardlist.css'
import axios from 'axios';
import moment from 'moment';

//상단 사진 부분
const CommunityHeader = () => (
    <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
            <h1 className="display-2 text-white fw-bold mb-4 animated slideInDown">Community</h1>
        </div>
    </div>
);

// 리엑트와 스프링부트 연결을 위한 코드
const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
    const [page, setPage] = useState(1); 

    //페이징 기능
    const getBoardList = useCallback(async (pageNumber) => {
        try {
            const response = await axios.get(`http://localhost:9999/Community/boardlist?page=${pageNumber}`);
            setBoardList(response.data.content);
        } catch (error) {
            console.error('에러 메세지', error);
        }
    }, [page]);
    
    useEffect(() => {
        getBoardList(page);
    }, [page, getBoardList]);
    
    // 페이지 변경 처리 함수
    const pageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    //검색 기능
    const [keyword, setKeyword] = useState('');
    const [searchData, setSearchData] = useState([]); 
    //셀렉트 박스
    const [selectedOption, setSelectedOption] = useState('전체');
    //셀렉트 박스 선택 함수
    const select = (eventKey) => {
        setSelectedOption(eventKey);
        };
    //검색어에 해당되는 게시물 조회
    const boardSearch = async () => {
        try {
        const response = await fetch(`http://localhost:9999/Community/boardsearch?keyword=${keyword}&option=${selectedOption}`);
        const searchData = await response.json();
        setSearchData(searchData);
        } 
        catch (error) {
        console.error('검색 기능 실패', error);
        }
    };
  
    //검색 이후 리스트에 반영
    useEffect(() => {
        if (searchData.length > 0) {
        // 검색 결과가 있을 경우에만 boardList를 업데이트
        setBoardList(searchData);
        }
    }, [searchData]);

//실제 렌더링 되는 부분
return (
    <>
    <CommunityHeader />            
        <Container>

        <div className="d-flex justify-content-between align-items-center mb-3">                
            <Dropdown onSelect={select}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="전체">전체</Dropdown.Item>
                    <Dropdown.Item eventKey="제목">제목</Dropdown.Item>
                    <Dropdown.Item eventKey="내용">내용</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            boardSearch();
                        }
                    }}
                />
                <Button variant="primary" onClick={boardSearch}>검색</Button>
          </InputGroup>
            
        </div>

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
                {Array.isArray(boardList) && boardList.map((boardList) => (
                <tr key={boardList.id}>
                    <td className="text-center" style={{ fontSize: '20px' }}>{boardList.id}</td>
                    <td className="text-center" style={{ fontSize: '20px' }}>
                        <Link to={`/Community/boarddetail/${boardList.id}`} style={{ color: "black", textDecoration: "none" }}>
                            {boardList.title}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <PeopleFill className="me-2" />{boardList.viewcount}&nbsp;
                            <HeartFill style={{ color: "red" }}></HeartFill>{boardList.likecount}&nbsp;
                            <Chat></Chat>{boardList.comments}
                        </Link>
                    </td>
                    <td className="text-center" style={{ fontSize: '20px' }}>{boardList.membersId}</td>
                    <td className="text-center" style={{ fontSize: '20px' }}>{moment(boardList.createDate).format('YYYY-MM-DD')}</td>
                </tr>
            ))}
        </tbody>
    </Table>

    <div className="d-flex justify-content-end mt-3">
        <Link to="/Community/boardwrite">
            <Button variant="primary">글쓰기</Button>
        </Link>
    </div>            
    </Container>

    <div className="d-flex justify-content-center">
        <Pagination>
            <Pagination.Prev onClick={() => pageChange(page - 1)} />
            <Pagination.Item onClick={() => pageChange(1)}>{1}</Pagination.Item>
            <Pagination.Item onClick={() => pageChange(2)}>{2}</Pagination.Item>
            <Pagination.Item onClick={() => pageChange(3)}>{3}</Pagination.Item>
            <Pagination.Item onClick={() => pageChange(4)}>{4}</Pagination.Item>
            <Pagination.Item onClick={() => pageChange(5)}>{5}</Pagination.Item>
            <Pagination.Next onClick={() => pageChange(page + 1)} />
        </Pagination>
    </div>
</>
);
}

export default BoardList;
